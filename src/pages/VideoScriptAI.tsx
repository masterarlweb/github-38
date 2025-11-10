import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { WebGLShader } from '@/components/ui/web-gl-shader';
import { Video, Send, Loader2, ArrowLeft, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const VideoScriptAI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const removeAsterisks = (text: string) => text.replace(/\*/g, '');

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendToN8nWebhook = async (userMessage: string, aiResponse: string) => {
    try {
      await fetch('https://n8n-rphgibnj.us-east-1.clawcloudrun.com/webhook-test/0294b1eb-08b7-42ee-9cd5-1715d177cb9a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userMessage,
          aiResponse,
          timestamp: new Date().toISOString(),
          platform: 'video-script-ai',
        }),
      });
    } catch (error) {
      console.error('Webhook error:', error);
      toast({
        title: 'Warning',
        description: 'Failed to sync with automation system, but your chat is working fine.',
        variant: 'default',
      });
    }
  };

  const streamChat = async (userMessage: string) => {
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);
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
          body: JSON.stringify({ messages: newMessages }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get response');
      }

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let assistantMessage = '';
      let streamDone = false;

      // Add empty assistant message that we'll update
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

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
            // Incomplete JSON, put back in buffer
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Send to n8n webhook after successful streaming
      if (assistantMessage) {
        await sendToN8nWebhook(userMessage, assistantMessage);
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send message',
        variant: 'destructive',
      });
      // Remove the empty assistant message if error occurred
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    await streamChat(userMessage);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* WebGL Shader Background */}
      <div className="absolute inset-0 z-0">
        <WebGLShader />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="border-b border-white/10 bg-black/40 backdrop-blur-md">
          <div className="container-custom py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate('/')}
                  className="text-white hover:bg-white/10"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">Video Script AI</h1>
                    <p className="text-sm text-white/60">Powered by Kontenih AI</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-xs text-green-300">AI Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden">
          <div className="container-custom h-full py-6">
            <Card className="h-full bg-black/40 backdrop-blur-md border-white/10 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-purple-400" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-white">Video Script AI Assistant</h2>
                      <p className="text-white/60 max-w-md">
                        Get help creating engaging video scripts for any platform. Just describe your video idea and I'll help you craft the perfect script!
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 max-w-2xl">
                      <Button
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 justify-start text-left h-auto p-4"
                        onClick={() => setInput('Create a 60-second YouTube video script about sustainable fashion')}
                      >
                        <div className="text-sm">
                          <div className="font-semibold mb-1">YouTube Script</div>
                          <div className="text-white/60">60-second sustainable fashion</div>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 justify-start text-left h-auto p-4"
                        onClick={() => setInput('Write a viral TikTok script for a cooking tutorial')}
                      >
                        <div className="text-sm">
                          <div className="font-semibold mb-1">TikTok Script</div>
                          <div className="text-white/60">Viral cooking tutorial</div>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 justify-start text-left h-auto p-4"
                        onClick={() => setInput('Help me write an Instagram Reel script for product launch')}
                      >
                        <div className="text-sm">
                          <div className="font-semibold mb-1">Instagram Reel</div>
                          <div className="text-white/60">Product launch script</div>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 justify-start text-left h-auto p-4"
                        onClick={() => setInput('Create a YouTube Shorts script about productivity tips')}
                      >
                        <div className="text-sm">
                          <div className="font-semibold mb-1">YouTube Shorts</div>
                          <div className="text-white/60">Productivity tips</div>
                        </div>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            message.role === 'user'
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                              : 'bg-white/5 border border-white/10 text-white'
                          }`}
                        >
                          <div className="whitespace-pre-wrap">{message.content}</div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                          <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-white/10 p-4">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe your video idea or ask for script help..."
                    className="min-h-[60px] bg-white/5 border-white/10 text-white placeholder:text-white/40 resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shrink-0"
                    size="icon"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </Button>
                </form>
                <p className="text-xs text-white/40 mt-2">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoScriptAI;