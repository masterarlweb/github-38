import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, ChevronLeft, ChevronRight, Palette, Sparkles, Save, Image as ImageIcon, Type } from 'lucide-react';
import Logo from '@/components/Logo';

interface Slide {
  id: string;
  title: string;
  content: string;
  backgroundColor: string;
  textColor: string;
}

interface CarouselTemplate {
  id: string;
  title: string;
  slides: Slide[];
  is_ai_generated: boolean;
}

const defaultSlide: Omit<Slide, 'id'> = {
  title: '',
  content: '',
  backgroundColor: '#1e1e2f',
  textColor: '#ffffff'
};

const colorPresets = [
  { bg: '#1e1e2f', text: '#ffffff', label: 'Dark' },
  { bg: '#ffffff', text: '#1e1e2f', label: 'Light' },
  { bg: '#667eea', text: '#ffffff', label: 'Purple' },
  { bg: '#f093fb', text: '#1e1e2f', label: 'Pink' },
  { bg: '#4facfe', text: '#ffffff', label: 'Blue' },
  { bg: '#43e97b', text: '#1e1e2f', label: 'Green' },
  { bg: '#fa709a', text: '#ffffff', label: 'Rose' },
  { bg: '#fee140', text: '#1e1e2f', label: 'Yellow' },
];

const CarouselBuilder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const aiData = location.state?.aiData;
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState<CarouselTemplate[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [carouselTitle, setCarouselTitle] = useState(aiData?.topic || 'New Carousel');
  const [slides, setSlides] = useState<Slide[]>([
    { id: '1', ...defaultSlide, title: 'Slide 1' }
  ]);
  const [showTemplates, setShowTemplates] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session?.user) {
        navigate('/auth');
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session?.user) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchTemplates();
    }
  }, [user]);

  const fetchTemplates = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('carousel_templates')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching templates:', error);
      return;
    }

    // Transform the data to ensure slides is properly typed
    const transformedData = (data || []).map(item => ({
      ...item,
      slides: (item.slides as unknown as Slide[]) || []
    }));

    setTemplates(transformedData);
  };

  const addSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      ...defaultSlide,
      title: `Slide ${slides.length + 1}`
    };
    setSlides([...slides, newSlide]);
    setCurrentSlideIndex(slides.length);
  };

  const removeSlide = (index: number) => {
    if (slides.length <= 1) {
      toast.error('Carousel harus memiliki minimal 1 slide');
      return;
    }
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
    if (currentSlideIndex >= newSlides.length) {
      setCurrentSlideIndex(newSlides.length - 1);
    }
  };

  const updateSlide = (index: number, updates: Partial<Slide>) => {
    const newSlides = [...slides];
    newSlides[index] = { ...newSlides[index], ...updates };
    setSlides(newSlides);
  };

  const applyColorPreset = (preset: typeof colorPresets[0]) => {
    updateSlide(currentSlideIndex, {
      backgroundColor: preset.bg,
      textColor: preset.text
    });
  };

  const saveCarousel = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('carousel_templates')
      .insert([{
        user_id: user.id,
        title: carouselTitle,
        slides: slides as unknown as Record<string, unknown>[],
        template_type: 'custom',
        is_ai_generated: false
      }]);

    if (error) {
      toast.error('Gagal menyimpan carousel');
      console.error('Error saving carousel:', error);
      return;
    }

    toast.success('Carousel berhasil disimpan!');
    fetchTemplates();
  };

  const loadTemplate = (template: CarouselTemplate) => {
    setCarouselTitle(template.title);
    setSlides(template.slides);
    setCurrentSlideIndex(0);
    setShowTemplates(false);
  };

  const currentSlide = slides[currentSlideIndex];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-foreground/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/kontenih-ai')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Logo size="sm" />
              <span className="text-foreground/40">/</span>
              <span className="font-medium">Carousel Builder</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowTemplates(true)}>
              Templates
            </Button>
            <Button onClick={saveCarousel} className="gap-2">
              <Save className="w-4 h-4" />
              Simpan
            </Button>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-medium">Preview</h2>
            </div>

            <div className="relative aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlideIndex}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                  style={{ backgroundColor: currentSlide.backgroundColor }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 
                    className="text-2xl md:text-3xl font-bold mb-4"
                    style={{ color: currentSlide.textColor }}
                  >
                    {currentSlide.title || 'Judul Slide'}
                  </h2>
                  <p 
                    className="text-base md:text-lg opacity-80"
                    style={{ color: currentSlide.textColor }}
                  >
                    {currentSlide.content || 'Konten slide akan muncul di sini...'}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
                <Button
                  size="icon"
                  variant="ghost"
                  disabled={currentSlideIndex === 0}
                  onClick={() => setCurrentSlideIndex(prev => prev - 1)}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <span className="text-white text-sm font-medium">
                  {currentSlideIndex + 1} / {slides.length}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  disabled={currentSlideIndex === slides.length - 1}
                  onClick={() => setCurrentSlideIndex(prev => prev + 1)}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Slide Thumbnails */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 justify-center">
              {slides.map((slide, index) => (
                <motion.button
                  key={slide.id}
                  onClick={() => setCurrentSlideIndex(index)}
                  className={`w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center relative transition-all ${
                    index === currentSlideIndex ? 'ring-2 ring-purple-500' : 'ring-1 ring-foreground/10'
                  }`}
                  style={{ backgroundColor: slide.backgroundColor }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xs font-medium" style={{ color: slide.textColor }}>
                    {index + 1}
                  </span>
                  {slides.length > 1 && (
                    <button
                      onClick={e => { e.stopPropagation(); removeSlide(index); }}
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center"
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                    </button>
                  )}
                </motion.button>
              ))}
              <motion.button
                onClick={addSlide}
                className="w-16 h-16 rounded-lg flex-shrink-0 border-2 border-dashed border-foreground/20 flex items-center justify-center hover:border-purple-500 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-5 h-5 text-foreground/40" />
              </motion.button>
            </div>
          </motion.div>

          {/* Editor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-6">
              {/* Carousel Title */}
              <div>
                <label className="text-sm text-foreground/60 mb-2 block flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Nama Carousel
                </label>
                <Input
                  value={carouselTitle}
                  onChange={e => setCarouselTitle(e.target.value)}
                  placeholder="Nama carousel..."
                  className="bg-background/50"
                />
              </div>

              {/* Slide Content */}
              <div>
                <label className="text-sm text-foreground/60 mb-2 block flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  Judul Slide
                </label>
                <Input
                  value={currentSlide.title}
                  onChange={e => updateSlide(currentSlideIndex, { title: e.target.value })}
                  placeholder="Judul slide..."
                  className="bg-background/50"
                />
              </div>

              <div>
                <label className="text-sm text-foreground/60 mb-2 block">Konten</label>
                <Textarea
                  value={currentSlide.content}
                  onChange={e => updateSlide(currentSlideIndex, { content: e.target.value })}
                  placeholder="Konten slide..."
                  className="bg-background/50 min-h-[120px]"
                />
              </div>

              {/* Color Presets */}
              <div>
                <label className="text-sm text-foreground/60 mb-3 block flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Warna Tema
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {colorPresets.map((preset, index) => (
                    <motion.button
                      key={index}
                      onClick={() => applyColorPreset(preset)}
                      className="p-3 rounded-lg border border-foreground/10 hover:border-purple-500 transition-all"
                      style={{ backgroundColor: preset.bg }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-xs font-medium" style={{ color: preset.text }}>
                        {preset.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Custom Colors */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-foreground/60 mb-2 block">Background Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={currentSlide.backgroundColor}
                      onChange={e => updateSlide(currentSlideIndex, { backgroundColor: e.target.value })}
                      className="w-10 h-10 rounded cursor-pointer"
                    />
                    <Input
                      value={currentSlide.backgroundColor}
                      onChange={e => updateSlide(currentSlideIndex, { backgroundColor: e.target.value })}
                      className="bg-background/50 flex-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-foreground/60 mb-2 block">Text Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={currentSlide.textColor}
                      onChange={e => updateSlide(currentSlideIndex, { textColor: e.target.value })}
                      className="w-10 h-10 rounded cursor-pointer"
                    />
                    <Input
                      value={currentSlide.textColor}
                      onChange={e => updateSlide(currentSlideIndex, { textColor: e.target.value })}
                      className="bg-background/50 flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Templates Modal */}
      <AnimatePresence>
        {showTemplates && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTemplates(false)}
          >
            <motion.div
              className="w-full max-w-2xl bg-background rounded-2xl border border-foreground/10 p-6 max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-6">Templates Tersimpan</h3>
              
              {templates.length === 0 ? (
                <div className="text-center py-12">
                  <ImageIcon className="w-12 h-12 mx-auto mb-4 text-foreground/20" />
                  <p className="text-foreground/40">Belum ada template tersimpan</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {templates.map(template => (
                    <Card
                      key={template.id}
                      className="cursor-pointer hover:border-purple-500 transition-all"
                      onClick={() => loadTemplate(template)}
                    >
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">{template.title}</h4>
                        <p className="text-xs text-foreground/50">
                          {template.slides.length} slides
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CarouselBuilder;
