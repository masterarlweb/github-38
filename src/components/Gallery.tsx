
import { Card, CardContent } from '@/components/ui/card';

const Gallery = () => {
  const portfolioItems = [
    {
      title: 'Warung Nasi Ibu Sari',
      category: 'Food & Beverage',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      description: 'Branding komprehensif untuk warung tradisional'
    },
    {
      title: 'Toko Baju Cantik',
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      description: 'Manajemen Instagram dengan 500% growth'
    },
    {
      title: 'Kedai Kopi Lokal',
      category: 'F&B',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop',
      description: 'Video content yang viral di TikTok'
    },
    {
      title: 'Skincare Alami',
      category: 'Beauty',
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop',
      description: 'Product photography & social media kit'
    },
    {
      title: 'Cake & Bakery',
      category: 'F&B',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
      description: 'Instagram feed yang engaging'
    },
    {
      title: 'Aksesoris Handmade',
      category: 'Craft',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
      description: 'Branding visual untuk produk handmade'
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
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
