import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ArrowUp, Video, Image, FileText, Sparkles, Wand2, MessageSquare, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { WebGLShader } from '@/components/ui/web-gl-shader';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { z } from 'zod';
import { ConversationSidebar } from '@/components/ConversationSidebar';

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
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
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

      // Update title if it's the first message
      if (role === 'user' && messages.length === 0) {
        const title = content.substring(0, 50) + (content.length > 50 ? '...' : '');
        await supabase
          .from('conversations')
          .update({ title })
          .eq('id', conversationId);
      }
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  const handleNewConversation = () => {
    setCurrentConversationId(null);
    setMessages([]);
    setSelectedTool(null);
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

  const handleSendMessage = async () => {
    if (!input.trim()) {
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

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    // Save user message to database
    await saveMessage(conversationId, 'user', currentInput);

    // Send message to n8n webhook via GET
    try {
      const n8nWebhookUrl = 'https://n8n-rphgibnj.us-east-1.clawcloudrun.com/webhook/0294b1eb-08b7-42ee-9cd5-1715d177cb9a';
      
      const params = new URLSearchParams({
        message: currentInput,
        tool: selectedTool || '',
        timestamp: new Date().toISOString(),
      });
      
      const response = await fetch(`${n8nWebhookUrl}?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
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
      
      // Save assistant message to database
      await saveMessage(conversationId, 'assistant', cleanContent);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Gagal mengirim pesan');
    } finally {
      setIsLoading(false);
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
    <div className="relative min-h-screen bg-background flex">
      <div className="fixed inset-0 -z-10">
        <WebGLShader />
      </div>
      
      {user && (
        <ConversationSidebar
          currentConversationId={currentConversationId}
          onSelectConversation={handleSelectConversation}
          onNewConversation={handleNewConversation}
          userId={user.id}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen max-w-5xl mx-auto w-full px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {selectedTool ? aiTools.find(t => t.id === selectedTool)?.name : 'KontenihAI'}
            </h1>
            <p className="text-sm text-muted-foreground">
              Powered by AI • Credit: {usageCount}/{MAX_USAGE}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="hover:bg-destructive/10"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>

        {/* Chat Messages */}
        <Card className="flex-1 mb-4 p-4 overflow-y-auto bg-card/30 backdrop-blur-sm">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <Sparkles className="w-16 h-16 mb-4 text-purple-400" />
              <h2 className="text-xl font-semibold mb-2">Mulai Percakapan Baru</h2>
              <p className="text-muted-foreground max-w-md">
                Pilih AI tool dan mulai chat untuk membuat konten yang amazing!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </Card>

        {/* Input Area */}
        <Card className="p-4 bg-card/50 backdrop-blur-sm">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik pesan Anda..."
              className="min-h-[60px] resize-none bg-background/50"
              disabled={isLoading}
            />
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowTools(!showTools)}
                className="relative"
              >
                {selectedTool ? (
                  aiTools.find(t => t.id === selectedTool)?.icon
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || !selectedTool || isLoading}
                size="icon"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* AI Tools Dropdown */}
          {showTools && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {aiTools.map((tool) => (
                <Button
                  key={tool.id}
                  variant={selectedTool === tool.id ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => {
                    setSelectedTool(tool.id);
                    setShowTools(false);
                  }}
                >
                  {tool.icon}
                  <span className="ml-2">{tool.name}</span>
                </Button>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default KontenihAI;
