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

const HomeChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Halo! Saya asisten AI Kontenih. Saya bisa membantu Anda dengan informasi tentang layanan AI Agent kami, harga, proses pembuatan, dan semua yang perlu Anda ketahui. Ada yang bisa saya bantu?',
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
    'Apa itu Kontenih?',
    'Jenis AI Agent apa saja?',
    'Berapa harga layanan?',
    'Bagaimana cara pemesanan?',
    'Portfolio hasil kerja?',
    'Kontak tim Kontenih'
  ];

  const getBotResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    // About Kontenih
    if (msg.includes('kontenih') || msg.includes('tentang') || msg.includes('perusahaan')) {
      return 'Kontenih adalah penyedia solusi AI Agent terdepan di Indonesia. Kami mengembangkan AI Agent khusus untuk bisnis dengan fokus pada Marketing Agent dan Receptionist Agent. Tim kami berpengalaman mengintegrasikan AI ke dalam workflow bisnis untuk meningkatkan efisiensi dan produktivitas.';
    }
    
    // AI Agent Types
    if (msg.includes('jenis') || msg.includes('tipe') || msg.includes('macam')) {
      return 'Kami menyediakan 2 jenis AI Agent utama:\n\n1. **Marketing Agent**: Otomatisasi konten marketing, newsletter, social media management, video creation, dan riset konten\n\n2. **Receptionist Agent**: Sistem penjawab telepon otomatis 24/7, appointment scheduling, call screening, dan CRM integration\n\nMasing-masing bisa dikustomisasi sesuai kebutuhan bisnis Anda.';
    }
    
    // Pricing
    if (msg.includes('harga') || msg.includes('biaya') || msg.includes('price') || msg.includes('tarif')) {
      return 'Paket harga AI Agent kami:\n\n**Basic Plan**: Rp 2.5 juta/bulan\n**Professional Plan**: Rp 4.5 juta/bulan\n**Enterprise Plan**: Rp 7.5 juta/bulan\n\nHarga final tergantung kompleksitas dan fitur yang dipilih. Konsultasi gratis tersedia untuk menentukan paket yang tepat untuk bisnis Anda!';
    }
    
    // How to order
    if (msg.includes('pesan') || msg.includes('order') || msg.includes('beli') || msg.includes('cara') && msg.includes('buat')) {
      return 'Proses pemesanan sangat mudah:\n\n1. Konsultasi gratis dengan tim kami\n2. Analisis kebutuhan bisnis Anda\n3. Proposal dan quote sesuai requirement\n4. Development & testing (1-4 minggu)\n5. Training dan implementasi\n6. Support berkelanjutan\n\nMulai dengan mengisi form konsultasi atau hubungi hellokontenih@gmail.com';
    }
    
    // Portfolio/Gallery
    if (msg.includes('portfolio') || msg.includes('hasil') || msg.includes('contoh') || msg.includes('gallery')) {
      return 'Portfolio kami mencakup berbagai implementasi AI Agent:\n\n• Sistem newsletter otomatis untuk e-commerce\n• Video marketing viral untuk brand fashion\n• Receptionist AI untuk klinik kesehatan\n• Content repurposing untuk media agency\n• Call center automation untuk service company\n\nLihat gallery lengkap di website untuk melihat hasil kerja nyata kami!';
    }
    
    // Contact information
    if (msg.includes('kontak') || msg.includes('hubungi') || msg.includes('contact')) {
      return 'Hubungi tim Kontenih:\n\n📧 Email: hellokontenih@gmail.com\n📱 WhatsApp: Available via website\n🌐 Website: kontenih.com\n📍 Lokasi: Indonesia\n\n⏰ Response time: Maksimal 24 jam\n🎯 Konsultasi gratis tersedia!\n\nTim kami siap membantu Anda mengimplementasikan AI Agent untuk bisnis.';
    }
    
    // Marketing Agent specific
    if (msg.includes('marketing')) {
      return 'Marketing Agent kami memiliki kemampuan:\n\n✅ Newsletter automation dengan personalisasi\n✅ Content generation untuk social media\n✅ Video viral creation dan editing\n✅ Riset konten trending dan competitor analysis\n✅ Campaign optimization dan A/B testing\n✅ Analytics dan reporting otomatis\n\nCocok untuk business yang ingin scale marketing efforts tanpa menambah tim besar.';
    }
    
    // Receptionist Agent specific
    if (msg.includes('receptionist') || msg.includes('telepon') || msg.includes('call')) {
      return 'Receptionist Agent features:\n\n📞 24/7 automatic call handling\n📅 Smart appointment scheduling\n🔍 Intelligent call screening\n💾 CRM integration seamless\n📊 Call analytics dan reporting\n🤖 Natural conversation flow\n\nPerfect untuk bisnis dengan volume panggilan tinggi yang ingin improve customer service experience.';
    }
    
    // Process and timeline
    if (msg.includes('lama') || msg.includes('waktu') || msg.includes('proses') || msg.includes('durasi')) {
      return 'Timeline pengembangan AI Agent:\n\n**Week 1**: Requirement analysis & system design\n**Week 2**: Core development & basic testing\n**Week 3**: Advanced features & integration\n**Week 4**: Final testing, training & deployment\n\nUntuk project kompleks bisa 4-6 minggu. Kami provide regular updates dan demo session selama development process.';
    }
    
    // Features comparison
    if (msg.includes('fitur') || msg.includes('feature') || msg.includes('kemampuan')) {
      return 'Fitur unggulan AI Agent Kontenih:\n\n🧠 **AI Technology**: GPT-4 powered dengan custom training\n🔄 **Integration**: CRM, email marketing, social media\n📊 **Analytics**: Real-time reporting dan insights\n🛡️ **Security**: Enterprise-grade data protection\n⚡ **Performance**: Response time <2 detik\n🔧 **Customization**: Fully tailored untuk bisnis Anda\n\nSemua fitur designed untuk maximize ROI dan business efficiency.';
    }
    
    // Trial and demo
    if (msg.includes('trial') || msg.includes('coba') || msg.includes('demo') || msg.includes('test')) {
      return 'Ya! Kami menyediakan:\n\n🎯 **Demo Session**: 30 menit live demonstration\n⏱️ **Free Trial**: 7 hari setelah deployment\n💡 **Proof of Concept**: Mini implementation untuk testing\n📊 **Performance Report**: Analisis hasil trial period\n\nAnda bisa merasakan manfaat AI Agent sebelum commit jangka panjang. Book demo session sekarang!';
    }

    return 'Terima kasih atas pertanyaannya! Saya siap membantu Anda dengan informasi tentang:\n\n• Layanan AI Agent (Marketing & Receptionist)\n• Harga dan paket berlangganan\n• Proses development dan timeline\n• Portfolio dan hasil kerja\n• Kontak tim Kontenih\n\nSilakan tanya apa yang ingin Anda ketahui lebih lanjut, atau pilih topik di atas untuk informasi detail!';
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
    setTimeout(() => {
      handleSendMessage();
    }, 100);
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
          className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 shadow-2xl hover:shadow-primary/20 transition-all duration-300 animate-pulse"
        >
          <MessageCircle className="h-7 w-7 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-96 shadow-2xl transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[600px]'} bg-background border-border`}>
        <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Kontenih AI Assistant</h3>
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
                      ? 'bg-primary/10' 
                      : 'bg-gradient-to-r from-primary to-primary/80'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-primary" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className={`max-w-[70%] p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-primary text-white ml-auto'
                      : 'bg-muted text-foreground'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-muted p-3 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 1 && (
              <div className="p-4 border-t bg-muted/50">
                <p className="text-xs text-muted-foreground mb-2">Pertanyaan populer:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.slice(0, 3).map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs h-7 px-2 bg-background hover:bg-muted border-border"
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {quickReplies.slice(3).map((reply, index) => (
                    <Button
                      key={index + 3}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs h-7 px-2 bg-background hover:bg-muted border-border"
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t bg-background">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tanyakan tentang Kontenih..."
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 text-white px-4"
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

export default HomeChatbot;