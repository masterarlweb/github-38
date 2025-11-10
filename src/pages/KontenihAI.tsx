import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ArrowUp, Paperclip, Video, Image, FileText, Sparkles, Wand2, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { WebGLShader } from '@/components/ui/web-gl-shader';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const removeAsterisks = (text: string) => text.replace(/\*/g, '');

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    if (!selectedTool) {
      toast.error('Pilih tool AI terlebih dahulu');
      return;
    }

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // For now, only Video Script is fully implemented
    if (selectedTool === 'video-script') {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/video-script-chat`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            },
            body: JSON.stringify({
              messages: [...messages, userMessage],
            }),
          }
        );

        if (!response.ok || !response.body) {
          throw new Error('Failed to get response');
        }

        setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let textBuffer = '';
        let assistantMessage = '';
        let streamDone = false;

        while (!streamDone) {
          const { done, value } = await reader.read();
          if (done) break;

          textBuffer += decoder.decode(value, { stream: true });
          let newlineIndex: number;

          while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
            let line = textBuffer.slice(0, newlineIndex);
            textBuffer = textBuffer.slice(newlineIndex + 1);

            if (line.endsWith('\r')) line = line.slice(0, -1);
            if (line.startsWith(':') || line.trim() === '') continue;
            if (!line.startsWith('data: ')) continue;

            const jsonStr = line.slice(6).trim();
            if (jsonStr === '[DONE]') {
              streamDone = true;
              break;
            }

            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                assistantMessage += content;
                setMessages((prev) => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = {
                    role: 'assistant',
                    content: removeAsterisks(assistantMessage),
                  };
                  return newMessages;
                });
              }
            } catch {
              textBuffer = line + '\n' + textBuffer;
              break;
            }
          }
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Terjadi kesalahan saat memproses permintaan');
        setMessages((prev) => prev.slice(0, -1));
      } finally {
        setIsLoading(false);
      }
    } else {
      // For other tools, show coming soon message
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `Fitur ${aiTools.find(t => t.id === selectedTool)?.name} sedang dalam pengembangan. Saat ini hanya Video Script yang tersedia.`,
          },
        ]);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <WebGLShader />
      
      <div className="relative z-10 min-h-screen flex flex-col">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="container-custom py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              ← Kembali
            </Button>
            <div>
              <h1 className="text-xl font-bold text-white">Kontenih AI</h1>
              <p className="text-sm text-white/60">
                {selectedTool
                  ? aiTools.find((t) => t.id === selectedTool)?.name
                  : 'Pilih tool AI untuk memulai'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-xs text-green-300">AI Ready</span>
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
                menakjubkan
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
              disabled={isLoading || !selectedTool}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTools(!showTools)}
                  className="text-white/60 hover:text-white hover:bg-white/10"
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
                disabled={isLoading || !input.trim() || !selectedTool}
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
