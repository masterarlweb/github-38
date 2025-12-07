import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowUp, Video, Image, FileText, Sparkles, Wand2, MessageSquare, LogOut, Paperclip, Command, SendIcon, XIcon, Menu, X, Copy, Check, Square, Pencil, Calendar, BarChart3, Users, ShoppingCart, Layout } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { WebGLShader } from '@/components/ui/web-gl-shader';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { z } from 'zod';
import { ConversationSidebar } from '@/components/ConversationSidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Logo from '@/components/Logo';
import R3FBlob from '@/components/ui/r3f-blob';
import AIShortcutButtons from '@/components/AIShortcutButtons';
import { ThemeToggle } from '@/components/ui/theme-toggle';

// Validation schema for chat messages
const messageSchema = z.object({
  message: z.string()
    .trim()
    .min(1, { message: 'Pesan tidak boleh kosong' })
    .max(4000, { message: 'Pesan maksimal 4000 karakter' })
});

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type AITool = {
  id: string;
  name: string;
  icon: JSX.Element;
  description: string;
};

type AIShortcutsData = {
  scheduler?: { caption?: string; hashtags?: string[]; recommendedTime?: string };
  carousel?: { template?: string; topic?: string };
  analytics?: boolean;
  creator?: boolean;
  ecommerce?: { productName?: string };
};

const KontenihAI = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>('brand-consultant');
  const [showTools, setShowTools] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [usageCount, setUsageCount] = useState<number>(0);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [aiShortcuts, setAiShortcuts] = useState<AIShortcutsData>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const MAX_USAGE = 2;

  // Parse AI response to extract feature data
  const parseAIResponseForFeatures = (content: string): AIShortcutsData => {
    const shortcuts: AIShortcutsData = {};
    const lowerContent = content.toLowerCase();

    // Detect scheduler-related content
    if (lowerContent.includes('jadwal') || lowerContent.includes('posting') || lowerContent.includes('schedule') || lowerContent.includes('waktu terbaik')) {
      const hashtagMatch = content.match(/#\w+/g);
      const timeMatch = content.match(/(\d{1,2}[:.]\d{2}|\d{1,2}\s*(am|pm|pagi|siang|sore|malam))/gi);
      shortcuts.scheduler = {
        caption: content.length > 200 ? content.substring(0, 200) + '...' : content,
        hashtags: hashtagMatch || [],
        recommendedTime: timeMatch?.[0] || undefined
      };
    }

    // Detect carousel/design-related content
    if (lowerContent.includes('carousel') || lowerContent.includes('slide') || lowerContent.includes('desain') || lowerContent.includes('konten visual') || lowerContent.includes('template')) {
      const topicMatch = content.match(/tentang\s+["']?([^"'\n.]+)["']?/i);
      shortcuts.carousel = {
        topic: topicMatch?.[1] || 'Brand Content',
        template: lowerContent.includes('minimalist') ? 'minimalist' : lowerContent.includes('bold') ? 'bold' : 'modern'
      };
    }

    // Detect analytics-related content
    if (lowerContent.includes('analitik') || lowerContent.includes('analytics') || lowerContent.includes('performa') || lowerContent.includes('insight') || lowerContent.includes('metrik')) {
      shortcuts.analytics = true;
    }

    // Detect creator/collaboration-related content
    if (lowerContent.includes('kreator') || lowerContent.includes('creator') || lowerContent.includes('kolaborasi') || lowerContent.includes('influencer') || lowerContent.includes('partnership')) {
      shortcuts.creator = true;
    }

    // Detect e-commerce-related content
    if (lowerContent.includes('produk') || lowerContent.includes('product') || lowerContent.includes('jual') || lowerContent.includes('toko') || lowerContent.includes('e-commerce') || lowerContent.includes('ecommerce')) {
      const productMatch = content.match(/produk\s+["']?([^"'\n,]+)["']?/i);
      shortcuts.ecommerce = {
        productName: productMatch?.[1] || undefined
      };
    }

    return shortcuts;
  };

  const aiTools: AITool[] = [
    {
      id: 'brand-consultant',
      name: 'Brand Consultant',
      icon: <MessageSquare className="w-4 h-4" />,
      description: 'AI consultant for your brand strategy'
    }
  ];

  const dashboardLinks = [
    { path: '/scheduler', name: 'Scheduler', icon: <Calendar className="w-4 h-4" />, color: 'from-blue-500/20 to-cyan-500/20' },
    { path: '/carousel-builder', name: 'Carousel Builder', icon: <Layout className="w-4 h-4" />, color: 'from-violet-500/20 to-purple-500/20' },
    { path: '/analytics', name: 'Analytics', icon: <BarChart3 className="w-4 h-4" />, color: 'from-green-500/20 to-emerald-500/20' },
    { path: '/creator-hub', name: 'Creator Hub', icon: <Users className="w-4 h-4" />, color: 'from-orange-500/20 to-amber-500/20' },
    { path: '/ecommerce', name: 'E-commerce', icon: <ShoppingCart className="w-4 h-4" />, color: 'from-rose-500/20 to-red-500/20' },
  ];

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoadingAuth(false);
        
        if (!session?.user) {
          navigate('/');
          toast.error('Silakan sign in untuk menggunakan Kontenih AI');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoadingAuth(false);
      
      if (!session?.user) {
        navigate('/');
        toast.error('Silakan sign in untuk menggunakan Kontenih AI');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Fetch user usage count
  useEffect(() => {
    if (user) {
      fetchUsageCount();
    }
  }, [user]);

  const fetchUsageCount = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('usage_tracking')
        .select('usage_count')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setUsageCount(data?.usage_count || 0);
    } catch (error) {
      console.error('Error fetching usage count:', error);
    }
  };

  const updateUsageCount = async () => {
    if (!user) return;

    try {
      const newCount = usageCount + 1;

      const { error } = await supabase
        .from('usage_tracking')
        .update({
          usage_count: newCount,
          last_used_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setUsageCount(newCount);

      if (newCount >= MAX_USAGE) {
        toast.error('Batas penggunaan gratis habis! Berlangganan untuk melanjutkan.');
        setTimeout(() => {
          navigate('/#pricing');
        }, 1500);
      }
    } catch (error) {
      console.error('Error updating usage count:', error);
      toast.error('Gagal memperbarui usage count');
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Berhasil logout');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Gagal logout');
    }
  };

  const createNewConversation = async () => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('conversations')
        .insert({
          user_id: user.id,
          title: 'New Chat'
        })
        .select()
        .single();

      if (error) throw error;
      return data.id;
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast.error('Gagal membuat percakapan baru');
      return null;
    }
  };

  const loadConversationMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const loadedMessages: Message[] = (data || []).map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }));

      setMessages(loadedMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast.error('Gagal memuat pesan');
    }
  };

  const saveMessage = async (conversationId: string, role: 'user' | 'assistant', content: string) => {
    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: conversationId,
          role,
          content
        });

      if (error) throw error;

      // Update conversation updated_at
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversationId);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  const handleNewConversation = () => {
    setCurrentConversationId(null);
    setMessages([]);
    setSelectedTool(null);
    setAiShortcuts({}); // Reset shortcuts for new conversation
  };

  const handleSelectConversation = async (conversationId: string) => {
    setCurrentConversationId(conversationId);
    await loadConversationMessages(conversationId);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const removeAsterisks = (text: string): string => {
    return text.replace(/\*\*/g, '');
  };

  // Function to render text with clickable links
  const renderMessageContent = (content: string) => {
    // URL regex pattern
    const urlPattern = /(https?:\/\/[^\s<>"{}|\\^`\[\]]+)/g;
    
    const parts = content.split(urlPattern);
    
    return parts.map((part, index) => {
      if (urlPattern.test(part)) {
        // Reset regex lastIndex
        urlPattern.lastIndex = 0;
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors break-all"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const generateConversationTitle = (userMessage: string, aiResponse: string): string => {
    // Common greetings to skip
    const greetings = ['halo', 'hai', 'hi', 'hello', 'hey', 'selamat pagi', 'selamat siang', 'selamat sore', 'selamat malam', 'apa kabar', 'assalamualaikum'];
    
    const userLower = userMessage.toLowerCase().trim();
    const isGreeting = greetings.some(g => userLower === g || userLower.startsWith(g + ' ') || userLower.startsWith(g + ','));
    
    // If user message is just a greeting, extract topic from AI response
    if (isGreeting || userMessage.length < 10) {
      // Try to extract first meaningful sentence from AI response
      const sentences = aiResponse.split(/[.!?]/).filter(s => s.trim().length > 10);
      if (sentences.length > 0) {
        const firstSentence = sentences[0].trim();
        // Extract key topic words
        const topicMatch = firstSentence.match(/tentang\s+(.+)|mengenai\s+(.+)|untuk\s+(.+)|dengan\s+(.+)/i);
        if (topicMatch) {
          const topic = (topicMatch[1] || topicMatch[2] || topicMatch[3] || topicMatch[4]).trim();
          return topic.length > 40 ? topic.substring(0, 40) + '...' : topic;
        }
        return firstSentence.length > 40 ? firstSentence.substring(0, 40) + '...' : firstSentence;
      }
    }
    
    // Otherwise use user message but make it cleaner
    const cleanMessage = userMessage
      .replace(/[?!.,]+$/g, '')
      .replace(/^(tolong|bisa|mohon|mau|ingin|coba)\s+/i, '')
      .trim();
    
    return cleanMessage.length > 40 ? cleanMessage.substring(0, 40) + '...' : cleanMessage;
  };

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
      toast.info('Generasi dihentikan');
    }
  };

  const handleSendMessage = async (overrideMessage?: string) => {
    const messageToSend = overrideMessage || input;
    
    if (!messageToSend.trim()) {
      toast.error('Pesan tidak boleh kosong');
      return;
    }

    if (!selectedTool) {
      toast.error('Pilih AI tool terlebih dahulu');
      return;
    }

    // Create new conversation if needed
    let conversationId = currentConversationId;
    if (!conversationId) {
      conversationId = await createNewConversation();
      if (!conversationId) return;
      setCurrentConversationId(conversationId);
    }

    const userMessage: Message = { role: 'user', content: messageToSend };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = messageToSend;
    if (!overrideMessage) setInput('');
    setIsLoading(true);

    // Create abort controller for this request
    abortControllerRef.current = new AbortController();

    // Save user message to database
    await saveMessage(conversationId, 'user', currentInput);

    // Send message via secure edge function proxy
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Sesi telah berakhir, silakan login kembali');
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/brand-consultant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          message: currentInput,
          tool: selectedTool || '',
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`Webhook error: ${response.status}`);
      }

      const data = await response.json();
      const cleanContent = removeAsterisks(data.output || data.response || 'Maaf, terjadi kesalahan dalam mendapatkan respons.');

      const assistantMessage: Message = {
        role: 'assistant',
        content: cleanContent,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
      // Parse AI response and update shortcuts real-time
      const extractedShortcuts = parseAIResponseForFeatures(cleanContent);
      setAiShortcuts(prev => ({ ...prev, ...extractedShortcuts }));
      
      // Save assistant message to database
      await saveMessage(conversationId, 'assistant', cleanContent);

      // Update conversation title based on topic (first exchange only)
      if (messages.length === 0) {
        const title = generateConversationTitle(currentInput, cleanContent);
        await supabase
          .from('conversations')
          .update({ title })
          .eq('id', conversationId);
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Request was aborted');
      } else {
        console.error('Error sending message:', error);
        toast.error('Gagal mengirim pesan');
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleEditMessage = (index: number) => {
    setEditingIndex(index);
    setEditingContent(messages[index].content);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingContent('');
  };

  const handleSaveEdit = async () => {
    if (editingIndex === null || !editingContent.trim()) return;
    
    // Truncate messages to before the edited message
    const newMessages = messages.slice(0, editingIndex);
    setMessages(newMessages);
    setEditingIndex(null);
    
    // Send the edited message
    await handleSendMessage(editingContent);
    setEditingContent('');
  };

  const handleCopyMessage = async (content: string, index: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIndex(index);
      toast.success('Teks berhasil disalin');
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      console.error('Error copying text:', error);
      toast.error('Gagal menyalin teks');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-transparent flex overflow-hidden z-10">
      {/* 3D Blob Orb - Shows when AI is processing */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-24 h-24"
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <R3FBlob />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Background - Dark mode only */}
      <div className="fixed inset-0 -z-10 hidden dark:block">
        <WebGLShader />
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full mix-blend-normal filter blur-[128px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div 
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-normal filter blur-[128px]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7,
            }}
          />
          <motion.div 
            className="absolute top-1/4 right-1/3 w-64 h-64 bg-fuchsia-500/10 rounded-full mix-blend-normal filter blur-[96px]"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>
      </div>
      
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      {user && (
        <AnimatePresence>
          {(isSidebarOpen || window.innerWidth >= 768) && (
            <motion.div
              className="fixed md:relative z-50 h-screen"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <ConversationSidebar
                currentConversationId={currentConversationId}
                onSelectConversation={(id) => {
                  handleSelectConversation(id);
                  setIsSidebarOpen(false);
                }}
                onNewConversation={() => {
                  handleNewConversation();
                  setIsSidebarOpen(false);
                }}
                userId={user.id}
                onClose={() => setIsSidebarOpen(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen max-w-3xl mx-auto w-full px-4 py-6 md:px-6">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-6 px-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden hover:bg-foreground/5 h-9 w-9"
            >
              {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <Logo size="sm" />
                {selectedTool && (
                  <>
                    <span className="text-foreground/40">/</span>
                    <span className="text-lg md:text-xl font-medium text-foreground/80">
                      {aiTools.find(t => t.id === selectedTool)?.name}
                    </span>
                  </>
                )}
              </div>
              <motion.div 
                className="h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent mt-2 mb-1"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
              <p className="text-xs md:text-sm text-foreground/40 mt-1">
                Powered by AI • {usageCount}/{MAX_USAGE} credits
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="hover:bg-foreground/5 h-9 w-9"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Chat Area */}
        {messages.length === 0 ? (
          <motion.div 
            className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-3">
              <motion.h2 
                className="text-2xl md:text-3xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 to-foreground/40"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                How can I help today?
              </motion.h2>
              <motion.p 
                className="text-sm text-foreground/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Pilih AI tool dan mulai chat
              </motion.p>
            </div>

            {/* AI Tool Suggestions */}
            <motion.div 
              className="flex flex-wrap items-center justify-center gap-2 max-w-2xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {aiTools.map((tool, index) => (
                <motion.button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-background/5 hover:bg-background/10 backdrop-blur-sm rounded-lg text-sm text-foreground/60 hover:text-foreground/90 transition-all border border-foreground/5 relative group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tool.icon}
                  <span>{tool.name}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* Dashboard Quick Links */}
            <motion.div
              className="mt-8 w-full max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-xs text-foreground/40 text-center mb-4">Dashboard Tools</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {dashboardLinks.map((link, index) => (
                  <motion.button
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br ${link.color} border border-foreground/10 hover:border-foreground/20 transition-all`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.icon}
                    <span className="text-xs font-medium">{link.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 px-1">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} group`}
              >
                {editingIndex === index ? (
                  // Edit mode
                  <div className="max-w-[85%] md:max-w-[80%] w-full">
                    <textarea
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      className="w-full p-3 md:p-4 rounded-2xl text-sm md:text-base bg-foreground/90 text-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                      rows={3}
                      autoFocus
                    />
                    <div className="flex gap-2 mt-2 justify-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCancelEdit}
                        className="text-foreground/60 hover:text-foreground"
                      >
                        Batal
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSaveEdit}
                        disabled={!editingContent.trim()}
                        className="bg-foreground text-background hover:bg-foreground/90"
                      >
                        Kirim Ulang
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={cn(
                      "max-w-[85%] md:max-w-[80%] p-3 md:p-4 rounded-2xl text-sm md:text-base backdrop-blur-sm relative",
                      message.role === 'user'
                        ? 'bg-foreground/90 text-background'
                        : 'bg-background/10 text-foreground border border-foreground/10'
                    )}
                  >
                    <p className="whitespace-pre-wrap">{renderMessageContent(message.content)}</p>
                    {message.role === 'assistant' && (
                      <motion.button
                        onClick={() => handleCopyMessage(message.content, index)}
                        className="absolute -top-2 -right-2 p-1.5 bg-background/95 hover:bg-background border border-foreground/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Salin teks"
                      >
                        {copiedIndex === index ? (
                          <Check className="w-3.5 h-3.5 text-green-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-foreground/60" />
                        )}
                      </motion.button>
                    )}
                    {message.role === 'user' && !isLoading && (
                      <motion.button
                        onClick={() => handleEditMessage(index)}
                        className="absolute -top-2 -left-2 p-1.5 bg-background/95 hover:bg-background border border-foreground/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Edit pesan"
                      >
                        <Pencil className="w-3.5 h-3.5 text-foreground/60" />
                      </motion.button>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
            {isLoading && (
              <motion.div 
                className="flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="backdrop-blur-xl bg-background/10 rounded-2xl px-4 py-3 border border-foreground/10">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-foreground/5 flex items-center justify-center">
                      <span className="text-xs font-medium text-foreground/90">AI</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-foreground/70">Thinking</span>
                      <div className="flex items-center">
                        {[1, 2, 3].map((dot) => (
                          <motion.div
                            key={dot}
                            className="w-1.5 h-1.5 bg-foreground/90 rounded-full mx-0.5"
                            initial={{ opacity: 0.3 }}
                            animate={{ 
                              opacity: [0.3, 0.9, 0.3],
                              scale: [0.85, 1.1, 0.85]
                            }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              delay: dot * 0.15,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* AI Shortcut Buttons - Always visible when there are messages */}
            {messages.length > 0 && !isLoading && (
              <div className="mt-4 pt-4 border-t border-foreground/10">
                <p className="text-xs text-foreground/40 mb-2">
                  {Object.keys(aiShortcuts).length > 0 
                    ? '✨ AI mendeteksi fitur yang relevan:' 
                    : 'Akses cepat ke fitur:'}
                </p>
                <AIShortcutButtons 
                  shortcuts={aiShortcuts}
                  onShortcutClick={(type, data) => {
                    console.log('Shortcut clicked:', type, data);
                  }}
                />
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input Area */}
        <motion.div 
          className="relative backdrop-blur-2xl bg-background/5 rounded-2xl border border-foreground/10 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {showTools && (
              <motion.div 
                className="absolute left-4 right-4 bottom-full mb-2 backdrop-blur-xl bg-background/95 rounded-lg z-50 shadow-lg border border-foreground/10 overflow-hidden"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.15 }}
              >
                <div className="py-1">
                  {aiTools.map((tool, index) => (
                    <motion.div
                      key={tool.id}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 text-sm transition-colors cursor-pointer",
                        selectedTool === tool.id 
                          ? "bg-foreground/10 text-foreground" 
                          : "text-foreground/70 hover:bg-foreground/5"
                      )}
                      onClick={() => {
                        setSelectedTool(tool.id);
                        setShowTools(false);
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <div className="w-5 h-5 flex items-center justify-center text-foreground/60">
                        {tool.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{tool.name}</div>
                        <div className="text-xs text-foreground/40">{tool.description}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="p-4">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Kontenih AI a question..."
              className="w-full px-4 py-3 resize-none bg-transparent border-none text-foreground/90 text-sm focus:outline-none placeholder:text-foreground/20 min-h-[60px]"
              style={{ overflow: "hidden" }}
              disabled={isLoading}
            />
          </div>

          <div className="p-4 border-t border-foreground/5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.button
                type="button"
                onClick={() => setShowTools(!showTools)}
                whileTap={{ scale: 0.94 }}
                className={cn(
                  "p-2 text-foreground/40 hover:text-foreground/90 rounded-lg transition-colors relative group",
                  showTools && "bg-foreground/10 text-foreground/90"
                )}
              >
                <Command className="w-4 h-4" />
              </motion.button>
            </div>
            
            {isLoading ? (
              <motion.button
                type="button"
                onClick={handleStopGeneration}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
              >
                <Square className="w-4 h-4" />
                <span>Stop</span>
              </motion.button>
            ) : (
              <motion.button
                type="button"
                onClick={() => handleSendMessage()}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={!input.trim() || !selectedTool}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                  input.trim() && selectedTool
                    ? "bg-foreground text-background shadow-lg"
                    : "bg-foreground/5 text-foreground/40 cursor-not-allowed"
                )}
              >
                <SendIcon className="w-4 h-4" />
                <span>Send</span>
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default KontenihAI;
