
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Video, Instagram } from 'lucide-react';

const Gallery = () => {
  const graphicDesignPortfolio = [
    // Placeholder items - user will add real content
    {
      title: 'Coming Soon',
      category: 'Logo Design',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
      description: 'Portfolio graphic design akan segera ditambahkan'
    }
  ];

  const contentCreationPortfolio = [
    // Placeholder items - user will add real content
    {
      title: 'Coming Soon',
      category: 'Video Content',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop',
      description: 'Portfolio content creation akan segera ditambahkan'
    }
  ];

  const endorsementPortfolio = [
    {
      title: 'Endorsement Rate Card',
      category: 'Rate Card Professional',
      image: '/lovable-uploads/7363e89c-9acb-4aa0-a03e-599d2fbd5a5d.png',
      description: 'Rate card professional untuk layanan endorsement dengan talent berpengalaman Gabrielle Rora'
    },
    {
      title: 'Instagram Insights & Analytics',
      category: 'Social Media Performance',
      image: '/lovable-uploads/383a3c2f-7973-4169-9848-5227567fd945.png',
      description: 'Performa Instagram dengan 64.8K account reached, 459 account engaged, dan 3.3K total followers'
    },
    {
      title: 'Food Review & Endorsement Portfolio',
      category: 'Kuliner Content',
      image: '/lovable-uploads/e67cb47d-660e-44fa-a92a-b1f6a99ba625.png',
      description: 'Portfolio review kuliner dan endorsement sebagai talent KulinerGresik dengan berbagai konten makanan dan review tempat makan'
    }
  ];

  const testimonials = [
    {
      name: 'Ibu Sari',
      business: 'Warung Nasi Ibu Sari',
      content: 'Sejak menggunakan jasa Kontenih, penjualan warung saya naik 3x lipat! Tim mereka sangat profesional dan memahami kebutuhan UMKM.',
      rating: 5
    },
    {
      name: 'Andi Pratama',
      business: 'Kedai Kopi Lokal',
      content: 'Video TikTok yang dibuat Kontenih viral dan membuat kedai kopi saya jadi ramai pengunjung. Highly recommended!',
      rating: 5
    },
    {
      name: 'Maya Sinta',
      business: 'Skincare Alami',
      content: 'Feed Instagram saya sekarang terlihat sangat profesional. Banyak customer yang bilang tertarik karena visualnya menarik.',
      rating: 5
    }
  ];

  return (
    <section id="gallery" className="section-padding gradient-bg">
      <div className="container-custom">
        {/* Portfolio Section */}
        <div className="mb-20">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Portfolio <span className="gradient-text">Kami</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Lihat berbagai project yang telah kami kerjakan untuk UMKM Indonesia
            </p>
          </div>

          <Tabs defaultValue="graphic-design" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-white/80 backdrop-blur-sm p-1 rounded-2xl shadow-lg">
              <TabsTrigger 
                value="graphic-design" 
                className="flex items-center gap-2 rounded-xl py-3 px-6 text-sm font-medium transition-all data-[state=active]:bg-brand-blue-500 data-[state=active]:text-white"
              >
                <Palette className="w-4 h-4" />
                Graphic Design
              </TabsTrigger>
              <TabsTrigger 
                value="content-creation"
                className="flex items-center gap-2 rounded-xl py-3 px-6 text-sm font-medium transition-all data-[state=active]:bg-brand-orange-500 data-[state=active]:text-white"
              >
                <Video className="w-4 h-4" />
                Content Creation
              </TabsTrigger>
              <TabsTrigger 
                value="endorsement"
                className="flex items-center gap-2 rounded-xl py-3 px-6 text-sm font-medium transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-blue-500 data-[state=active]:to-brand-orange-500 data-[state=active]:text-white"
              >
                <Instagram className="w-4 h-4" />
                Endorsement
              </TabsTrigger>
            </TabsList>

            <TabsContent value="graphic-design" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {graphicDesignPortfolio.map((item, index) => (
                  <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <span className="text-xs font-medium text-brand-blue-500 uppercase tracking-wide">
                          {item.category}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="content-creation" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {contentCreationPortfolio.map((item, index) => (
                  <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <span className="text-xs font-medium text-brand-orange-500 uppercase tracking-wide">
                          {item.category}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="endorsement" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {endorsementPortfolio.map((item, index) => (
                  <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <span className="text-xs font-medium text-purple-500 uppercase tracking-wide">
                          {item.category}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Testimonials Section */}
        <div>
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Testimoni <span className="gradient-text">Klien</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Apa kata klien UMKM yang telah merasakan dampak positif layanan kami
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">⭐</span>
                    ))}
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">"{testimonial.content}"</p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-brand-blue-600">{testimonial.business}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
