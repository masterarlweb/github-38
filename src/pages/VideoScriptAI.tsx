import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { WebGLShader } from '@/components/ui/web-gl-shader';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const VideoScriptAI = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const removeAsterisks = (text: string) => text.replace(/\*/g, '');

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendToN8nWebhook = async (chatData: { messages: Message[] }) => {
    try {
      await fetch('https://siapaboss.app.n8n.cloud/webhook/d83b7ecd-c3c6-4c94-a0d4-5d80ccb9fa6e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatData),
      });
    } catch (error) {
      console.error('Error sending to n8n webhook:', error);
    }
  };

  const streamChat = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

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
            messages: newMessages,
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

      const finalMessages: Message[] = [...newMessages, { role: 'assistant' as const, content: removeAsterisks(assistantMessage) }];
      await sendToN8nWebhook({ messages: finalMessages });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Terjadi kesalahan saat memproses permintaan');
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    streamChat();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      streamChat();
    }
  };

  const examplePrompts = [
    "Buatkan script video untuk promosi produk kecantikan",
    "Buat konten edukatif tentang tips produktivitas",
    "Script video tutorial memasak sederhana",
  ];

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
                <h1 className="text-xl font-bold text-white">Video Script AI</h1>
                <p className="text-sm text-white/60">
                  Buat script video yang menarik dengan AI
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
        <div className="flex-1 flex flex-col container-custom py-6 max-w-4xl">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto mb-6 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-20 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-white">
                    Mulai Buat Script Video
                  </h2>
                  <p className="text-white/60 max-w-md mx-auto">
                    Ceritakan ide video Anda, dan AI akan membantu membuat script yang menarik
                  </p>
                </div>
                <div className="grid gap-3 max-w-2xl mx-auto">
                  {examplePrompts.map((prompt, index) => (
                    <Card
                      key={index}
                      className="p-4 bg-black/40 backdrop-blur-md border border-white/10 hover:border-purple-500/50 cursor-pointer transition-all"
                      onClick={() => setInput(prompt)}
                    >
                      <p className="text-white/80 text-sm">{prompt}</p>
                    </Card>
                  ))}
                </div>
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
            <form onSubmit={handleSubmit} className="space-y-3">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ceritakan ide video Anda..."
                className="min-h-[80px] bg-transparent border-0 text-white placeholder:text-white/40 resize-none focus-visible:ring-0"
                disabled={isLoading}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  size="icon"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full"
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideoScriptAI;
