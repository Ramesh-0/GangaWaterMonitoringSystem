import { AlertTriangle, Bell, CheckCircle2, MapPin } from "lucide-react";

const alerts = [
  {
    severity: "critical",
    icon: AlertTriangle,
    title: "High turbidity detected",
    location: "Node K-14 · Kanpur tannery district",
    time: "2 min ago",
    detail: "Turbidity spiked to 78 NTU. Likely industrial discharge event. Authorities notified.",
  },
  {
    severity: "warning",
    icon: Bell,
    title: "Dissolved oxygen dropping",
    location: "Node V-08 · Varanasi Dashashwamedh Ghat",
    time: "14 min ago",
    detail: "DO trending below 5 mg/L over last 90 minutes. Aquatic stress likely.",
  },
  {
    severity: "good",
    icon: CheckCircle2,
    title: "Rishikesh segment stable",
    location: "Nodes R-01 to R-07",
    time: "1 hr ago",
    detail: "All parameters within ideal range. Class A water quality maintained.",
  },
];

const tone = {
  critical: { ring: "ring-destructive/40", chip: "bg-destructive/15 text-destructive", dot: "bg-destructive" },
  warning: { ring: "ring-warning/40", chip: "bg-warning/15 text-warning", dot: "bg-warning" },
  good: { ring: "ring-success/40", chip: "bg-success/15 text-success", dot: "bg-success" },
} as const;

export const Alerts = () => {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="mb-10">
        <p className="text-sm font-medium text-primary uppercase tracking-widest">Early warning system</p>
        <h2 className="mt-2 text-4xl md:text-5xl font-bold">Active alerts</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {alerts.map((a) => {
          const t = tone[a.severity as keyof typeof tone];
          const Icon = a.icon;
          return (
            <article
              key={a.title}
              className={`glass-card rounded-3xl p-6 ring-1 ${t.ring} transition-smooth hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-2xl ${t.chip}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${t.chip} flex items-center gap-1.5`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${t.dot} animate-pulse-glow`} />
                  {a.severity}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{a.title}</h3>
              <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" /> {a.location} · {a.time}
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a.detail}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};
