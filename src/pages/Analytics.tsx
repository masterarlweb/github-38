import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowLeft, BarChart3, TrendingUp, TrendingDown, Eye, Heart, MessageCircle, Share2, Bookmark, Sparkles, RefreshCw } from 'lucide-react';
import Logo from '@/components/Logo';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ThemeToggle } from '@/components/ui/theme-toggle';

// Mock data for demonstration
const mockEngagementData = [
  { date: 'Sen', reach: 1200, engagement: 8.5, likes: 450 },
  { date: 'Sel', reach: 1800, engagement: 9.2, likes: 620 },
  { date: 'Rab', reach: 1500, engagement: 7.8, likes: 380 },
  { date: 'Kam', reach: 2200, engagement: 11.5, likes: 890 },
  { date: 'Jum', reach: 2800, engagement: 12.3, likes: 1100 },
  { date: 'Sab', reach: 3200, engagement: 10.8, likes: 950 },
  { date: 'Min', reach: 2500, engagement: 9.5, likes: 720 },
];

const mockPostPerformance = [
  { id: 1, title: 'Skincare Tips', reach: 2500, engagement: 12.3, likes: 890, comments: 45, shares: 23 },
  { id: 2, title: 'Product Review', reach: 1800, engagement: 9.5, likes: 620, comments: 32, shares: 15 },
  { id: 3, title: 'Morning Routine', reach: 3200, engagement: 15.2, likes: 1100, comments: 78, shares: 42 },
  { id: 4, title: 'Ingredient Guide', reach: 2100, engagement: 8.7, likes: 540, comments: 28, shares: 18 },
];

const Analytics = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiInsight, setAiInsight] = useState('');
  const [loadingInsight, setLoadingInsight] = useState(false);

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

  const generateAIInsight = async () => {
    setLoadingInsight(true);
    // Simulate AI insight generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    setAiInsight(
      "📊 Berdasarkan data minggu ini:\n\n" +
      "• Posting 'Morning Routine' mendapat engagement tertinggi (15.2%)\n" +
      "• Waktu posting terbaik: Jumat & Sabtu (prime time 19:00-21:00)\n" +
      "• Rekomendasi: Tingkatkan konten video/carousel untuk boost engagement\n" +
      "• Target minggu depan: Reach 20% lebih tinggi dengan konsistensi posting"
    );
    setLoadingInsight(false);
  };

  const stats = [
    { 
      label: 'Total Reach', 
      value: '15.2K', 
      change: '+12%', 
      isPositive: true,
      icon: <Eye className="w-5 h-5" />,
      color: 'text-blue-400'
    },
    { 
      label: 'Engagement Rate', 
      value: '9.8%', 
      change: '+2.3%', 
      isPositive: true,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-green-400'
    },
    { 
      label: 'Total Likes', 
      value: '5.1K', 
      change: '+8%', 
      isPositive: true,
      icon: <Heart className="w-5 h-5" />,
      color: 'text-pink-400'
    },
    { 
      label: 'Comments', 
      value: '183', 
      change: '-5%', 
      isPositive: false,
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'text-purple-400'
    },
  ];

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
              <span className="font-medium">Analytics</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button onClick={generateAIInsight} className="gap-2" disabled={loadingInsight}>
              {loadingInsight ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              AI Insight
            </Button>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        {/* AI Insight */}
        {aiInsight && (
          <motion.div
            className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium mb-2 text-purple-300">AI Insight</h3>
                <p className="text-sm text-foreground/70 whitespace-pre-line">{aiInsight}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <Card className="bg-background/50 border-foreground/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={stat.color}>{stat.icon}</span>
                    <span className={`text-xs flex items-center gap-1 ${stat.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      {stat.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-foreground/50">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-background/50 border-foreground/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  Reach & Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockEngagementData}>
                      <defs>
                        <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4facfe" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#4facfe" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="date" stroke="#666" fontSize={12} />
                      <YAxis stroke="#666" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1e1e2f', 
                          border: '1px solid #333',
                          borderRadius: '8px'
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="reach" 
                        stroke="#4facfe" 
                        fillOpacity={1} 
                        fill="url(#colorReach)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-background/50 border-foreground/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Heart className="w-5 h-5 text-pink-400" />
                  Likes per Hari
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockEngagementData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="date" stroke="#666" fontSize={12} />
                      <YAxis stroke="#666" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1e1e2f', 
                          border: '1px solid #333',
                          borderRadius: '8px'
                        }} 
                      />
                      <Bar dataKey="likes" fill="#f093fb" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Post Performance Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-background/50 border-foreground/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Performa Posting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-foreground/50 border-b border-foreground/10">
                      <th className="pb-3 font-medium">Posting</th>
                      <th className="pb-3 font-medium">Reach</th>
                      <th className="pb-3 font-medium">Engagement</th>
                      <th className="pb-3 font-medium">
                        <Heart className="w-4 h-4 inline" />
                      </th>
                      <th className="pb-3 font-medium">
                        <MessageCircle className="w-4 h-4 inline" />
                      </th>
                      <th className="pb-3 font-medium">
                        <Share2 className="w-4 h-4 inline" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPostPerformance.map((post, index) => (
                      <motion.tr 
                        key={post.id}
                        className="border-b border-foreground/5"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <td className="py-4 font-medium">{post.title}</td>
                        <td className="py-4 text-sm text-foreground/70">{post.reach.toLocaleString()}</td>
                        <td className="py-4">
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            post.engagement > 10 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {post.engagement}%
                          </span>
                        </td>
                        <td className="py-4 text-sm text-pink-400">{post.likes}</td>
                        <td className="py-4 text-sm text-purple-400">{post.comments}</td>
                        <td className="py-4 text-sm text-blue-400">{post.shares}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Analytics;
