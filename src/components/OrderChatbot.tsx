import { useState, useRef, useEffect } from 'react';
import { Bot, Send, MessageCircle, X, Minimize2, Maximize2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface OrderChatbotProps {
  onAgentTypeSelect?: (type: 'marketing' | 'receptionist') => void;
}

const OrderChatbot = ({ onAgentTypeSelect }: OrderChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Halo! Saya asisten AI untuk membantu Anda memilih dan memesan AI Agent yang tepat. Ada yang bisa saya bantu?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    'Apa perbedaan Marketing Agent vs Receptionist?',
    'Berapa harga AI Agent?',
    'Berapa lama proses pembuatan?',
    'Fitur apa saja yang tersedia?',
    'Apakah ada free trial?'
  ];

  const getBotResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('perbedaan') || msg.includes('marketing') && msg.includes('receptionist')) {
      return 'Marketing Agent fokus pada otomatisasi konten dan kampanye marketing (newsletter, social media, video). Sedangkan Receptionist Agent adalah sistem penjawab telepon otomatis 24/7 untuk customer service dan penjadwalan.';
    }
    
    if (msg.includes('harga') || msg.includes('biaya') || msg.includes('price')) {
      return 'Harga AI Agent dimulai dari Rp 2.5 juta/bulan untuk paket basic. Harga final tergantung fitur yang dipilih dan kompleksitas kebutuhan bisnis Anda. Tim kami akan memberikan quote spesifik setelah konsultasi gratis.';
    }
    
    if (msg.includes('lama') || msg.includes('waktu') || msg.includes('proses')) {
      return 'Proses pembuatan AI Agent biasanya memakan waktu 1-2 minggu untuk basic setup dan 3-4 minggu untuk full customization. Ini termasuk development, testing, dan training.';
    }
    
    if (msg.includes('fitur') || msg.includes('feature')) {
      return 'Fitur Marketing Agent: Newsletter otomatis, content generation, social media management, video creation. Fitur Receptionist: Call handling 24/7, appointment scheduling, call screening, CRM integration.';
    }
    
    if (msg.includes('trial') || msg.includes('coba') || msg.includes('demo')) {
      return 'Ya! Kami menyediakan demo 30 menit dan free trial 7 hari setelah setup selesai. Anda bisa merasakan manfaatnya langsung sebelum komit jangka panjang.';
    }
    
    if (msg.includes('marketing')) {
      return 'Marketing Agent cocok untuk bisnis yang ingin mengotomatisasi konten marketing. Fitur unggulan: pembuatan newsletter, content repurposing, video viral, dan riset konten mendalam. Mau saya bantu isi form untuk Marketing Agent?';
    }
    
    if (msg.includes('receptionist') || msg.includes('telepon')) {
      return 'Receptionist Agent perfect untuk bisnis dengan volume panggilan tinggi. Bisa handle appointment, screening calls, memberikan info produk, dan terintegrasi dengan CRM. Tertarik untuk mencoba?';
    }
    
    if (msg.includes('kontak') || msg.includes('hubungi')) {
      return 'Anda bisa menghubungi tim kami di hellokontenih@gmail.com atau langsung isi form pemesanan di halaman ini. Tim kami akan response dalam 24 jam!';
    }

    return 'Terima kasih atas pertanyaannya! Untuk informasi lebih detail, silakan pilih salah satu topik di bawah atau langsung tanyakan ke saya. Tim kami juga siap membantu via konsultasi gratis.';
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getBotResponse(inputValue),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    handleSendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90 shadow-2xl hover:shadow-purple-200 transition-all duration-300 animate-pulse"
        >
          <MessageCircle className="h-7 w-7 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-96 shadow-2xl transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[600px]'} bg-white border-purple-200`}>
        <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">AI Assistant</h3>
                <p className="text-xs opacity-90">Siap membantu Anda</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 w-8 h-8 p-0"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 w-8 h-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[536px]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-purple-100' 
                      : 'bg-gradient-to-r from-purple-500 to-indigo-600'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-purple-600" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className={`max-w-[70%] p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-purple-600 text-white ml-auto'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 1 && (
              <div className="p-4 border-t bg-gray-50">
                <p className="text-xs text-gray-600 mb-2">Pertanyaan umum:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.slice(0, 3).map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs h-7 px-2 bg-white hover:bg-purple-50 border-gray-200"
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tanyakan tentang AI Agent..."
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90 text-white px-4"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default OrderChatbot;