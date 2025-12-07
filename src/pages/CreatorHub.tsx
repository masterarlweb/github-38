import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Users, Plus, Instagram, Youtube, MessageCircle, UserPlus, Trash2, ExternalLink } from 'lucide-react';
import Logo from '@/components/Logo';

interface Creator {
  id: string;
  creator_name: string;
  creator_handle: string;
  platform: string;
  followers_count: number;
  engagement_rate: number;
  collaboration_type: string;
  status: string;
  notes: string;
}

const platformIcons: Record<string, JSX.Element> = {
  instagram: <Instagram className="w-4 h-4" />,
  youtube: <Youtube className="w-4 h-4" />,
  tiktok: <MessageCircle className="w-4 h-4" />,
};

const CreatorHub = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCreator, setNewCreator] = useState({
    creator_name: '',
    creator_handle: '',
    platform: 'instagram',
    followers_count: '',
    engagement_rate: '',
    collaboration_type: 'content',
    notes: ''
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session?.user) {
        navigate('/auth');
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session?.user) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchCreators();
    }
  }, [user]);

  const fetchCreators = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('creator_collaborations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching creators:', error);
      return;
    }

    setCreators(data || []);
  };

  const addCreator = async () => {
    if (!user || !newCreator.creator_name) {
      toast.error('Nama kreator harus diisi');
      return;
    }

    const { error } = await supabase
      .from('creator_collaborations')
      .insert({
        user_id: user.id,
        creator_name: newCreator.creator_name,
        creator_handle: newCreator.creator_handle,
        platform: newCreator.platform,
        followers_count: parseInt(newCreator.followers_count) || 0,
        engagement_rate: parseFloat(newCreator.engagement_rate) || 0,
        collaboration_type: newCreator.collaboration_type,
        notes: newCreator.notes,
        status: 'pending'
      });

    if (error) {
      toast.error('Gagal menambahkan kreator');
      console.error('Error adding creator:', error);
      return;
    }

    toast.success('Kreator berhasil ditambahkan!');
    setShowAddForm(false);
    setNewCreator({
      creator_name: '',
      creator_handle: '',
      platform: 'instagram',
      followers_count: '',
      engagement_rate: '',
      collaboration_type: 'content',
      notes: ''
    });
    fetchCreators();
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('creator_collaborations')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast.error('Gagal mengupdate status');
      return;
    }

    toast.success('Status berhasil diupdate');
    fetchCreators();
  };

  const deleteCreator = async (id: string) => {
    const { error } = await supabase
      .from('creator_collaborations')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Gagal menghapus kreator');
      return;
    }

    toast.success('Kreator berhasil dihapus');
    fetchCreators();
  };

  const formatFollowers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-foreground/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/kontenih-ai')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Logo size="sm" />
              <span className="text-foreground/40">/</span>
              <span className="font-medium">Creator Hub</span>
            </div>
          </div>
          <Button onClick={() => setShowAddForm(true)} className="gap-2">
            <UserPlus className="w-4 h-4" />
            Tambah Kreator
          </Button>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-orange-500/20">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{creators.length}</div>
              <div className="text-xs text-foreground/50">Total Kreator</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{creators.filter(c => c.status === 'active').length}</div>
              <div className="text-xs text-foreground/50">Aktif</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{creators.filter(c => c.status === 'pending').length}</div>
              <div className="text-xs text-foreground/50">Pending</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{creators.filter(c => c.status === 'completed').length}</div>
              <div className="text-xs text-foreground/50">Selesai</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Creator List */}
        {creators.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Users className="w-16 h-16 mx-auto mb-4 text-foreground/20" />
            <h3 className="text-lg font-medium mb-2">Belum ada kreator</h3>
            <p className="text-foreground/50 mb-6">Tambahkan kreator untuk memulai kolaborasi</p>
            <Button onClick={() => setShowAddForm(true)}>
              <UserPlus className="w-4 h-4 mr-2" />
              Tambah Kreator Pertama
            </Button>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {creators.map((creator, index) => (
              <motion.div
                key={creator.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-background/50 border-foreground/10 hover:border-orange-500/30 transition-all group">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
                          <span className="text-lg font-bold text-orange-400">
                            {creator.creator_name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{creator.creator_name}</h3>
                          <div className="flex items-center gap-1 text-sm text-foreground/50">
                            {platformIcons[creator.platform] || platformIcons.instagram}
                            <span>@{creator.creator_handle || 'handle'}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400"
                        onClick={() => deleteCreator(creator.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="text-center p-2 rounded-lg bg-foreground/5">
                        <div className="text-lg font-bold">{formatFollowers(creator.followers_count || 0)}</div>
                        <div className="text-xs text-foreground/50">Followers</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-foreground/5">
                        <div className="text-lg font-bold">{creator.engagement_rate || 0}%</div>
                        <div className="text-xs text-foreground/50">Engagement</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <select
                        value={creator.status}
                        onChange={e => updateStatus(creator.id, e.target.value)}
                        className={`text-xs px-3 py-1.5 rounded-full bg-transparent border cursor-pointer ${
                          creator.status === 'active' 
                            ? 'border-green-500/30 text-green-400' 
                            : creator.status === 'pending'
                              ? 'border-yellow-500/30 text-yellow-400'
                              : creator.status === 'completed'
                                ? 'border-blue-500/30 text-blue-400'
                                : 'border-red-500/30 text-red-400'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="active">Aktif</option>
                        <option value="completed">Selesai</option>
                        <option value="cancelled">Batal</option>
                      </select>
                      
                      {creator.creator_handle && (
                        <a
                          href={`https://instagram.com/${creator.creator_handle}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground/40 hover:text-foreground transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    {creator.notes && (
                      <p className="mt-3 text-xs text-foreground/50 line-clamp-2">{creator.notes}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Add Creator Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddForm(false)}
          >
            <motion.div
              className="w-full max-w-lg bg-background rounded-2xl border border-foreground/10 p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-6">Tambah Kreator</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-foreground/60 mb-2 block">Nama Kreator *</label>
                  <Input
                    placeholder="Nama kreator..."
                    value={newCreator.creator_name}
                    onChange={e => setNewCreator({...newCreator, creator_name: e.target.value})}
                    className="bg-background/50"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-foreground/60 mb-2 block">Handle</label>
                    <Input
                      placeholder="@username"
                      value={newCreator.creator_handle}
                      onChange={e => setNewCreator({...newCreator, creator_handle: e.target.value})}
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-foreground/60 mb-2 block">Platform</label>
                    <select
                      value={newCreator.platform}
                      onChange={e => setNewCreator({...newCreator, platform: e.target.value})}
                      className="w-full h-10 px-3 rounded-md bg-background/50 border border-input text-sm"
                    >
                      <option value="instagram">Instagram</option>
                      <option value="youtube">YouTube</option>
                      <option value="tiktok">TikTok</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-foreground/60 mb-2 block">Followers</label>
                    <Input
                      type="number"
                      placeholder="10000"
                      value={newCreator.followers_count}
                      onChange={e => setNewCreator({...newCreator, followers_count: e.target.value})}
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-foreground/60 mb-2 block">Engagement Rate (%)</label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="5.5"
                      value={newCreator.engagement_rate}
                      onChange={e => setNewCreator({...newCreator, engagement_rate: e.target.value})}
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-foreground/60 mb-2 block">Catatan</label>
                  <Textarea
                    placeholder="Catatan tentang kolaborasi..."
                    value={newCreator.notes}
                    onChange={e => setNewCreator({...newCreator, notes: e.target.value})}
                    className="bg-background/50"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">
                    Batal
                  </Button>
                  <Button onClick={addCreator} className="flex-1">
                    Tambah Kreator
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreatorHub;
