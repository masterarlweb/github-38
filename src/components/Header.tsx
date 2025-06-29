
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: 'Beranda', href: '#home' },
    { name: 'Tentang', href: '#about' },
    { name: 'Layanan', href: '#services' },
    { name: 'Harga', href: '#pricing' },
    { name: 'Galeri', href: '#gallery' },
    { name: 'Kontak', href: '#contact' }
  ];

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold gradient-text">Kontenih</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-brand-blue-600 transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              className="bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-medium px-6"
              onClick={() => window.open('https://wa.me/6281234567890?text=Halo%20Kontenih%2C%20saya%20ingin%20konsultasi%20tentang%20layanan%20sosial%20media%20marketing', '_blank')}
            >
              Konsultasi Sekarang
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-lg">
            <nav className="flex flex-col space-y-4 p-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-brand-blue-600 transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button 
                className="bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-medium mt-4"
                onClick={() => {
                  window.open('https://wa.me/6281234567890?text=Halo%20Kontenih%2C%20saya%20ingin%20konsultasi%20tentang%20layanan%20sosial%20media%20marketing', '_blank');
                  setIsMenuOpen(false);
                }}
              >
                Konsultasi Sekarang
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
