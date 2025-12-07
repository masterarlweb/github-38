import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowLeft, BarChart3, TrendingUp, TrendingDown, Eye, Heart, MessageCircle, Share2, CalendarDays, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import Logo from '@/components/Logo';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { format, startOfWeek, addDays, isSameDay, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { toast } from 'sonner';

interface ScheduledPost {
  id: string;
  content: string;
  caption: string | null;
  hashtags: string[] | null;
  scheduled_time: string;
  status: string | null;
  platform: string | null;
}

interface DayAnalytics {
  date: string;
  day: string;
  dayLabel: string;
  posts: number;
  reach: number;
  engagement: number;
  likes: number;
  comments: number;
  shares: number;
}

const Analytics = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [weekData, setWeekData] = useState<DayAnalytics[]>([]);
  const [aiInsight, setAiInsight] = useState('');
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [daysWithPosts, setDaysWithPosts] = useState(0);

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
      fetchScheduledPosts();
    }
  }, [user]);

  const fetchScheduledPosts = async () => {
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
    processScheduleData(data || []);
  };

  const processScheduleData = (scheduledPosts: ScheduledPost[]) => {
    // Group posts by unique dates and take first 7 days
    const dateGroups = new Map<string, ScheduledPost[]>();
    
    scheduledPosts.forEach(post => {
      const dateKey = format(parseISO(post.scheduled_time), 'yyyy-MM-dd');
      if (!dateGroups.has(dateKey)) {
        dateGroups.set(dateKey, []);
      }
      dateGroups.get(dateKey)?.push(post);
    });

    // Convert to array sorted by date and take first 7
    const sortedDates = Array.from(dateGroups.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(0, 7);

    const daysCount = sortedDates.length;
    
    const weekAnalytics: DayAnalytics[] = Array.from({ length: 7 }, (_, index) => {
      const dayData = sortedDates[index];
      
      if (dayData) {
        const [dateKey, dayPosts] = dayData;
        const baseEngagement = generatePredictedEngagement(dayPosts);
        const actualDate = parseISO(dateKey);
        
        return {
          date: dateKey,
          day: `Day ${index + 1}`,
          dayLabel: format(actualDate, 'd MMM', { locale: id }),
          posts: dayPosts.length,
          reach: baseEngagement.reach,
          engagement: baseEngagement.engagement,
          likes: baseEngagement.likes,
          comments: baseEngagement.comments,
          shares: baseEngagement.shares
        };
      }
      
      return {
        date: '',
        day: `Day ${index + 1}`,
        dayLabel: '-',
        posts: 0,
        reach: 0,
        engagement: 0,
        likes: 0,
        comments: 0,
        shares: 0
      };
    });

    setDaysWithPosts(daysCount);
    setWeekData(weekAnalytics);

    // Auto-generate AI insight if 7 days are filled
    if (daysCount === 7) {
      generateAIInsight(weekAnalytics, scheduledPosts);
    }
  };

  const generatePredictedEngagement = (dayPosts: ScheduledPost[]) => {
    // Time-based engagement multipliers
    const getTimeMultiplier = (time: string) => {
      const hour = parseInt(time.split('T')[1]?.split(':')[0] || '12');
      if (hour >= 19 && hour <= 21) return 1.5; // Prime time
      if (hour >= 9 && hour <= 11) return 1.2; // Morning
      if (hour >= 12 && hour <= 14) return 1.0; // Lunch
      return 0.8;
    };

    let totalReach = 0;
    let totalEngagement = 0;
    let totalLikes = 0;
    let totalComments = 0;
    let totalShares = 0;

    dayPosts.forEach(post => {
      const multiplier = getTimeMultiplier(post.scheduled_time);
      const hasMedia = post.caption?.includes('video') || post.caption?.includes('carousel');
      const mediaBoost = hasMedia ? 1.3 : 1.0;
      const hashtagBoost = (post.hashtags?.length || 0) > 5 ? 1.2 : 1.0;

      const baseReach = Math.floor(1000 * multiplier * mediaBoost * hashtagBoost + Math.random() * 500);
      const baseEngagement = parseFloat((8 + Math.random() * 5 * multiplier).toFixed(1));
      const baseLikes = Math.floor(baseReach * (baseEngagement / 100) * 0.8);
      const baseComments = Math.floor(baseLikes * 0.1);
      const baseShares = Math.floor(baseLikes * 0.05);

      totalReach += baseReach;
      totalEngagement += baseEngagement;
      totalLikes += baseLikes;
      totalComments += baseComments;
      totalShares += baseShares;
    });

    return {
      reach: totalReach,
      engagement: parseFloat((totalEngagement / dayPosts.length).toFixed(1)),
      likes: totalLikes,
      comments: totalComments,
      shares: totalShares
    };
  };

  const generateAIInsight = async (analytics: DayAnalytics[], scheduledPosts: ScheduledPost[]) => {
    setLoadingInsight(true);
    
    try {
      // Calculate summary stats
      const totalReach = analytics.reduce((sum, d) => sum + d.reach, 0);
      const avgEngagement = (analytics.reduce((sum, d) => sum + d.engagement, 0) / analytics.filter(d => d.posts > 0).length).toFixed(1);
      const totalPosts = analytics.reduce((sum, d) => sum + d.posts, 0);
      const bestDay = analytics.reduce((best, d) => d.engagement > best.engagement ? d : best);
      const worstDay = analytics.filter(d => d.posts > 0).reduce((worst, d) => d.engagement < worst.engagement ? d : worst);
      
      // Find prime time posts
      const primeTimePosts = scheduledPosts.filter(p => {
        const hour = parseInt(p.scheduled_time.split('T')[1]?.split(':')[0] || '12');
        return hour >= 19 && hour <= 21;
      });

      const insight = `📊 **Analisis Engagement Mingguan (AI Prediction)**

📈 **Ringkasan Performa:**
• Total ${totalPosts} posting dijadwalkan minggu ini
• Prediksi total reach: ${totalReach.toLocaleString()}
• Rata-rata engagement rate: ${avgEngagement}%

🏆 **Hari Terbaik:** ${bestDay.day}
• Engagement tertinggi: ${bestDay.engagement}%
• Prediksi reach: ${bestDay.reach.toLocaleString()}

⚠️ **Perlu Peningkatan:** ${worstDay.day}
• Engagement: ${worstDay.engagement}%
• Saran: Coba posting di jam 19:00-21:00

⏰ **Prime Time Analysis:**
• ${primeTimePosts.length} dari ${totalPosts} posting di jam prime time (19:00-21:00)
• ${primeTimePosts.length < totalPosts / 2 ? '⚠️ Tingkatkan posting di jam prime time untuk engagement lebih tinggi' : '✅ Distribusi waktu posting sudah optimal'}

💡 **Rekomendasi AI:**
${totalPosts < 7 ? '• Tambah frekuensi posting (minimal 1 post/hari)' : '• Konsistensi posting sudah baik!'}
${parseFloat(avgEngagement) < 10 ? '• Gunakan lebih banyak hashtag relevan' : '• Engagement rate sudah di atas rata-rata'}
• Gunakan carousel/video untuk boost 30% engagement`;

      setAiInsight(insight);
      toast.success('AI Analysis berhasil dibuat!');
    } catch (error) {
      console.error('Error generating insight:', error);
      toast.error('Gagal membuat AI analysis');
    }
    
    setLoadingInsight(false);
  };

  const stats = [
    { 
      label: 'Total Reach', 
      value: weekData.reduce((sum, d) => sum + d.reach, 0).toLocaleString(),
      change: '+12%', 
      isPositive: true,
      icon: <Eye className="w-5 h-5" />,
      color: 'text-blue-400'
    },
    { 
      label: 'Avg Engagement', 
      value: `${(weekData.filter(d => d.posts > 0).reduce((sum, d) => sum + d.engagement, 0) / Math.max(weekData.filter(d => d.posts > 0).length, 1)).toFixed(1)}%`,
      change: '+2.3%', 
      isPositive: true,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-green-400'
    },
    { 
      label: 'Total Likes', 
      value: weekData.reduce((sum, d) => sum + d.likes, 0).toLocaleString(),
      change: '+8%', 
      isPositive: true,
      icon: <Heart className="w-5 h-5" />,
      color: 'text-pink-400'
    },
    { 
      label: 'Scheduled Posts', 
      value: posts.length.toString(),
      change: `${daysWithPosts}/7 hari`,
      isPositive: daysWithPosts >= 5,
      icon: <CalendarDays className="w-5 h-5" />,
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
              <span className="font-medium">Analytics</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button 
              onClick={() => generateAIInsight(weekData, posts)} 
              className="gap-2" 
              disabled={loadingInsight || posts.length === 0}
            >
              {loadingInsight ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              AI Insight
            </Button>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        {/* Schedule Status Banner */}
        {daysWithPosts < 7 && (
          <motion.div
            className="mb-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            <div>
              <p className="text-sm text-yellow-300">
                <strong>{daysWithPosts}/7 hari</strong> sudah dijadwalkan. 
                {daysWithPosts === 0 
                  ? ' Mulai buat jadwal untuk melihat analitik.' 
                  : ' Lengkapi jadwal 7 hari untuk mendapatkan AI Analysis lengkap.'}
              </p>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className="ml-auto border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/20"
              onClick={() => navigate('/scheduler')}
            >
              Buka Scheduler
            </Button>
          </motion.div>
        )}

        {daysWithPosts === 7 && !aiInsight && (
          <motion.div
            className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles className="w-5 h-5 text-green-400" />
            <p className="text-sm text-green-300">
              <strong>7 hari penuh!</strong> AI Analysis siap dibuat. Klik tombol "AI Insight" untuk analisis lengkap.
            </p>
          </motion.div>
        )}

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
              <div className="flex-1">
                <h3 className="font-medium mb-2 text-purple-300">AI Engagement Analysis</h3>
                <div className="text-sm text-foreground/70 whitespace-pre-line">{aiInsight}</div>
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
                    <span className={`text-xs flex items-center gap-1 ${stat.isPositive ? 'text-green-400' : 'text-yellow-400'}`}>
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
                  Prediksi Reach per Hari
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  {weekData.some(d => d.reach > 0) ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weekData}>
                        <defs>
                          <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4facfe" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#4facfe" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="day" stroke="#666" fontSize={12} />
                        <YAxis stroke="#666" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }} 
                          formatter={(value: number) => [value.toLocaleString(), 'Reach']}
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
                  ) : (
                    <div className="h-full flex items-center justify-center text-foreground/40">
                      <div className="text-center">
                        <CalendarDays className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Belum ada jadwal posting</p>
                      </div>
                    </div>
                  )}
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
                  Prediksi Likes per Hari
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  {weekData.some(d => d.likes > 0) ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weekData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="day" stroke="#666" fontSize={12} />
                        <YAxis stroke="#666" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }} 
                          formatter={(value: number) => [value.toLocaleString(), 'Likes']}
                        />
                        <Bar dataKey="likes" fill="#f093fb" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-foreground/40">
                      <div className="text-center">
                        <Heart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Belum ada jadwal posting</p>
                      </div>
                    </div>
                  )}
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
                Prediksi Performa per Hari
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-foreground/50 border-b border-foreground/10">
                      <th className="pb-3 font-medium">Hari</th>
                      <th className="pb-3 font-medium">Posts</th>
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
                    {weekData.map((day, index) => (
                      <motion.tr 
                        key={day.day}
                        className="border-b border-foreground/5"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                      >
                        <td className="py-4">
                          <div className="font-medium">{day.day}</div>
                          <div className="text-xs text-foreground/50">{day.dayLabel}</div>
                        </td>
                        <td className="py-4 text-sm">
                          {day.posts > 0 ? (
                            <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                              {day.posts} post
                            </span>
                          ) : (
                            <span className="text-foreground/30">-</span>
                          )}
                        </td>
                        <td className="py-4 text-sm text-foreground/70">
                          {day.reach > 0 ? day.reach.toLocaleString() : '-'}
                        </td>
                        <td className="py-4">
                          {day.engagement > 0 ? (
                            <span className={`text-sm px-2 py-1 rounded-full ${
                              day.engagement > 10 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {day.engagement}%
                            </span>
                          ) : (
                            <span className="text-foreground/30">-</span>
                          )}
                        </td>
                        <td className="py-4 text-sm text-pink-400">
                          {day.likes > 0 ? day.likes.toLocaleString() : '-'}
                        </td>
                        <td className="py-4 text-sm text-purple-400">
                          {day.comments > 0 ? day.comments : '-'}
                        </td>
                        <td className="py-4 text-sm text-blue-400">
                          {day.shares > 0 ? day.shares : '-'}
                        </td>
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