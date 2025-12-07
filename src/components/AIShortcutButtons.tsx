import { motion } from 'framer-motion';
import { Calendar, Palette, BarChart3, Users, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AIShortcutButtonsProps {
  shortcuts?: {
    scheduler?: { caption?: string; hashtags?: string[]; recommendedTime?: string };
    carousel?: { template?: string; topic?: string };
    analytics?: boolean;
    creator?: boolean;
    ecommerce?: { productName?: string };
  };
  onShortcutClick?: (type: string, data?: any) => void;
}

const AIShortcutButtons = ({ shortcuts, onShortcutClick }: AIShortcutButtonsProps) => {
  const navigate = useNavigate();

  const shortcutItems = [
    {
      id: 'scheduler',
      icon: <Calendar className="w-4 h-4" />,
      label: 'Scheduler',
      description: 'Jadwalkan posting',
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-400',
      route: '/scheduler',
      enabled: true
    },
    {
      id: 'carousel',
      icon: <Palette className="w-4 h-4" />,
      label: 'Carousel Builder',
      description: 'Buat desain konten',
      color: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-400',
      route: '/carousel-builder',
      enabled: true
    },
    {
      id: 'analytics',
      icon: <BarChart3 className="w-4 h-4" />,
      label: 'Analytics',
      description: 'Evaluasi performa',
      color: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30',
      textColor: 'text-green-400',
      route: '/analytics',
      enabled: true
    },
    {
      id: 'creator',
      icon: <Users className="w-4 h-4" />,
      label: 'Creator Hub',
      description: 'Kolaborasi kreator',
      color: 'from-orange-500/20 to-amber-500/20',
      borderColor: 'border-orange-500/30',
      textColor: 'text-orange-400',
      route: '/creator-hub',
      enabled: true
    },
    {
      id: 'ecommerce',
      icon: <ShoppingCart className="w-4 h-4" />,
      label: 'E-commerce',
      description: 'Hubungkan produk',
      color: 'from-rose-500/20 to-red-500/20',
      borderColor: 'border-rose-500/30',
      textColor: 'text-rose-400',
      route: '/ecommerce',
      enabled: true
    }
  ];

  const handleClick = (item: typeof shortcutItems[0]) => {
    const data = shortcuts?.[item.id as keyof typeof shortcuts];
    if (onShortcutClick) {
      onShortcutClick(item.id, data);
    }
    navigate(item.route, { state: { aiData: data } });
  };

  return (
    <motion.div
      className="flex flex-wrap gap-2 mt-4 justify-start"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      {shortcutItems.map((item, index) => (
        <motion.button
          key={item.id}
          onClick={() => handleClick(item)}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r ${item.color} border ${item.borderColor} backdrop-blur-sm hover:scale-105 transition-all duration-200 group`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: 0.1 + index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className={item.textColor}>{item.icon}</span>
          <div className="text-left">
            <div className={`text-xs font-medium ${item.textColor}`}>{item.label}</div>
            <div className="text-[10px] text-foreground/40 hidden sm:block">{item.description}</div>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default AIShortcutButtons;
