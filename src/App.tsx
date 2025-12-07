import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import OrderAgent from "./pages/OrderAgent";
import KontenihAI from "./pages/KontenihAI";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Scheduler from "./pages/Scheduler";
import CarouselBuilder from "./pages/CarouselBuilder";
import Analytics from "./pages/Analytics";
import CreatorHub from "./pages/CreatorHub";
import Ecommerce from "./pages/Ecommerce";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="kontenih-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/order-agent" element={<OrderAgent />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/kontenih-ai" element={<KontenihAI />} />
            <Route path="/scheduler" element={<Scheduler />} />
            <Route path="/carousel-builder" element={<CarouselBuilder />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/creator-hub" element={<CreatorHub />} />
            <Route path="/ecommerce" element={<Ecommerce />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
