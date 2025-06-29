
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail, Instagram, MessageCircle, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    package: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.package) {
      toast({
        title: "Form tidak lengkap",
        description: "Mohon isi semua field yang diperlukan",
        variant: "destructive"
      });
      return;
    }

    const message = `Halo Kontenih! Saya tertarik dengan layanan Anda.

Nama: ${formData.name}
No. HP: ${formData.phone}
Paket: ${formData.package}

Mohon informasi lebih lanjut. Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/62081336135036?text=${encodedMessage}`, '_blank');
    
    toast({
      title: "Pesan terkirim!",
      description: "Anda akan diarahkan ke WhatsApp untuk melanjutkan konsultasi"
    });

    setFormData({ name: '', phone: '', package: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'WhatsApp',
      details: '+62 813-3613-5036',
      action: () => window.open('https://wa.me/62081336135036', '_blank'),
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'hellokontenih@gmail.com',
      action: () => window.open('mailto:hellokontenih@gmail.com', '_blank'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Instagram,
      title: 'Instagram',
      details: '@masterarol_cc',
      action: () => window.open('https://instagram.com/masterarol_cc', '_blank'),
      color: 'from-pink-500 to-purple-600'
    },
    {
      icon: MapPin,
      title: 'Lokasi',
      details: 'Surabaya, Indonesia',
      action: () => {},
      color: 'from-red-500 to-red-600'
    }
  ];

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-gray-50 via-white to-brand-blue-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_70%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.3),transparent_70%)]"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
            <MessageCircle className="w-5 h-5 text-brand-orange-500 mr-2" />
            <span className="text-brand-blue-600 font-semibold">Hubungi Kami</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Hubungi <span className="gradient-text bg-gradient-to-r from-brand-blue-600 to-brand-orange-500 bg-clip-text text-transparent">Kami</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Siap memulai transformasi digital UMKM Anda? Konsultasi gratis sekarang juga!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500">
            <CardHeader className="pb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-brand-blue-500 to-brand-orange-500 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">Form Pemesanan</CardTitle>
                  <CardDescription className="text-gray-600 mt-1">
                    Isi form di bawah ini dan kami akan menghubungi Anda segera
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Nama Lengkap *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Masukkan nama lengkap Anda"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="h-14 rounded-xl border-2 border-gray-200 focus:border-brand-blue-500 transition-all duration-300 text-base"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Nomor WhatsApp *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="h-14 rounded-xl border-2 border-gray-200 focus:border-brand-blue-500 transition-all duration-300 text-base"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="package" className="text-sm font-semibold text-gray-700">Pilih Paket *</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, package: value }))}>
                    <SelectTrigger className="h-14 rounded-xl border-2 border-gray-200 focus:border-brand-blue-500 transition-all duration-300 text-base">
                      <SelectValue placeholder="Pilih paket yang diinginkan" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="basic">Basic - Rp 1.5 Juta/bulan</SelectItem>
                      <SelectItem value="pro">Pro - Rp 2.8 Juta/bulan</SelectItem>
                      <SelectItem value="ultimate">Ultimate - Rp 4.5 Juta/bulan</SelectItem>
                      <SelectItem value="custom">Custom Package</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-brand-orange-500 to-brand-orange-600 hover:from-brand-orange-600 hover:to-brand-orange-700 text-white font-semibold h-14 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Kirim & Konsultasi via WhatsApp
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Informasi Kontak</h3>
              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index} 
                    className="group relative overflow-hidden p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-100"
                    onClick={info.action}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <info.icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 text-lg group-hover:text-gray-700 transition-colors">{info.title}</div>
                        <div className="text-gray-600 group-hover:text-gray-500 transition-colors">{info.details}</div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-2 h-2 bg-brand-blue-500 rounded-full"></div>
                      </div>
                    </div>
                    {/* Hover background */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${info.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick WhatsApp Button */}
            <Card className="relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-8 text-center relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold mb-3">Butuh Konsultasi Cepat?</h4>
                <p className="mb-6 opacity-90 text-lg">
                  Langsung chat via WhatsApp untuk konsultasi gratis!
                </p>
                <Button 
                  className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  onClick={() => window.open('https://wa.me/62081336135036?text=Halo%20Kontenih%2C%20saya%20ingin%20konsultasi%20gratis!', '_blank')}
                >
                  💬 Chat WhatsApp Sekarang
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
