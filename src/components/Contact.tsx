
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';
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
    window.open(`https://wa.me/6281234567890?text=${encodedMessage}`, '_blank');
    
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
      details: '+62 812-3456-7890',
      action: () => window.open('https://wa.me/6281234567890', '_blank')
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'hello@kontenih.com',
      action: () => window.open('mailto:hello@kontenih.com', '_blank')
    },
    {
      icon: Instagram,
      title: 'Instagram',
      details: '@kontenih',
      action: () => window.open('https://instagram.com/kontenih', '_blank')
    },
    {
      icon: MapPin,
      title: 'Lokasi',
      details: 'Jakarta, Indonesia',
      action: () => {}
    }
  ];

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Hubungi <span className="gradient-text">Kami</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Siap memulai transformasi digital UMKM Anda? Konsultasi gratis sekarang juga!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Form Pemesanan</CardTitle>
              <CardDescription>
                Isi form di bawah ini dan kami akan menghubungi Anda segera
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Masukkan nama lengkap Anda"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor WhatsApp *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="package">Pilih Paket *</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, package: value }))}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Pilih paket yang diinginkan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic - Rp 1.5 Juta/bulan</SelectItem>
                      <SelectItem value="pro">Pro - Rp 2.8 Juta/bulan</SelectItem>
                      <SelectItem value="ultimate">Ultimate - Rp 4.5 Juta/bulan</SelectItem>
                      <SelectItem value="custom">Custom Package</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-medium h-12 text-lg hover-scale"
                >
                  Kirim & Konsultasi via WhatsApp
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Informasi Kontak</h3>
              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={info.action}
                  >
                    <div className="w-12 h-12 bg-brand-blue-100 rounded-xl flex items-center justify-center">
                      <info.icon className="h-6 w-6 text-brand-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{info.title}</div>
                      <div className="text-gray-600">{info.details}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick WhatsApp Button */}
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6 text-center">
                <h4 className="text-xl font-bold mb-2">Butuh Konsultasi Cepat?</h4>
                <p className="mb-4 opacity-90">
                  Langsung chat via WhatsApp untuk konsultasi gratis!
                </p>
                <Button 
                  className="bg-white text-green-600 hover:bg-gray-100 font-medium px-8 hover-scale"
                  onClick={() => window.open('https://wa.me/6281234567890?text=Halo%20Kontenih%2C%20saya%20ingin%20konsultasi%20gratis!', '_blank')}
                >
                  💬 Chat WhatsApp
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
