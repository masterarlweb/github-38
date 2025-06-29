
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Pricing = () => {
  const packages = [
    {
      name: 'Basic',
      price: '1.5 Juta',
      period: '/bulan',
      description: 'Cocok untuk UMKM yang baru memulai',
      features: [
        '12 Post Feed Instagram',
        '8 Instagram Story',
        'Caption & Hashtag',
        'Basic Analytics Report',
        'Community Management',
        'Konsultasi WhatsApp'
      ],
      popular: false,
      color: 'border-gray-200',
      buttonColor: 'bg-brand-blue-600 hover:bg-brand-blue-700'
    },
    {
      name: 'Pro',
      price: '2.8 Juta',
      period: '/bulan',
      description: 'Terpopuler untuk UMKM yang berkembang',
      features: [
        '20 Post Feed Instagram',
        '15 Instagram Story',
        '8 Reels/TikTok Video',
        'Advanced Analytics',
        'Community Management',
        'Foto Produk (5 items)',
        'Brand Template Design',
        'Priority Support'
      ],
      popular: true,
      color: 'border-brand-orange-500',
      buttonColor: 'bg-brand-orange-500 hover:bg-brand-orange-600'
    },
    {
      name: 'Ultimate',
      price: '4.5 Juta',
      period: '/bulan',
      description: 'Solusi lengkap untuk UMKM yang serius',
      features: [
        '30 Post Feed Instagram',
        '25 Instagram Story',
        '15 Reels/TikTok Video',
        'Complete Analytics Dashboard',
        'Community Management',
        'Foto Produk (10 items)',
        'Video Promosi (2 video)',
        'Brand Identity Package',
        'Ads Management',
        'Dedicated Account Manager'
      ],
      popular: false,
      color: 'border-brand-blue-500',
      buttonColor: 'bg-brand-blue-600 hover:bg-brand-blue-700'
    }
  ];

  return (
    <section id="pricing" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Paket <span className="gradient-text">Harga</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan dan budget UMKM Anda. Semua paket sudah termasuk konsultasi gratis!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <Card 
              key={index} 
              className={`relative ${pkg.color} ${pkg.popular ? 'ring-2 ring-brand-orange-500 shadow-xl scale-105' : 'shadow-lg'} hover:shadow-xl transition-all duration-300`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-brand-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Terpopuler
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900">{pkg.name}</CardTitle>
                <CardDescription className="text-gray-600 mb-4">{pkg.description}</CardDescription>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl font-bold text-gray-900">Rp {pkg.price}</span>
                  <span className="text-gray-600 ml-1">{pkg.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${pkg.buttonColor} text-white font-medium py-3 hover-scale`}
                  onClick={() => window.open(`https://wa.me/6281234567890?text=Halo%20Kontenih%2C%20saya%20tertarik%20dengan%20paket%20${pkg.name}%20dan%20ingin%20konsultasi%20lebih%20lanjut`, '_blank')}
                >
                  Pilih Paket {pkg.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Butuh paket custom? Kami siap membantu!</p>
          <Button 
            variant="outline" 
            className="border-brand-blue-500 text-brand-blue-500 hover:bg-brand-blue-50"
            onClick={() => window.open('https://wa.me/6281234567890?text=Halo%20Kontenih%2C%20saya%20ingin%20diskusi%20tentang%20paket%20custom', '_blank')}
          >
            Konsultasi Custom Package
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
