import { useMemo, useState } from "react";
import { AlertTriangle, Bell, BellOff, CheckCircle2, MapPin, Search, Filter } from "lucide-react";
import { TopNav } from "@/components/ganga/TopNav";
import { Footer } from "@/components/ganga/Footer";

type Severity = "critical" | "warning" | "good";

interface AlertItem {
  id: string;
  severity: Severity;
  title: string;
  location: string;
  node: string;
  time: string;
  detail: string;
  acknowledged?: boolean;
}

const seed: AlertItem[] = [
  { id: "a1", severity: "critical", title: "High turbidity detected", node: "K-14", location: "Kanpur tannery district", time: "2 min ago", detail: "Turbidity spiked to 78 NTU. Likely industrial discharge." },
  { id: "a2", severity: "critical", title: "pH out of safe band", node: "K-22", location: "Kanpur Jajmau", time: "9 min ago", detail: "pH at 9.1 — alkaline discharge suspected." },
  { id: "a3", severity: "warning", title: "Dissolved oxygen dropping", node: "V-08", location: "Varanasi Dashashwamedh Ghat", time: "14 min ago", detail: "DO trending below 5 mg/L for 90 minutes." },
  { id: "a4", severity: "warning", title: "Conductivity rising", node: "P-03", location: "Patna industrial outflow", time: "32 min ago", detail: "Conductivity climbed from 410 to 612 µS/cm." },
  { id: "a5", severity: "good", title: "Rishikesh segment stable", node: "R-01→R-07", location: "Upper Ganga", time: "1 hr ago", detail: "Class A water quality maintained across 7 nodes." },
  { id: "a6", severity: "good", title: "Hardwar inflow normalized", node: "H-12", location: "Hardwar barrage", time: "3 hr ago", detail: "Earlier sediment plume has cleared." },
];

const tone: Record<Severity, { ring: string; chip: string; dot: string; label: string }> = {
  critical: { ring: "ring-destructive/40", chip: "bg-destructive/15 text-destructive", dot: "bg-destructive", label: "Critical" },
  warning: { ring: "ring-warning/40", chip: "bg-warning/15 text-warning", dot: "bg-warning", label: "Warning" },
  good: { ring: "ring-success/40", chip: "bg-success/15 text-success", dot: "bg-success", label: "Resolved" },
};

const iconFor = (s: Severity) => (s === "critical" ? AlertTriangle : s === "warning" ? Bell : CheckCircle2);

const AlertsPage = () => {
  const [items, setItems] = useState<AlertItem[]>(seed);
  const [filter, setFilter] = useState<"all" | Severity>("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(
    () => ({
      total: items.length,
      critical: items.filter((i) => i.severity === "critical").length,
      warning: items.filter((i) => i.severity === "warning").length,
      good: items.filter((i) => i.severity === "good").length,
    }),
    [items]
  );

  const filtered = items.filter((i) => {
    const matchesFilter = filter === "all" || i.severity === filter;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      i.title.toLowerCase().includes(q) ||
      i.location.toLowerCase().includes(q) ||
      i.node.toLowerCase().includes(q);
    return matchesFilter && matchesQuery;
  });

  const acknowledge = (id: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, acknowledged: true } : i)));

  const stats = [
    { label: "Total alerts", value: counts.total, accent: "text-foreground" },
    { label: "Critical", value: counts.critical, accent: "text-destructive" },
    { label: "Warning", value: counts.warning, accent: "text-warning" },
    { label: "Resolved", value: counts.good, accent: "text-success" },
  ];

  return (
    <main className="min-h-screen">
      <TopNav />

      <section className="container mx-auto px-6 pt-28 pb-10">
        <p className="text-sm font-medium text-primary uppercase tracking-widest">Notifications</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold">Alert center</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Live early-warning feed across the Ganga sensor network. Triage events by severity, acknowledge, and dispatch field teams.
        </p>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="glass-card rounded-2xl p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              <div className={`mt-2 text-3xl font-bold tabular-nums ${s.accent}`}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 glass-card rounded-2xl p-3 flex flex-col md:flex-row gap-3 md:items-center">
          <div className="flex items-center gap-2 flex-1 px-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, node, or location…"
              className="flex-1 bg-transparent outline-none text-sm py-2"
            />
          </div>
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-secondary/40">
            <Filter className="h-3.5 w-3.5 ml-2 text-muted-foreground" />
            {(["all", "critical", "warning", "good"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={`text-xs px-3 py-1.5 rounded-full capitalize transition-smooth ${
                  filter === k ? "bg-gradient-aqua text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {k === "good" ? "resolved" : k}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {filtered.length === 0 && (
            <div className="glass-card rounded-2xl p-10 text-center text-muted-foreground">
              <BellOff className="h-6 w-6 mx-auto mb-2" />
              No alerts match your filters.
            </div>
          )}
          {filtered.map((a) => {
            const t = tone[a.severity];
            const Icon = iconFor(a.severity);
            return (
              <article
                key={a.id}
                className={`glass-card rounded-2xl p-5 ring-1 ${t.ring} flex flex-col md:flex-row md:items-center gap-4 ${
                  a.acknowledged ? "opacity-60" : ""
                }`}
              >
                <div className={`p-3 rounded-2xl ${t.chip} self-start`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold">{a.title}</h3>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${t.chip} flex items-center gap-1.5`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${t.dot} animate-pulse-glow`} />
                      {t.label}
                    </span>
                    {a.acknowledged && (
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                        Acknowledged
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" /> Node {a.node} · {a.location} · {a.time}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{a.detail}</p>
                </div>
                <div className="flex md:flex-col gap-2 md:w-36">
                  <button
                    onClick={() => acknowledge(a.id)}
                    disabled={a.acknowledged}
                    className="flex-1 text-xs font-semibold px-3 py-2 rounded-full bg-gradient-aqua text-primary-foreground shadow-glow disabled:opacity-40"
                  >
                    Acknowledge
                  </button>
                  <button className="flex-1 text-xs font-semibold px-3 py-2 rounded-full bg-secondary text-foreground hover:bg-secondary/70 transition-smooth">
                    Dispatch
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AlertsPage;
