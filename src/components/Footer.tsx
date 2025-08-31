
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Logo size="md" showTagline={true} />
            <p className="text-gray-400 leading-relaxed">
              Creative agency that helps businesses build engaging and professional digital presence.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/masterarol_cc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-brand-blue-600 rounded-full flex items-center justify-center hover:bg-brand-blue-700 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="mailto:hellokontenih@gmail.com"
                className="w-10 h-10 bg-brand-orange-500 rounded-full flex items-center justify-center hover:bg-brand-orange-600 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#services" className="hover:text-brand-orange-500 transition-colors">Social Media Management</a></li>
              <li><a href="#services" className="hover:text-brand-orange-500 transition-colors">Feed & Story Design</a></li>
              <li><a href="#services" className="hover:text-brand-orange-500 transition-colors">Video & Product Photos</a></li>
              <li><a href="#services" className="hover:text-brand-orange-500 transition-colors">Visual Branding</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Menu</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#home" className="hover:text-brand-blue-500 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-brand-blue-500 transition-colors">About Us</a></li>
              <li><a href="#pricing" className="hover:text-brand-blue-500 transition-colors">Pricing Packages</a></li>
              <li><a href="#gallery" className="hover:text-brand-blue-500 transition-colors">Portfolio</a></li>
              <li><a href="#contact" className="hover:text-brand-blue-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-brand-blue-500" />
                <span>+62 813-3613-5036</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-brand-orange-500" />
                <span>hellokontenih@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Instagram className="h-5 w-5 text-brand-blue-500" />
                <span>@masterarol_cc</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-brand-orange-500" />
                <span>Surabaya, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Kontenih. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-brand-orange-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brand-orange-500 transition-colors">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
