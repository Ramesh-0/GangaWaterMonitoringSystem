import { Hero } from "@/components/ganga/Hero";
import { SensorGrid } from "@/components/ganga/SensorGrid";
import { Predictions } from "@/components/ganga/Predictions";
import { RiverMap } from "@/components/ganga/RiverMap";
import { Alerts } from "@/components/ganga/Alerts";
import { Footer } from "@/components/ganga/Footer";
import { Waves } from "lucide-react";

const Index = () => {
  return (
    <main className="min-h-screen">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/40 border-b border-border/40">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <div className="rounded-xl bg-gradient-aqua p-2 shadow-glow">
              <Waves className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold tracking-tight">Ganga Sentinel</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#dashboard" className="hover:text-foreground transition-smooth">Dashboard</a>
            <a href="#dashboard" className="hover:text-foreground transition-smooth">Predictions</a>
            <a href="#dashboard" className="hover:text-foreground transition-smooth">Alerts</a>
            <a href="#dashboard" className="hover:text-foreground transition-smooth">Network</a>
          </nav>
          <button className="rounded-full bg-gradient-aqua px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow">
            Agency login
          </button>
        </div>
      </header>

      <Hero />
      <SensorGrid />
      <Predictions />
      <RiverMap />
      <Alerts />
      <Footer />
    </main>
  );
};

export default Index;
