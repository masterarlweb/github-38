import { useState } from 'react';
import { ArrowLeft, Bot, Send, CheckCircle, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import OrderChatbot from '@/components/OrderChatbot';

const OrderAgent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [agentType, setAgentType] = useState<'marketing' | 'receptionist' | 'chatbot'>('marketing');
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: '',
    package: '',
    currentChallenges: '',
    desiredFeatures: '',
    timeline: '',
    budget: '',
    additionalNotes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Format message for WhatsApp
      const agentTypeName = agentType === 'marketing' ? 'Marketing Agent' : agentType === 'receptionist' ? 'Voice Receptionist' : 'AI Chatbot';
      
      const message = `*PESANAN AI AGENT BARU*\n\n` +
        `*Jenis Agent:* ${agentTypeName}\n\n` +
        `*INFORMASI PERUSAHAAN*\n` +
        `Nama Perusahaan: ${formData.companyName}\n` +
        `Nama Kontak: ${formData.contactName}\n` +
        `Email: ${formData.email}\n` +
        `Telepon: ${formData.phone}\n` +
        `Jenis Bisnis: ${formData.businessType}\n\n` +
        `*DETAIL PESANAN*\n` +
        `Timeline: ${formData.timeline || '-'}\n` +
        `Budget: ${formData.budget || '-'}\n\n` +
        `*TANTANGAN SAAT INI*\n${formData.currentChallenges || '-'}\n\n` +
        `*FITUR YANG DIINGINKAN*\n${formData.desiredFeatures || '-'}\n\n` +
        `*CATATAN TAMBAHAN*\n${formData.additionalNotes || '-'}`;

      // Send to WhatsApp
      const whatsappNumber = '62895329475989';
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Membuka WhatsApp...",
        description: "Silakan kirim pesan yang sudah disiapkan untuk menyelesaikan pesanan Anda.",
      });

      // Reset form after opening WhatsApp
      setTimeout(() => {
        setFormData({
          companyName: '',
          contactName: '',
          email: '',
          phone: '',
          businessType: '',
          package: '',
          currentChallenges: '',
          desiredFeatures: '',
          timeline: '',
          budget: '',
          additionalNotes: ''
        });
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const agentFeatures = {
    marketing: [
      'Penulisan newsletter harian industri AI',
      'Pembuatan gambar custom sesuai brand',
      'Repurpose konten ke Twitter thread',
      'Script video viral untuk TikTok & Reels',
      'Video avatar-style untuk promosi',
      'Riset konten mendalam + laporan email'
    ],
    receptionist: [
      'Penjawaban telepon otomatis 24/7 dan penjadwalan Booking dll',
      'Penjadwalan appointment dan meeting',
      'Screening panggilan dan routing calls',
      'Informasi produk dan layanan perusahaan',
      'Follow-up leads dan customer service',
      'Integrasi dengan CRM dan calendar'
    ],
    chatbot: [
      'Chatbot customer service 24/7 di website',
      'Menjawab pertanyaan pelanggan secara otomatis',
      'Integrasi dengan WhatsApp dan media sosial',
      'Lead generation dan data collection',
      'Dukungan multibahasa untuk pelanggan global',
      'Analytics dan laporan interaksi pelanggan'
    ]
  };

  return (
    <div className="min-h-screen relative z-10 bg-transparent">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center gap-2 hover:bg-purple-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Order AI Agent</h1>
                <p className="text-sm text-gray-600">Transformasi Digital dengan AI</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Detail Pemesanan
              </CardTitle>
              <CardDescription>
                Lengkapi form berikut untuk memulai pembuatan AI Marketing Agent khusus untuk bisnis Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Agent Type Selection */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Pilih Jenis AI Agent *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setAgentType('marketing')}
                      className={`p-4 border-2 rounded-xl text-left transition-all ${
                        agentType === 'marketing'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <MessageSquare className="h-5 w-5 text-purple-600" />
                        <span className="font-semibold">Marketing Agent</span>
                      </div>
                      <p className="text-sm text-gray-600">Otomatisasi konten dan kampanye marketing</p>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setAgentType('receptionist')}
                      className={`p-4 border-2 rounded-xl text-left transition-all ${
                        agentType === 'receptionist'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Phone className="h-5 w-5 text-purple-600" />
                        <span className="font-semibold">Voice Receptionist</span>
                      </div>
                      <p className="text-sm text-gray-600">Penjawab telepon otomatis 24/7</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAgentType('chatbot')}
                      className={`p-4 border-2 rounded-xl text-left transition-all ${
                        agentType === 'chatbot'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Bot className="h-5 w-5 text-purple-600" />
                        <span className="font-semibold">AI Chatbot</span>
                      </div>
                      <p className="text-sm text-gray-600">Chatbot cerdas untuk website dan sosial media</p>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nama Perusahaan *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      placeholder="PT. Nama Perusahaan"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Nama Kontak *</Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">No. Telepon *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+62 812-3456-7890"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType">Jenis Bisnis *</Label>
                  <Input
                    id="businessType"
                    value={formData.businessType}
                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                    placeholder="E-commerce, SaaS, Konsultan, dll."
                    required
                  />
                </div>


                <div className="space-y-2">
                  <Label htmlFor="currentChallenges">
                    {agentType === 'marketing' 
                      ? 'Tantangan Marketing Saat Ini' 
                      : agentType === 'receptionist' 
                      ? 'Tantangan Customer Service Saat Ini'
                      : 'Tantangan Komunikasi Pelanggan Saat Ini'
                    }
                  </Label>
                  <Textarea
                    id="currentChallenges"
                    value={formData.currentChallenges}
                    onChange={(e) => handleInputChange('currentChallenges', e.target.value)}
                    placeholder={agentType === 'marketing' 
                      ? "Ceritakan tantangan marketing yang sedang Anda hadapi..." 
                      : agentType === 'receptionist'
                      ? "Ceritakan tantangan dalam menangani panggilan telepon dan customer service..."
                      : "Ceritakan tantangan dalam melayani pertanyaan pelanggan di website atau media sosial..."
                    }
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="desiredFeatures">
                    {agentType === 'marketing' 
                      ? 'Fitur yang Diinginkan' 
                      : agentType === 'receptionist'
                      ? 'Kebutuhan Receptionist AI'
                      : 'Kebutuhan AI Chatbot'
                    }
                  </Label>
                  <Textarea
                    id="desiredFeatures"
                    value={formData.desiredFeatures}
                    onChange={(e) => handleInputChange('desiredFeatures', e.target.value)}
                    placeholder={agentType === 'marketing'
                      ? "Fitur AI agent mana yang paling Anda butuhkan?"
                      : agentType === 'receptionist'
                      ? "Fitur receptionist AI apa yang paling Anda butuhkan? (penjadwalan, screening calls, dll.)"
                      : "Fitur chatbot apa yang paling Anda butuhkan? (integrasi WhatsApp, multibahasa, dll.)"
                    }
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Timeline Implementasi</Label>
                    <Input
                      id="timeline"
                      value={formData.timeline}
                      onChange={(e) => handleInputChange('timeline', e.target.value)}
                      placeholder="1-2 minggu, 1 bulan, dll."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range</Label>
                    <Input
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      placeholder="Budget yang dialokasikan"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Catatan Tambahan</Label>
                  <Textarea
                    id="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    placeholder="Informasi tambahan yang perlu kami ketahui..."
                    rows={3}
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      Mengirim Pesanan...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      Kirim Pesanan Sekarang
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Right Column - Features */}
          <div className="space-y-6">
            <Card className="shadow-xl bg-gradient-to-br from-purple-50 to-indigo-100 border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-purple-900">
                  {agentType === 'marketing' ? <MessageSquare className="h-8 w-8" /> : agentType === 'receptionist' ? <Phone className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
                  {agentType === 'marketing' ? 'AI Marketing Agent' : agentType === 'receptionist' ? 'AI Voice Receptionist' : 'AI Chatbot'} Features
                </CardTitle>
                <CardDescription className="text-purple-700">
                  {agentType === 'marketing' 
                    ? 'Workflow lengkap yang menggantikan tim konten dengan otomatisasi cerdas'
                    : agentType === 'receptionist'
                    ? 'Sistem penjawab telepon cerdas yang melayani pelanggan 24/7'
                    : 'Chatbot cerdas yang merespons pelanggan secara real-time di berbagai platform'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {(agentFeatures[agentType] || []).map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-purple-800 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-900">Proses Selanjutnya</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Konsultasi Gratis</h4>
                    <p className="text-sm text-gray-600">Tim kami akan menghubungi dalam 24 jam untuk memahami kebutuhan spesifik Anda</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Custom Development</h4>
                    <p className="text-sm text-gray-600">Pengembangan AI agent sesuai dengan brand dan kebutuhan bisnis Anda</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Training & Launch</h4>
                    <p className="text-sm text-gray-600">Pelatihan penggunaan dan peluncuran sistem dengan dukungan penuh</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* AI Chatbot */}
      <OrderChatbot onAgentTypeSelect={setAgentType} />
    </div>
  );
};

export default OrderAgent;