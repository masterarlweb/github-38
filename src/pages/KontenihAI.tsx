import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ArrowUp, Paperclip, Video, Image, FileText, Sparkles, Wand2, MessageSquare, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { WebGLShader } from '@/components/ui/web-gl-shader';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { z } from 'zod';

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

const KontenihAI = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [showTools, setShowTools] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [usageCount, setUsageCount] = useState<number>(0);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const MAX_USAGE = 2;

  const aiTools: AITool[] = [
    {
      id: 'video-script',
      name: 'Video Script',
      icon: <Video className="w-4 h-4" />,
      description: 'Generate video scripts'
    },
    {
      id: 'image-gen',
      name: 'Image Creation',
      icon: <Image className="w-4 h-4" />,
      description: 'Create AI images'
    },
    {
      id: 'copywriting',
      name: 'Copywriting',
      icon: <FileText className="w-4 h-4" />,
      description: 'Smart copy generation'
    },
    {
      id: 'content-gen',
      name: 'Content Generator',
      icon: <Sparkles className="w-4 h-4" />,
      description: 'Generate content'
    },
    {
      id: 'design-assist',
      name: 'Design Assistant',
      icon: <Wand2 className="w-4 h-4" />,
      description: 'Get design suggestions'
    },
    {
      id: 'brand-voice',
      name: 'Brand Voice',
      icon: <MessageSquare className="w-4 h-4" />,
      description: 'Maintain brand consistency'
    }
  ];

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoadingAuth(false);
        
        if (!session?.user) {
          navigate('/auth');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoadingAuth(false);
      
      if (!session?.user) {
        navigate('/auth');
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
      console.error('Error fetching usage:', error);
    }
  };

  const updateUsageCount = async () => {
    if (!user) return;

    try {
      const newCount = usageCount + 1;
      
      const { error } = await supabase
        .from('usage_tracking')
        .upsert({
          user_id: user.id,
          usage_count: newCount,
          last_used_at: new Date().toISOString()
        });

      if (error) throw error;
      setUsageCount(newCount);

      if (newCount >= MAX_USAGE) {
        toast.error('Batas penggunaan gratis habis!');
        setTimeout(() => {
          navigate('/#pricing');
        }, 2000);
      }
    } catch (error) {
      console.error('Error updating usage:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
    toast.success('Berhasil logout');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const removeAsterisks = (text: string) => text.replace(/\*/g, '');

  const handleSendMessage = async () => {
    // Validate input
    try {
      messageSchema.parse({ message: input });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
        return;
      }
    }

    if (!selectedTool) {
      toast.error('Pilih tool AI terlebih dahulu');
      return;
    }

    if (usageCount >= MAX_USAGE) {
      toast.error('Batas penggunaan gratis habis! Berlangganan untuk melanjutkan.');
      setTimeout(() => {
        navigate('/#pricing');
      }, 1500);
      return;
    }

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Update usage count when sending first message
    await updateUsageCount();

    // Send message to n8n webhook
    try {
      const n8nWebhookUrl = 'https://n8n-rphgibnj.us-east-1.clawcloudrun.com/webhook-test/0294b1eb-08b7-42ee-9cd5-1715d177cb9a';
      
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          messages: [...messages, userMessage],
          tool: selectedTool,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal mendapatkan respons dari webhook');
      }

      const data = await response.json();
      console.log('Response dari n8n:', data);

      // Extract response content - adjust based on n8n webhook response structure
      let responseContent = '';
      if (typeof data === 'string') {
        responseContent = data;
      } else if (data.response) {
        responseContent = data.response;
      } else if (data.message) {
        responseContent = data.message;
      } else if (data.output) {
        responseContent = data.output;
      } else {
        responseContent = JSON.stringify(data, null, 2);
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: removeAsterisks(responseContent),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat memproses permintaan';
      toast.error(errorMessage);
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Memuat...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <WebGLShader />
      
      <div className="relative z-10 min-h-screen flex flex-col">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/30 backdrop-blur-lg sticky top-0 z-50 shadow-lg">
        <div className="container-custom px-3 sm:px-6 py-3 sm:py-4">
          {/* Top Row - Always Horizontal */}
          <div className="flex items-center justify-between gap-2 mb-2 sm:mb-0">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="text-white/60 hover:text-white hover:bg-white/10 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 h-auto flex-shrink-0"
              >
                ← <span className="hidden sm:inline ml-1">Kembali</span>
              </Button>
              <div className="flex-1 min-w-0">
                <h1 className="text-base sm:text-xl font-bold text-white truncate">Kontenih AI</h1>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-white/60 hover:text-white hover:bg-white/10 p-1.5 sm:p-2 h-auto flex-shrink-0"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Bottom Row - Status Badges */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <p className="text-xs sm:text-sm text-white/60 truncate flex-shrink min-w-0">
              {selectedTool
                ? aiTools.find((t) => t.id === selectedTool)?.name
                : 'Pilih tool AI'}
            </p>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 backdrop-blur-sm">
                <span className="text-[10px] sm:text-xs text-blue-300 font-medium whitespace-nowrap">
                  {MAX_USAGE - usageCount}/{MAX_USAGE}
                </span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 backdrop-blur-sm">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-[10px] sm:text-xs text-green-300 font-medium">AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col container-custom py-6 max-w-5xl">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-6 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Mulai Percakapan dengan AI
              </h2>
              <p className="text-white/60 max-w-md mx-auto">
                Pilih tool AI di bawah dan mulai chat untuk membuat konten yang
                menakjubkan. Anda memiliki {MAX_USAGE - usageCount} penggunaan gratis tersisa.
              </p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <Card
                  className={`max-w-[80%] p-4 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white border-0'
                      : 'bg-black/40 backdrop-blur-md border border-white/10 text-white'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </Card>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <Card className="max-w-[80%] p-4 bg-black/40 backdrop-blur-md border border-white/10">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse delay-75"></div>
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse delay-150"></div>
                </div>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <Card className="bg-black/60 backdrop-blur-md border border-white/10 p-4 sticky bottom-0">
          <div className="space-y-3">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                selectedTool
                  ? `Tanyakan tentang ${aiTools.find((t) => t.id === selectedTool)?.name}...`
                  : 'Pilih tool AI terlebih dahulu...'
              }
              className="min-h-[80px] bg-transparent border-0 text-white placeholder:text-white/40 resize-none focus-visible:ring-0"
              disabled={isLoading || !selectedTool || usageCount >= MAX_USAGE}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTools(!showTools)}
                  className="text-white/60 hover:text-white hover:bg-white/10"
                  disabled={usageCount >= MAX_USAGE}
                >
                  <Paperclip className="w-4 h-4 mr-2" />
                  Tools
                </Button>

                {/* Tools Dropdown */}
                {showTools && (
                  <div className="absolute bottom-16 left-4 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg p-2 shadow-xl z-50">
                    <div className="grid grid-cols-2 gap-2">
                      {aiTools.map((tool) => (
                        <Button
                          key={tool.id}
                          variant={selectedTool === tool.id ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => {
                            setSelectedTool(tool.id);
                            setShowTools(false);
                            toast.success(`${tool.name} dipilih`);
                          }}
                          className={`justify-start ${
                            selectedTool === tool.id
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                              : 'text-white/80 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {tool.icon}
                          <span className="ml-2">{tool.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTool && (
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30">
                    {aiTools.find((t) => t.id === selectedTool)?.icon}
                    <span className="text-xs text-purple-300">
                      {aiTools.find((t) => t.id === selectedTool)?.name}
                    </span>
                  </div>
                )}
              </div>

              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim() || !selectedTool || usageCount >= MAX_USAGE}
                size="icon"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full"
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
    </div>
  );
};

export default KontenihAI;