import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import {
  Activity,
  Droplet,
  Eye,
  Thermometer,
  Waves,
  Zap,
} from "lucide-react";

type Status = "good" | "moderate" | "critical";

interface Sensor {
  id: string;
  name: string;
  unit: string;
  icon: typeof Droplet;
  value: number;
  min: number;
  max: number;
  decimals: number;
  ideal: [number, number];
}

const initialSensors: Sensor[] = [
  { id: "ph", name: "pH Level", unit: "", icon: Droplet, value: 7.2, min: 6.5, max: 8.5, decimals: 2, ideal: [6.8, 8.0] },
  { id: "do", name: "Dissolved O₂", unit: "mg/L", icon: Activity, value: 6.8, min: 4, max: 10, decimals: 1, ideal: [5, 9] },
  { id: "turb", name: "Turbidity", unit: "NTU", icon: Eye, value: 28, min: 5, max: 80, decimals: 0, ideal: [0, 25] },
  { id: "cond", name: "Conductivity", unit: "µS/cm", icon: Zap, value: 412, min: 200, max: 800, decimals: 0, ideal: [200, 500] },
  { id: "temp", name: "Temperature", unit: "°C", icon: Thermometer, value: 24.6, min: 18, max: 32, decimals: 1, ideal: [20, 28] },
  { id: "level", name: "Water Level", unit: "m", icon: Waves, value: 4.2, min: 1, max: 8, decimals: 2, ideal: [2, 6] },
];

const seedHistory = (val: number) =>
  Array.from({ length: 20 }, (_, i) => ({
    v: val + (Math.sin(i / 2) + Math.random() - 0.5) * (val * 0.05),
  }));

const getStatus = (s: Sensor): Status => {
  if (s.value < s.ideal[0] * 0.85 || s.value > s.ideal[1] * 1.15) return "critical";
  if (s.value < s.ideal[0] || s.value > s.ideal[1]) return "moderate";
  return "good";
};

const statusConfig: Record<Status, { label: string; color: string; bg: string }> = {
  good: { label: "Healthy", color: "text-success", bg: "bg-success/15" },
  moderate: { label: "Moderate", color: "text-warning", bg: "bg-warning/15" },
  critical: { label: "Critical", color: "text-destructive", bg: "bg-destructive/15" },
};

export const SensorGrid = () => {
  const [sensors, setSensors] = useState(initialSensors);
  const [history, setHistory] = useState(() =>
    Object.fromEntries(initialSensors.map((s) => [s.id, seedHistory(s.value)]))
  );

  useEffect(() => {
    const t = setInterval(() => {
      setSensors((prev) =>
        prev.map((s) => {
          const drift = (Math.random() - 0.5) * (s.max - s.min) * 0.04;
          const next = Math.max(s.min, Math.min(s.max, s.value + drift));
          return { ...s, value: next };
        })
      );
      setHistory((prev) => {
        const next: typeof prev = {};
        for (const s of initialSensors) {
          const arr = prev[s.id] ?? [];
          const last = arr[arr.length - 1]?.v ?? s.value;
          const drift = (Math.random() - 0.5) * (s.max - s.min) * 0.04;
          const v = Math.max(s.min, Math.min(s.max, last + drift));
          next[s.id] = [...arr.slice(-19), { v }];
        }
        return next;
      });
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="container mx-auto px-6 py-20" id="dashboard">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
        <div>
          <p className="text-sm font-medium text-primary uppercase tracking-widest">Live telemetry</p>
          <h2 className="mt-2 text-4xl md:text-5xl font-bold">Real-time water signals</h2>
        </div>
        <p className="text-sm text-muted-foreground max-w-sm">
          Streamed from edge nodes (Raspberry Pi) along the river basin · updated every 2.2s
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sensors.map((s) => {
          const status = getStatus(s);
          const cfg = statusConfig[status];
          const Icon = s.icon;
          return (
            <div
              key={s.id}
              className="glass-card rounded-3xl p-6 transition-smooth hover:-translate-y-1 hover:shadow-elevated relative overflow-hidden group"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-smooth" />

              <div className="flex items-start justify-between relative">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-primary/10 p-2.5 ring-1 ring-primary/20">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">{s.name}</div>
                    <div className="text-xs text-muted-foreground/70 mt-0.5">
                      Ideal {s.ideal[0]}–{s.ideal[1]} {s.unit}
                    </div>
                  </div>
                </div>
                <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>
                  {cfg.label}
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-bold tracking-tight tabular-nums">
                  {s.value.toFixed(s.decimals)}
                </span>
                <span className="text-sm text-muted-foreground">{s.unit}</span>
              </div>

              <div className="h-16 mt-4 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={history[s.id]}>
                    <defs>
                      <linearGradient id={`g-${s.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fill={`url(#g-${s.id})`}
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
