
import { Instagram, Video, Camera, Palette, Bot, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Bot,
      title: 'AI System Creation',
      subtitle: 'AI Marketing Agent Team',
      description: 'Complete AI marketing agent workflow that effectively replaces a full content team at a fraction of the cost through intelligent automation.',
      features: [
        'Penulisan Newsletter Harian Industri AI',
        'Pembuatan Gambar Custom Sesuai Brand',
        'Repurpose Konten ke Twitter Thread',
        'Script Video Viral untuk TikTok & Reels',
        'Video Avatar-Style untuk Promosi',
        'Riset Konten Mendalam + Laporan Email'
      ],
      color: 'from-purple-500 via-purple-600 to-indigo-600',
      bgColor: 'from-purple-50 to-indigo-100',
      glowColor: 'shadow-purple-500/20',
      hasButton: true,
      buttonText: 'Order Sekarang',
      route: '/order-agent'
    },
    {
      icon: Palette,
      title: 'Graphic Design',
      subtitle: 'Visual Identity',
      description: 'Logo, feed templates, packaging, dan identitas visual untuk produk/layanan guna membangun brand yang kuat dan berkesan.',
      features: [
        'Desain Logo Profesional',
        'Template Feed Media Sosial',
        'Desain Kemasan Produk',
        'Identitas Visual Produk/Layanan'
      ],
      color: 'from-blue-500 via-blue-600 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-100',
      glowColor: 'shadow-blue-500/20',
      hasButton: true,
      buttonText: 'Lihat Paket',
      route: '#pricing'
    },
    {
      icon: Video,
      title: 'Content Creation',
      subtitle: 'Visual Storytelling',
      description: 'Video reels, sinematografi produk, fotografi katalog, behind-the-scenes, dan storytelling visual berkualitas tinggi.',
      features: [
        'Video Reels Profesional',
        'Sinematografi Produk',
        'Fotografi Katalog',
        'Behind-the-scenes & Storytelling'
      ],
      color: 'from-orange-500 via-red-500 to-pink-600',
      bgColor: 'from-orange-50 to-pink-100',
      glowColor: 'shadow-orange-500/20',
      hasButton: true,
      buttonText: 'Lihat Paket',
      route: '#pricing'
    },
    {
      icon: Instagram,
      title: 'Endorsement Marketing',
      subtitle: 'Strategic Partnership',
      description: 'Strategi kemitraan dengan micro dan nano influencer untuk promosi UMKM yang natural dan efektif.',
      features: [
        'Kemitraan Micro Influencer',
        'Strategi Nano Influencer',
        'Kampanye Promosi Natural',
        'Marketing Fokus UMKM'
      ],
      color: 'from-pink-500 via-rose-500 to-red-600',
      bgColor: 'from-pink-50 to-rose-100',
      glowColor: 'shadow-pink-500/20',
      hasButton: true,
      buttonText: 'Lihat Paket',
      route: '#pricing'
    },
    {
      icon: Target,
      title: 'Lead Generator',
      subtitle: 'Lead Magnet Tool',
      description: 'Powerful lead magnet untuk menarik calon customer berkualitas tinggi. Tool AI ini membantu bisnis menemukan prospek tepat sasaran dengan data akurat.',
      features: [
        'AI-Powered Lead Discovery',
        'Riset Audience Tertarget',
        'Data Prospek Berkualitas',
        'Export Siap Pakai'
      ],
      color: 'from-emerald-500 via-green-500 to-teal-600',
      bgColor: 'from-emerald-50 to-teal-100',
      glowColor: 'shadow-emerald-500/20',
      hasButton: true,
      buttonText: 'Generate Leads',
      route: '/lead-generator'
    }
  ];

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-brand-blue-50/30"></div>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-brand-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-orange-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
            <span className="text-brand-blue-600 font-semibold">🎯 Professional Services</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Our <span className="gradient-text bg-gradient-to-r from-brand-blue-600 to-brand-orange-500 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Complete solutions for digital business transformation with trusted professional services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`group relative overflow-hidden hover:shadow-2xl ${service.glowColor} transition-all duration-500 hover:-translate-y-2 border-0 bg-white/95 backdrop-blur-sm hover:bg-white cursor-pointer`}
              style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => {
                  if (service.route.startsWith('#')) {
                    const element = document.querySelector(service.route);
                    element?.scrollIntoView({ behavior: 'smooth' });
                  } else if (service.route !== '#') {
                    navigate(service.route);
                  }
                }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Floating Icon Background */}
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <CardHeader className="text-center pb-4">
                  <div className="relative mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-2xl`}>
                      <service.icon className="h-8 w-8 text-white drop-shadow-lg" />
                    </div>
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 w-16 h-16 mx-auto rounded-xl bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`}></div>
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-gray-800 transition-colors leading-tight">
                    {service.title}
                  </CardTitle>
                  <CardDescription className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent font-semibold text-sm`}>
                    {service.subtitle}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4 px-4 pb-6">
                  <p className="text-gray-600 text-xs leading-relaxed group-hover:text-gray-700 transition-colors line-clamp-3">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center text-xs text-gray-700 group-hover:text-gray-800 transition-colors">
                        <div className={`w-1.5 h-1.5 bg-gradient-to-r ${service.color} rounded-full mr-2 flex-shrink-0 group-hover:scale-125 transition-transform`}></div>
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                    {service.features.length > 3 && (
                      <li className="text-xs text-gray-500 italic">+{service.features.length - 3} fitur lainnya</li>
                    )}
                  </ul>
                  
                  {/* Modern Navigation Button */}
                  <div className="pt-3">
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (service.route.startsWith('#')) {
                          const element = document.querySelector(service.route);
                          element?.scrollIntoView({ behavior: 'smooth' });
                        } else if (service.route !== '#') {
                          navigate(service.route);
                        }
                      }}
                      className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 text-white font-semibold text-sm py-2.5 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-0 relative overflow-hidden group/btn`}
                      disabled={service.route === '#'}
                    >
                      {/* Button Glow Effect */}
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {service.buttonText}
                        <service.icon className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
