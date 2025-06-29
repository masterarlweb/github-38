
import { Instagram, Video, Camera, Palette } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Services = () => {
  const services = [
    {
      icon: Instagram,
      title: 'Manajemen Sosial Media',
      subtitle: 'Instagram & TikTok',
      description: 'Pengelolaan akun media sosial secara profesional dengan strategi posting yang konsisten dan engaging.',
      features: [
        'Content Planning & Scheduling',
        'Community Management', 
        'Hashtag Strategy',
        'Analytics & Reporting'
      ],
      color: 'from-brand-blue-500 to-brand-blue-600'
    },
    {
      icon: Palette,
      title: 'Desain Feed & Story',
      subtitle: 'Visual Branding',
      description: 'Desain visual yang menarik dan konsisten untuk membangun brand identity yang kuat di media sosial.',
      features: [
        'Feed Template Design',
        'Instagram Story Templates',
        'Highlight Covers',
        'Brand Guidelines'
      ],
      color: 'from-brand-orange-500 to-brand-orange-600'
    },
    {
      icon: Video,
      title: 'Video Promosi & Foto Produk',
      subtitle: 'Content Creation',
      description: 'Produksi konten visual berkualitas tinggi untuk meningkatkan daya tarik dan konversi penjualan.',
      features: [
        'Product Photography',
        'Video Promosi',
        'Reels & TikTok Content',
        'Stop Motion Animation'
      ],
      color: 'from-brand-blue-500 to-brand-orange-500'
    },
    {
      icon: Camera,
      title: 'Branding Visual UMKM',
      subtitle: 'Complete Package',
      description: 'Paket lengkap branding visual untuk UMKM yang ingin tampil profesional dan memorable.',
      features: [
        'Logo Design',
        'Brand Identity',
        'Marketing Materials',
        'Social Media Kit'
      ],
      color: 'from-brand-orange-500 to-brand-blue-500'
    }
  ];

  return (
    <section id="services" className="section-padding gradient-bg">
      <div className="container-custom">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Layanan <span className="gradient-text">Kami</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Solusi lengkap untuk transformasi digital UMKM Indonesia dengan layanan profesional yang terpercaya
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm"
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">{service.title}</CardTitle>
                <CardDescription className="text-brand-orange-500 font-medium">{service.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-brand-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
