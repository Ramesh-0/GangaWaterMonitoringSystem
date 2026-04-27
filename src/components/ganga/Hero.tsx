import heroImg from "@/assets/ganga-hero.jpg";
import { Activity, Droplets, Waves } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      <img
        src={heroImg}
        alt="Aerial view of the Ganga river with IoT sensor network visualization"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/40" />

      <div className="relative container mx-auto px-6 pt-24 pb-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Live · 247 sensor nodes online
          </div>

          <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            Listening to the
            <span className="block glow-text">pulse of the Ganga.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            A real-time IoT and AI monitoring platform protecting India's most
            sacred river. From source to sea — pH, dissolved oxygen, turbidity
            and flood risk, predicted before they become problems.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <button className="group relative overflow-hidden rounded-full bg-gradient-aqua px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-smooth hover:scale-105">
              <span className="relative z-10">Explore live dashboard</span>
            </button>
            <button className="rounded-full border border-border bg-card/50 px-7 py-3.5 text-sm font-semibold backdrop-blur-md transition-smooth hover:bg-card">
              View sensor network
            </button>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
            {[
              { icon: Waves, label: "River KM monitored", value: "2,525" },
              { icon: Activity, label: "Readings / min", value: "12.4K" },
              { icon: Droplets, label: "Cities protected", value: "97" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label}>
                <Icon className="h-5 w-5 text-primary mb-2" />
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-xs text-muted-foreground mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flowing wave at bottom */}
      <svg
        className="absolute bottom-0 left-0 w-[200%] animate-wave text-background"
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 C1680,100 1920,20 2160,60 C2400,100 2640,20 2880,60 L2880,120 L0,120 Z"
        />
      </svg>
    </section>
  );
};
