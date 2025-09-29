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
    
    // Greeting and politeness
    if (msg.includes('halo') || msg.includes('hai') || msg.includes('hello') || msg.includes('hi') || msg.includes('selamat')) {
      return 'Halo! Selamat datang di halaman pemesanan AI Agent Kontenih! 😊 Saya di sini untuk membantu Anda memilih AI Agent yang tepat dan memproses pemesanan dengan mudah. Ada yang bisa saya bantu hari ini?';
    }

    if (msg.includes('terima kasih') || msg.includes('thanks') || msg.includes('makasih')) {
      return 'Sama-sama! Saya senang bisa membantu proses pemesanan Anda. Jika ada pertanyaan lain tentang AI Agent atau ingin melanjutkan pemesanan, saya siap membantu! 🙏';
    }
    
    // Agent comparison - expanded keywords
    if (msg.includes('perbedaan') || msg.includes('bedanya') || msg.includes('compare') || msg.includes('perbandingan') || (msg.includes('marketing') && msg.includes('receptionist')) || msg.includes('mana yang cocok') || msg.includes('pilih yang mana')) {
      return '**Perbandingan Marketing Agent vs Receptionist Agent:**\n\n🎯 **Marketing Agent**:\n• Focus: Content & campaign automation\n• Features: Newsletter, social media, video creation\n• Best for: E-commerce, brand, creative agency\n• ROI: 300% increase marketing efficiency\n\n📞 **Receptionist Agent**:\n• Focus: Customer service & communication\n• Features: 24/7 call handling, appointment scheduling\n• Best for: Service business, clinic, consultancy\n• ROI: 60% cost reduction customer service\n\n**Mau saya bantu pilih yang tepat untuk bisnis Anda?** Ceritakan jenis bisnis Anda!';
    }
    
    // Pricing - expanded keywords
    if (msg.includes('harga') || msg.includes('biaya') || msg.includes('price') || msg.includes('tarif') || msg.includes('cost') || msg.includes('murah') || msg.includes('mahal') || msg.includes('budget') || msg.includes('investasi')) {
      return '**Harga AI Agent yang kompetitif:**\n\n💰 **Basic Plan**: Rp 2.5 juta/bulan\n• Perfect untuk startup & small business\n• Core features included\n• Email support\n\n💼 **Professional Plan**: Rp 4.5 juta/bulan\n• Ideal untuk growing business\n• Advanced features + integration\n• Priority support\n\n🏢 **Enterprise Plan**: Rp 7.5 juta/bulan\n• Complete solution untuk large business\n• Full customization + dedicated support\n• SLA guaranteed\n\n🎯 **ROI Guarantee**: 400% return dalam 6 bulan\n💳 **Flexible Payment**: Monthly/quarterly/yearly\n🎁 **Special Offer**: Free setup + 7 hari trial\n\n**Mau konsultasi gratis untuk quote spesifik?**';
    }
    
    // Timeline and process - expanded keywords
    if (msg.includes('lama') || msg.includes('waktu') || msg.includes('proses') || msg.includes('durasi') || msg.includes('berapa lama') || msg.includes('timeline') || msg.includes('schedule') || msg.includes('kapan selesai') || msg.includes('deployment')) {
      return '**Timeline pembuatan AI Agent yang efisien:**\n\n⚡ **Express Track** (1-2 minggu):\n• Basic setup dengan template\n• Standard features\n• Quick deployment\n\n🎯 **Standard Track** (2-3 minggu):\n• Custom development\n• Integration dengan existing tools\n• Comprehensive testing\n\n🏢 **Enterprise Track** (3-4 minggu):\n• Full customization\n• Advanced features\n• Extensive training\n\n**Proses Step-by-Step:**\n1. **Day 1**: Kick-off meeting & requirement\n2. **Week 1**: Development & initial testing\n3. **Week 2**: Integration & advanced features\n4. **Week 3**: Final testing & training\n5. **Week 4**: Go-live & support\n\n📊 **Progress Updates**: Weekly demo sessions\n🚀 **Fast Track Available**: Bisa start dalam 24 jam!';
    }
    
    // Features - expanded keywords
    if (msg.includes('fitur') || msg.includes('feature') || msg.includes('kemampuan') || msg.includes('fungsi') || msg.includes('bisa apa') || msg.includes('teknologi') || msg.includes('canggih')) {
      return '**Fitur Unggulan AI Agent Kontenih:**\n\n🎯 **Marketing Agent Features**:\n✅ Newsletter automation + personalization\n✅ Social media content generation\n✅ Viral video creation & editing\n✅ Competitor analysis real-time\n✅ Campaign optimization AI-powered\n✅ Analytics dashboard comprehensive\n\n📞 **Receptionist Agent Features**:\n✅ 24/7 automatic call handling\n✅ Smart appointment scheduling\n✅ Intelligent call screening & routing\n✅ CRM integration seamless\n✅ Multi-language support\n✅ Voice cloning technology\n\n🔧 **Technical Features**:\n• GPT-4 Turbo powered\n• Response time <2 detik\n• 99.9% uptime guarantee\n• Enterprise security\n• Mobile-first design\n• 50+ integrations available\n\n**Semua features fully customizable untuk brand Anda!**';
    }
    
    // Trial and demo - expanded keywords
    if (msg.includes('trial') || msg.includes('coba') || msg.includes('demo') || msg.includes('test') || msg.includes('gratis') || msg.includes('free') || msg.includes('preview') || msg.includes('sample') || msg.includes('lihat dulu')) {
      return '**Ya! Kami sangat confident dengan kualitas AI Agent kami:**\n\n🎯 **Free Demo Session** (30 menit):\n• Live demonstration AI Agent\n• Interactive Q&A dengan specialist\n• Customization consultation\n• Business case analysis\n\n⏱️ **Free Trial** (7 hari full access):\n• Complete features testing\n• Real business scenario\n• Performance analytics\n• Unlimited support during trial\n\n💡 **Proof of Concept**:\n• Mini implementation untuk testing\n• Custom use case demo\n• Integration testing\n• ROI projection report\n\n✅ **No Risk Guarantee**:\n• Cancel anytime during trial\n• 30-day money-back guarantee\n• No setup fees for trial\n\n📅 **Book Demo Now**: Available today!\n🚀 **Trial Setup**: Ready dalam 24 jam after agreement\n\n**Mau saya schedule demo session untuk Anda?**';
    }
    
    // Marketing Agent specific - expanded keywords
    if (msg.includes('marketing') || msg.includes('content') || msg.includes('social media') || msg.includes('newsletter') || msg.includes('video') || msg.includes('promosi') || msg.includes('iklan')) {
      return '**Marketing Agent - Complete Marketing Automation Solution:**\n\n🎯 **Perfect untuk bisnis yang ingin:**\n• Scale marketing efforts tanpa menambah tim\n• Automate content creation & distribution\n• Increase engagement & conversion rate\n• Optimize marketing ROI\n\n✨ **Key Benefits**:\n📈 Average 300% increase marketing efficiency\n💰 ROI 400%+ dalam 6 bulan\n⏰ Save 25+ jam/minggu untuk marketing team\n📊 Data-driven marketing decisions\n\n🎯 **Industries yang cocok**:\n• E-commerce & retail\n• SaaS & tech companies\n• Creative agencies\n• Fashion & lifestyle brands\n• Education & training\n\n**Success Stories**:\n• Fashion brand: 500K followers dalam 3 bulan\n• E-commerce: 250% increase newsletter conversion\n• Agency: 300% faster content production\n\n**Tertarik dengan Marketing Agent? Mau saya bantu isi form pemesanan atau schedule konsultasi dulu?**';
    }
    
    // Receptionist Agent specific - expanded keywords
    if (msg.includes('receptionist') || msg.includes('telepon') || msg.includes('call') || msg.includes('customer service') || msg.includes('pelayanan') || msg.includes('appointment') || msg.includes('jadwal') || msg.includes('penjawab')) {
      return '**Receptionist Agent - 24/7 Customer Service Revolution:**\n\n🎯 **Perfect untuk bisnis dengan:**\n• High volume incoming calls\n• Need 24/7 customer availability\n• Appointment-based services\n• Customer support requirements\n\n📞 **Impact Guarantee**:\n⚡ 90% call handling efficiency\n💰 60% reduction customer service costs\n📈 40% improvement customer satisfaction\n⏰ 24/7 availability tanpa break\n\n🏆 **Industries yang ideal**:\n• Healthcare (klinik, rumah sakit)\n• Professional services (law, consulting)\n• Real estate agencies\n• Beauty & wellness centers\n• Service companies\n• Educational institutions\n\n**Success Stories**:\n• Klinik kesehatan: 90% call efficiency, patient satisfaction up 40%\n• Real estate: 200% increase qualified leads\n• Service company: 60% cost reduction customer support\n\n**Voice Cloning Technology**: AI bisa menggunakan suara brand ambassador Anda!\n\n**Ready untuk transform customer service Anda? Mau konsultasi gratis atau langsung pesan?**';
    }
    
    // Contact and support - expanded keywords
    if (msg.includes('kontak') || msg.includes('hubungi') || msg.includes('contact') || msg.includes('help') || msg.includes('bantuan') || msg.includes('support') || msg.includes('tim') || msg.includes('team')) {
      return '**Tim Kontenih siap membantu Anda 24/7:**\n\n📧 **Email**: hellokontenih@gmail.com\n📱 **WhatsApp**: Klik button WA di website\n💬 **Live Chat**: Available di website real-time\n📞 **Phone Support**: Available for premium consultation\n\n⚡ **Response Time Guarantee**:\n• WhatsApp: <30 menit (24/7)\n• Email: <2 jam (working hours)\n• Live Chat: Real-time response\n• Emergency support: <1 jam\n\n🎯 **Free Services**:\n• 30 menit consultation dengan AI specialist\n• Business requirement analysis\n• Custom quote preparation\n• Technical feasibility assessment\n\n📅 **Available Hours**:\n• Consultation: Senin-Jumat 9AM-6PM WIB\n• Support: 24/7 untuk existing clients\n• Emergency: Always available\n\n**Preferred contact method untuk pemesanan atau konsultasi?**';
    }

    // Order process and next steps
    if (msg.includes('order') || msg.includes('pesan') || msg.includes('beli') || msg.includes('mulai') || msg.includes('start') || msg.includes('lanjut') || msg.includes('next step') || msg.includes('selanjutnya')) {
      return '**Proses Pemesanan Super Mudah:**\n\n1️⃣ **Pilih AI Agent Type**:\n• Marketing Agent untuk content automation\n• Receptionist Agent untuk customer service\n\n2️⃣ **Konsultasi Gratis** (30 menit):\n• Business requirement analysis\n• Feature customization discussion\n• Timeline & pricing confirmation\n\n3️⃣ **Proposal & Agreement**:\n• Detailed project scope\n• Fixed price quotation\n• Flexible payment terms\n\n4️⃣ **Development & Testing**:\n• Weekly progress updates\n• Beta testing dengan tim Anda\n• Training & onboarding\n\n5️⃣ **Go Live & Support**:\n• Smooth deployment\n• 24/7 ongoing support\n• Performance monitoring\n\n🚀 **Ready to Start?**\n• Form pemesanan di halaman ini\n• Konsultasi gratis via WhatsApp\n• Schedule demo session\n\n**Mana yang mau Anda pilih untuk mulai?**';
    }

    // Benefits and ROI
    if (msg.includes('manfaat') || msg.includes('benefit') || msg.includes('untung') || msg.includes('keuntungan') || msg.includes('roi') || msg.includes('hasil') || msg.includes('impact')) {
      return '**Manfaat & ROI yang Terbukti:**\n\n💰 **Financial Impact**:\n• ROI rata-rata: 400% dalam 6 bulan\n• Cost reduction: 40-60% operational costs\n• Revenue increase: 200-300% dari automation\n• Payback period: 3-4 bulan\n\n⚡ **Operational Benefits**:\n• Time saved: 20-30 jam/minggu per team\n• Accuracy: 99.7% task completion rate\n• Availability: 24/7 tanpa break atau libur\n• Scalability: Handle 1000+ tasks/day\n\n📈 **Business Growth**:\n• Customer satisfaction: +40% average\n• Response time: 95% faster\n• Lead conversion: +200% improvement\n• Employee productivity: +300%\n\n🎯 **Competitive Advantages**:\n• First-mover advantage dengan AI technology\n• Future-proof business operations\n• Enhanced customer experience\n• Data-driven decision making\n\n**Real Client Results**: E-commerce client achieved 250% sales increase within 4 months using Marketing Agent!\n\n**Siap untuk transform bisnis Anda?**';
    }

    return '**Terima kasih atas pertanyaannya!** Saya siap membantu Anda dengan:\n\n🤖 **Pemilihan AI Agent** (Marketing vs Receptionist)\n💰 **Informasi harga** dan paket berlangganan\n⏰ **Timeline development** dan proses pemesanan\n🎯 **Features** dan customization options\n📊 **ROI calculation** dan business benefits\n🎁 **Free trial** dan demo session\n📞 **Konsultasi gratis** dengan AI specialist\n\n**Quick Actions:**\n• Konsultasi gratis 30 menit → Book sekarang\n• Demo live AI Agent → Schedule today\n• Quote spesifik bisnis Anda → WhatsApp tim\n• Mulai pemesanan → Isi form di halaman ini\n\n**Mana yang ingin Anda lakukan sekarang?** Tim kami siap membantu dalam 30 menit! 😊';
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