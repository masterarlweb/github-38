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
    
    // Greeting variations
    if (msg.includes('halo') || msg.includes('hai') || msg.includes('hello') || msg.includes('hi') || msg.includes('selamat')) {
      return 'Halo! Selamat datang di Kontenih! 😊 Saya di sini untuk membantu Anda memahami bagaimana AI Agent kami dapat mentransformasi bisnis Anda. Ada yang ingin Anda ketahui tentang solusi AI kami?';
    }

    // Appreciation and politeness
    if (msg.includes('terima kasih') || msg.includes('thanks') || msg.includes('makasih')) {
      return 'Sama-sama! Saya senang bisa membantu Anda. Jika ada pertanyaan lain tentang AI Agent Kontenih, jangan ragu untuk bertanya. Tim kami juga siap memberikan konsultasi gratis kapan saja! 🙏';
    }

    // About Kontenih - expanded keywords
    if (msg.includes('kontenih') || msg.includes('tentang') || msg.includes('perusahaan') || msg.includes('company') || msg.includes('about') || msg.includes('siapa')) {
      return 'Kontenih adalah penyedia solusi AI Agent terdepan di Indonesia yang telah dipercaya oleh 100+ bisnis. Kami mengembangkan AI Agent khusus untuk bisnis dengan fokus pada Marketing Agent dan Receptionist Agent. Tim kami berpengalaman mengintegrasikan AI ke dalam workflow bisnis untuk meningkatkan efisiensi hingga 300% dan produktivitas tim Anda.';
    }
    
    // AI Agent Types - expanded keywords
    if (msg.includes('jenis') || msg.includes('tipe') || msg.includes('macam') || msg.includes('pilihan') || msg.includes('varian') || msg.includes('kategori') || msg.includes('agent')) {
      return 'Kami menyediakan 2 jenis AI Agent utama:\n\n1. **Marketing Agent**: Otomatisasi konten marketing, newsletter automation, social media management, video creation viral, riset konten mendalam, competitor analysis\n\n2. **Receptionist Agent**: Sistem penjawab telepon otomatis 24/7, appointment scheduling pintar, call screening, CRM integration seamless, customer support automation\n\nMasing-masing bisa dikustomisasi 100% sesuai kebutuhan dan branding bisnis Anda. Mau saya jelaskan lebih detail yang mana?';
    }
    
    // Pricing - expanded keywords
    if (msg.includes('harga') || msg.includes('biaya') || msg.includes('price') || msg.includes('tarif') || msg.includes('cost') || msg.includes('murah') || msg.includes('mahal') || msg.includes('investasi') || msg.includes('budget')) {
      return 'Paket harga AI Agent kami sangat kompetitif:\n\n**Basic Plan**: Rp 2.5 juta/bulan - Perfect untuk startup\n**Professional Plan**: Rp 4.5 juta/bulan - Ideal untuk growing business\n**Enterprise Plan**: Rp 7.5 juta/bulan - Complete solution untuk enterprise\n\n💰 ROI rata-rata: 400% dalam 6 bulan\n🎯 Hemat biaya tim hingga 60%\n📈 Increase productivity sampai 300%\n\nHarga final disesuaikan dengan kompleksitas dan fitur yang dipilih. Konsultasi gratis tersedia untuk menentukan paket yang tepat!';
    }
    
    // How to order - expanded keywords
    if (msg.includes('pesan') || msg.includes('order') || msg.includes('beli') || msg.includes('cara') || msg.includes('buat') || msg.includes('daftar') || msg.includes('mulai') || msg.includes('start') || msg.includes('booking')) {
      return 'Proses pemesanan sangat mudah dan transparan:\n\n1. **Konsultasi Gratis** (30 menit) - Analisis kebutuhan bisnis\n2. **Proposal Detailed** - Customized solution untuk Anda\n3. **Agreement & Payment** - Flexible payment terms\n4. **Development Phase** (1-4 minggu) - Regular updates\n5. **Testing & Training** - Comprehensive onboarding\n6. **Go Live & Support** - 24/7 ongoing support\n\n🚀 Mulai dengan konsultasi gratis atau langsung hubungi hellokontenih@gmail.com\n📞 Response time: < 2 jam (working hours)';
    }
    
    // Portfolio/Gallery - expanded keywords
    if (msg.includes('portfolio') || msg.includes('hasil') || msg.includes('contoh') || msg.includes('gallery') || msg.includes('case study') || msg.includes('sukses') || msg.includes('klien') || msg.includes('client') || msg.includes('testimoni')) {
      return 'Portfolio dan success stories kami:\n\n🏆 **E-commerce Fashion**: Newsletter automation → 250% increase sales\n📱 **Tech Startup**: Social media agent → 500K followers dalam 3 bulan\n🏥 **Healthcare Clinic**: Receptionist AI → 90% call handling efficiency\n📺 **Media Agency**: Content repurposing → 300% faster content production\n🏢 **Service Company**: Call center automation → 60% cost reduction\n\n✨ Tingkat kepuasan klien: 98%\n🎯 Average ROI: 400% dalam 6 bulan\n\nLihat gallery lengkap dan testimoni video klien di website kami!';
    }
    
    // Contact information - expanded keywords
    if (msg.includes('kontak') || msg.includes('hubungi') || msg.includes('contact') || msg.includes('email') || msg.includes('whatsapp') || msg.includes('telpon') || msg.includes('call') || msg.includes('chat')) {
      return 'Hubungi tim Kontenih dengan mudah:\n\n📧 **Email**: hellokontenih@gmail.com\n📱 **WhatsApp**: Klik button WA di website\n🌐 **Website**: kontenih.com\n📍 **Lokasi**: Jakarta, Indonesia\n💬 **Live Chat**: Available di website 24/7\n\n⚡ **Response Time**:\n• Email: < 2 jam (working hours)\n• WhatsApp: < 30 menit\n• Live Chat: Real-time\n\n🎯 **Free Consultation**: 30 menit dengan AI specialist\n✅ **Available**: Senin-Jumat 9AM-6PM WIB';
    }
    
    // Marketing Agent specific - expanded keywords
    if (msg.includes('marketing') || msg.includes('social media') || msg.includes('newsletter') || msg.includes('content') || msg.includes('video') || msg.includes('iklan') || msg.includes('promosi')) {
      return 'Marketing Agent kami - solusi complete marketing automation:\n\n✅ **Newsletter Automation**: Personalisasi advanced + A/B testing\n✅ **Content Generation**: Blog, social media, copywriting\n✅ **Video Creation**: Viral content + automated editing\n✅ **Social Media Management**: Multi-platform scheduling\n✅ **Competitor Analysis**: Real-time market intelligence\n✅ **Campaign Optimization**: AI-powered performance tuning\n✅ **Analytics Dashboard**: Comprehensive reporting\n\n📈 **Results**: Average 300% increase engagement\n💰 **ROI**: 400%+ dalam 6 bulan\n⏰ **Time Saved**: 25 jam/minggu untuk tim marketing\n\nCocok untuk bisnis yang ingin scale marketing efforts without expanding team!';
    }
    
    // Receptionist Agent specific - expanded keywords
    if (msg.includes('receptionist') || msg.includes('telepon') || msg.includes('call') || msg.includes('customer service') || msg.includes('pelayanan') || msg.includes('appointment') || msg.includes('jadwal')) {
      return 'Receptionist Agent - customer service revolution:\n\n📞 **24/7 Call Handling**: Never miss important calls\n📅 **Smart Appointment**: Automatic scheduling + reminders\n🔍 **Intelligent Screening**: Priority call routing\n💾 **CRM Integration**: Seamless data management\n📊 **Call Analytics**: Detailed performance insights\n🤖 **Natural Conversation**: Human-like interaction\n🌍 **Multi-language**: Support bahasa Indonesia & English\n\n💼 **Perfect untuk**:\n• Klinik & hospital\n• Service companies\n• Consultancy firms\n• Real estate agencies\n\n📈 **Impact**: 90% call handling efficiency, 60% cost reduction\n\nTransformasi customer experience Anda hari ini!';
    }
    
    // Process and timeline - expanded keywords
    if (msg.includes('lama') || msg.includes('waktu') || msg.includes('proses') || msg.includes('durasi') || msg.includes('berapa lama') || msg.includes('timeline') || msg.includes('schedule') || msg.includes('kapan')) {
      return 'Timeline pengembangan AI Agent yang efisien:\n\n**Week 1**: Requirements gathering & system architecture design\n**Week 2**: Core AI development & initial testing\n**Week 3**: Advanced features development & integration\n**Week 4**: Final testing, training & deployment\n\n⚡ **Express Option**: 2 minggu untuk basic setup\n🏢 **Enterprise**: 4-6 minggu untuk full customization\n📊 **Progress Updates**: Weekly demo sessions\n🔄 **Revisi**: Unlimited minor adjustments\n\n🎯 **Milestone Payments**: Pay as we deliver\n✅ **Quality Guarantee**: 30-day satisfaction guarantee\n🚀 **Quick Start**: Bisa mulai dalam 24 jam after agreement';
    }
    
    // Features comparison - expanded keywords
    if (msg.includes('fitur') || msg.includes('feature') || msg.includes('kemampuan') || msg.includes('fungsi') || msg.includes('teknologi') || msg.includes('AI') || msg.includes('artificial intelligence')) {
      return 'Fitur unggulan AI Agent Kontenih yang membedakan kami:\n\n🧠 **AI Technology**: GPT-4 Turbo + custom training model\n🔄 **Integration Hub**: 50+ tools (CRM, email, social media)\n📊 **Analytics Suite**: Real-time reporting + predictive insights\n🛡️ **Enterprise Security**: Bank-level data protection\n⚡ **Lightning Performance**: Response time <2 detik\n🔧 **Full Customization**: 100% tailored untuk brand Anda\n🌍 **Multi-platform**: Web, mobile, WhatsApp, Telegram\n📱 **Mobile-first**: Responsive di semua device\n\n🎯 **Unique Features**:\n• Voice cloning untuk receptionist\n• Behavioral learning dari interaction\n• Sentiment analysis real-time\n• Auto-escalation ke human agent\n\nSemua designed untuk maximize ROI dan business efficiency!';
    }
    
    // Trial and demo - expanded keywords
    if (msg.includes('trial') || msg.includes('coba') || msg.includes('demo') || msg.includes('test') || msg.includes('gratis') || msg.includes('free') || msg.includes('preview') || msg.includes('sample')) {
      return 'Absolutely! Kami confident dengan kualitas AI Agent kami:\n\n🎯 **Free Demo Session**: 30 menit live demonstration\n⏱️ **Free Trial**: 7 hari full access setelah deployment\n💡 **Proof of Concept**: Mini implementation untuk testing\n📊 **Performance Report**: Detailed analytics trial period\n🔄 **No Commitment**: Cancel anytime during trial\n💰 **Money-back Guarantee**: 30 hari satisfaction guarantee\n\n**Demo Includes**:\n• Live AI Agent interaction\n• Customization possibilities\n• Integration demonstration\n• Q&A session dengan specialist\n• Custom proposal presentation\n\n📅 **Book Demo**: Available today!\n⚡ **Setup Trial**: Ready dalam 24 jam\n\nAnda akan merasakan manfaat nyata sebelum commit jangka panjang!';
    }

    // ROI and business benefits - expanded keywords
    if (msg.includes('roi') || msg.includes('benefit') || msg.includes('manfaat') || msg.includes('untung') || msg.includes('keuntungan') || msg.includes('efisiensi') || msg.includes('produktivitas')) {
      return 'ROI dan manfaat bisnis yang terbukti:\n\n💰 **Financial Impact**:\n• ROI rata-rata: 400% dalam 6 bulan\n• Cost reduction: 60% untuk customer service\n• Revenue increase: 250% untuk marketing\n\n⚡ **Operational Benefits**:\n• Time saved: 25-30 jam/minggu per tim\n• Accuracy: 99.7% task completion\n• Availability: 24/7 tanpa break\n• Scalability: Handle 1000+ interactions/hari\n\n📈 **Growth Metrics**:\n• Customer satisfaction: +40%\n• Response time: 95% faster\n• Lead conversion: +200%\n• Employee productivity: +300%\n\n🎯 **Strategic Advantages**:\n• Competitive edge dengan AI technology\n• Future-proof business operations\n• Data-driven decision making\n• Enhanced customer experience';
    }

    // Security and reliability - expanded keywords
    if (msg.includes('keamanan') || msg.includes('security') || msg.includes('data') || msg.includes('privasi') || msg.includes('privacy') || msg.includes('aman') || msg.includes('reliable')) {
      return 'Keamanan dan reliability adalah prioritas utama kami:\n\n🛡️ **Data Security**:\n• Enterprise-grade encryption (AES-256)\n• GDPR & ISO 27001 compliant\n• Secure cloud infrastructure AWS/GCP\n• Regular security audits\n\n🔒 **Privacy Protection**:\n• Data tidak dibagi ke pihak ketiga\n• Local data storage option\n• User consent management\n• Right to data deletion\n\n⚡ **System Reliability**:\n• 99.9% uptime guarantee\n• Auto-failover mechanisms\n• Real-time monitoring 24/7\n• Disaster recovery protocols\n\n✅ **Compliance Standards**:\n• Indonesian data protection laws\n• International security frameworks\n• Regular compliance audits\n• Transparent privacy policies\n\nBisnis Anda aman di tangan kami!';
    }

    // Support and maintenance - expanded keywords
    if (msg.includes('support') || msg.includes('maintenance') || msg.includes('bantuan') || msg.includes('help') || msg.includes('troubleshoot') || msg.includes('masalah') || msg.includes('error')) {
      return 'Support dan maintenance comprehensive untuk kepuasan Anda:\n\n🎯 **24/7 Technical Support**:\n• Live chat dengan technical team\n• Phone support untuk urgent issues\n• Email support dengan response <2 jam\n• Remote assistance available\n\n🔧 **Maintenance Services**:\n• Weekly system optimization\n• Monthly performance reviews\n• Quarterly feature updates\n• Annual comprehensive audit\n\n📚 **Knowledge Resources**:\n• Complete user documentation\n• Video training tutorials\n• Best practices guidelines\n• FAQ database comprehensive\n\n⚡ **Emergency Support**:\n• Critical issue: <1 jam response\n• System downtime: Immediate escalation\n• Data recovery: Professional handling\n• Disaster recovery: Full backup systems\n\n✅ **Included in All Plans**: No hidden costs!';
    }

    // Industry specific solutions
    if (msg.includes('industri') || msg.includes('industry') || msg.includes('sektor') || msg.includes('bidang') || msg.includes('usaha') || msg.includes('bisnis jenis')) {
      return 'Solusi AI Agent untuk berbagai industri:\n\n🏥 **Healthcare**: Appointment AI, patient screening, medical info\n🏪 **Retail/E-commerce**: Sales automation, customer support, inventory\n🏢 **Real Estate**: Lead qualification, property info, viewing schedule\n🎓 **Education**: Student support, course info, enrollment assistance\n🍽️ **F&B**: Reservation system, menu recommendations, order taking\n💼 **Professional Services**: Client screening, consultation booking\n🏭 **Manufacturing**: Order processing, support automation\n💰 **Financial Services**: Customer onboarding, product info\n\n**Customization untuk setiap industri**:\n• Industry-specific knowledge base\n• Compliance dengan regulasi sektor\n• Integration dengan tools industri\n• Terminology dan workflow sesuai bidang\n\nCeritakan industri Anda, kami berikan solusi yang tepat!';
    }

    return 'Terima kasih atas pertanyaannya! Saya siap membantu Anda dengan informasi lengkap tentang:\n\n• 🤖 Layanan AI Agent (Marketing & Receptionist)\n• 💰 Harga dan paket berlangganan\n• ⏰ Proses development dan timeline\n• 📊 Portfolio dan success stories\n• 📞 Kontak tim Kontenih\n• 🎯 ROI dan business benefits\n• 🛡️ Security dan reliability\n• 🔧 Support dan maintenance\n\nSilakan tanya apa yang ingin Anda ketahui lebih lanjut, atau pilih topik di atas untuk informasi detail! Tim kami juga siap memberikan konsultasi gratis 30 menit untuk bisnis Anda. 😊';
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