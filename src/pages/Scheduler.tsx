import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Instagram, Plus, Send, Trash2, Play, Pause, Sparkles } from 'lucide-react';
import Logo from '@/components/Logo';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { id } from 'date-fns/locale';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface ScheduledPost {
  id: string;
  content: string;
  caption: string;
  hashtags: string[];
  scheduled_time: string;
  status: string;
  ai_recommended_time?: string;
  platform: string;
}

const Scheduler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const aiData = location.state?.aiData;
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const [newPost, setNewPost] = useState({
    content: aiData?.topic || '',
    caption: aiData?.caption || '',
    hashtags: aiData?.hashtags?.join(' ') || '',
    scheduled_time: aiData?.recommendedTime || '',
    platform: 'instagram'
  });

  // AI recommended times
  const recommendedTimes = [
    { time: '09:00', label: 'Pagi', engagement: '85%' },
    { time: '12:00', label: 'Siang', engagement: '72%' },
    { time: '19:00', label: 'Prime Time', engagement: '95%' },
    { time: '21:00', label: 'Malam', engagement: '88%' }
  ];

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
      fetchPosts();
    }
  }, [user]);

  const fetchPosts = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('scheduled_posts')
      .select('*')
      .eq('user_id', user.id)
      .order('scheduled_time', { ascending: true });

    if (error) {
      console.error('Error fetching posts:', error);
      return;
    }

    setPosts(data || []);
  };

  const createPost = async () => {
    if (!user || !newPost.content || !newPost.scheduled_time) {
      toast.error('Lengkapi semua field yang diperlukan');
      return;
    }

    const hashtagsArray = newPost.hashtags.split(' ').filter(h => h.startsWith('#') || h.trim());
    
    const { error } = await supabase
      .from('scheduled_posts')
      .insert({
        user_id: user.id,
        content: newPost.content,
        caption: newPost.caption,
        hashtags: hashtagsArray,
        scheduled_time: newPost.scheduled_time,
        platform: newPost.platform,
        status: 'scheduled'
      });

    if (error) {
      console.error('Error creating post:', error);
      toast.error('Gagal membuat jadwal posting');
      return;
    }

    toast.success('Jadwal posting berhasil dibuat!');
    setShowCreateForm(false);
    setNewPost({ content: '', caption: '', hashtags: '', scheduled_time: '', platform: 'instagram' });
    fetchPosts();
  };

  const deletePost = async (id: string) => {
    const { error } = await supabase
      .from('scheduled_posts')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Gagal menghapus jadwal');
      return;
    }

    toast.success('Jadwal berhasil dihapus');
    fetchPosts();
  };

  const postNow = async (post: ScheduledPost) => {
    // Simulate posting to Instagram
    toast.success(`🚀 Posting ke ${post.platform}... (Simulasi)`);
    
    const { error } = await supabase
      .from('scheduled_posts')
      .update({ status: 'posted' })
      .eq('id', post.id);

    if (!error) {
      fetchPosts();
    }
  };

  // Generate week days
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative z-10 bg-transparent">
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
              <span className="font-medium">Scheduler</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button onClick={() => setShowCreateForm(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Jadwal Baru
            </Button>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        {/* Week Calendar */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-medium">Kalender Minggu Ini</h2>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => {
              const dayPosts = posts.filter(p => isSameDay(new Date(p.scheduled_time), day));
              const isToday = isSameDay(day, new Date());
              const isSelected = isSameDay(day, selectedDate);
              
              return (
                <motion.button
                  key={index}
                  onClick={() => setSelectedDate(day)}
                  className={`p-4 rounded-xl border transition-all ${
                    isSelected 
                      ? 'bg-blue-500/20 border-blue-500/50' 
                      : isToday 
                        ? 'bg-foreground/5 border-foreground/20' 
                        : 'bg-background/50 border-foreground/10 hover:border-foreground/30'
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="text-xs text-foreground/50 mb-1">
                    {format(day, 'EEE', { locale: id })}
                  </div>
                  <div className={`text-lg font-semibold ${isToday ? 'text-blue-400' : ''}`}>
                    {format(day, 'd')}
                  </div>
                  {dayPosts.length > 0 && (
                    <div className="mt-2 flex gap-1 justify-center">
                      {dayPosts.slice(0, 3).map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      ))}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* AI Recommended Times */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-medium">Waktu Posting Terbaik (AI Recommendation)</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {recommendedTimes.map((slot, index) => (
              <motion.div
                key={slot.time}
                className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium">{slot.time}</span>
                </div>
                <div className="text-xs text-foreground/50">{slot.label}</div>
                <div className="mt-2 text-sm text-green-400">{slot.engagement} engagement</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scheduled Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">
              Jadwal {format(selectedDate, 'd MMMM yyyy', { locale: id })}
            </h2>
          </div>

          {posts.filter(p => isSameDay(new Date(p.scheduled_time), selectedDate)).length === 0 ? (
            <Card className="bg-background/50 border-dashed border-foreground/20">
              <CardContent className="py-12 text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-foreground/20" />
                <p className="text-foreground/40">Tidak ada jadwal untuk tanggal ini</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setShowCreateForm(true)}
                >
                  Buat Jadwal Baru
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {posts
                .filter(p => isSameDay(new Date(p.scheduled_time), selectedDate))
                .map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-background/50 border-foreground/10 hover:border-foreground/20 transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Instagram className="w-4 h-4 text-pink-400" />
                              <span className="text-xs text-foreground/50">
                                {format(new Date(post.scheduled_time), 'HH:mm')}
                              </span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                post.status === 'posted' 
                                  ? 'bg-green-500/20 text-green-400' 
                                  : post.status === 'scheduled'
                                    ? 'bg-blue-500/20 text-blue-400'
                                    : 'bg-yellow-500/20 text-yellow-400'
                              }`}>
                                {post.status}
                              </span>
                            </div>
                            <p className="text-sm mb-2">{post.caption || post.content}</p>
                            {post.hashtags && post.hashtags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {post.hashtags.map((tag, i) => (
                                  <span key={i} className="text-xs text-blue-400">
                                    {tag.startsWith('#') ? tag : `#${tag}`}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            {post.status === 'scheduled' && (
                              <Button 
                                size="sm" 
                                onClick={() => postNow(post)}
                                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                              >
                                <Send className="w-4 h-4" />
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => deletePost(post.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          )}
        </motion.div>
      </main>

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreateForm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCreateForm(false)}
          >
            <motion.div
              className="w-full max-w-lg bg-background rounded-2xl border border-foreground/10 p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-6">Buat Jadwal Posting</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-foreground/60 mb-2 block">Konten</label>
                  <Textarea
                    placeholder="Deskripsi konten..."
                    value={newPost.content}
                    onChange={e => setNewPost({...newPost, content: e.target.value})}
                    className="bg-background/50"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-foreground/60 mb-2 block">Caption</label>
                  <Textarea
                    placeholder="Caption untuk posting..."
                    value={newPost.caption}
                    onChange={e => setNewPost({...newPost, caption: e.target.value})}
                    className="bg-background/50"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-foreground/60 mb-2 block">Hashtags</label>
                  <Input
                    placeholder="#skincare #beauty #trending"
                    value={newPost.hashtags}
                    onChange={e => setNewPost({...newPost, hashtags: e.target.value})}
                    className="bg-background/50"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-foreground/60 mb-2 block">Waktu Posting</label>
                  <Input
                    type="datetime-local"
                    value={newPost.scheduled_time}
                    onChange={e => setNewPost({...newPost, scheduled_time: e.target.value})}
                    className="bg-background/50"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowCreateForm(false)} className="flex-1">
                    Batal
                  </Button>
                  <Button onClick={createPost} className="flex-1">
                    Simpan Jadwal
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

export default Scheduler;
