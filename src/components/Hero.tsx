
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown, Rocket, Sparkles } from 'lucide-react';
import { WebGLShader } from '@/components/ui/web-gl-shader';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleTryKontenih = async () => {
    if (user) {
      navigate('/kontenih-ai');
    } else {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/kontenih-ai`
        }
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message
        });
      }
    }
  };
  
  return (
    <section id="home" className="relative overflow-hidden min-h-screen pb-20 pt-8 md:pb-24 md:pt-12 bg-slate-100 dark:bg-[#050a18]">
      {/* WebGL Shader only in dark mode */}
      <div className="hidden dark:block absolute inset-0 z-0">
        <WebGLShader />
      </div>
      
      {/* Radial spotlight - Background theme tetap sama */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -top-1/3 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full z-0',
          'bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]',
          'blur-[30px]',
        )}
      />

      <div className="relative z-10">
        <ContainerScroll
        titleComponent={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <span className="mb-6 inline-block rounded-full border border-brand-blue-500/30 px-3 py-1 text-xs text-brand-blue-400 dark:text-brand-blue-300">
              🚀 AI Marketing Agency
            </span>
            
            <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-light text-foreground md:text-5xl lg:text-7xl">
              Content Drives Sales?{" "}
              <span className="bg-gradient-to-r from-brand-blue-400 via-brand-orange-400 to-brand-blue-400 bg-clip-text text-transparent animate-gradient">
                Kontenih is the Answer.
              </span>
            </h1>
            
            <p className="mx-auto mb-10 max-w-2xl text-lg text-foreground/70 md:text-xl">
              Driving business growth with AI solutions and integrated digital transformation strategies for all types of businesses.
            </p>

            <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:mb-0">
              <Button
                onClick={handleTryKontenih}
                className="neumorphic-button hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] relative w-full overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-8 py-4 text-foreground shadow-lg transition-all duration-300 hover:border-brand-blue-500/30 sm:w-auto dark:border-white/20 dark:from-white/20 dark:to-white/10"
                variant="ghost"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  {user ? 'Go to Kontenih AI' : 'Try Kontenih AI'}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Button>
              
              <a
                href="#about"
                className="flex w-full items-center justify-center gap-2 text-foreground/70 transition-colors hover:text-foreground sm:w-auto"
              >
                <span>Learn how it works</span>
                <ChevronDown className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        }
      >
        {/* Video untuk desktop */}
        <video
          src="/ui%20kontenih.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="hidden md:block mx-auto rounded-2xl object-cover h-full w-full"
        />
        {/* Fallback image untuk mobile */}
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&q=80"
          alt="Kontenih Dashboard"
          className="md:hidden mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
      </div>
    </section>
  );
};

export default Hero;
