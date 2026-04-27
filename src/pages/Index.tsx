import { Hero } from "@/components/ganga/Hero";
import { SensorGrid } from "@/components/ganga/SensorGrid";
import { Predictions } from "@/components/ganga/Predictions";
import { RiverMap } from "@/components/ganga/RiverMap";
import { Alerts } from "@/components/ganga/Alerts";
import { Footer } from "@/components/ganga/Footer";
import { TopNav } from "@/components/ganga/TopNav";

const Index = () => {
  return (
    <main className="min-h-screen">
      <TopNav />

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
