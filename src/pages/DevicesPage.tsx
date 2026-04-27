import { useMemo, useState } from "react";
import {
  Battery,
  Clock,
  MapPin,
  Plus,
  Search,
  Settings,
  Trash2,
  Wifi,
  WifiOff,
} from "lucide-react";
import { TopNav } from "@/components/ganga/TopNav";
import { Footer } from "@/components/ganga/Footer";

type DeviceStatus = "normal" | "warning" | "critical" | "offline";

interface Device {
  id: string;
  name: string;
  location: string;
  status: DeviceStatus;
  battery: number;
  uptime: number;
  lastCalibration: string;
}

const seed: Device[] = [
  { id: "d1", name: "River Station Gangotri", location: "Gangotri Glacier", status: "normal", battery: 92, uptime: 99.4, lastCalibration: "12 days ago" },
  { id: "d2", name: "River Station Rishikesh", location: "Rishikesh Triveni Ghat", status: "normal", battery: 87, uptime: 98.5, lastCalibration: "20 days ago" },
  { id: "d3", name: "River Station Hardwar", location: "Har Ki Pauri", status: "warning", battery: 62, uptime: 95.2, lastCalibration: "9 days ago" },
  { id: "d4", name: "River Station Kanpur", location: "Jajmau Industrial", status: "critical", battery: 28, uptime: 89.7, lastCalibration: "14 days ago" },
  { id: "d5", name: "River Station Varanasi", location: "Dashashwamedh Ghat", status: "normal", battery: 95, uptime: 99.1, lastCalibration: "10 days ago" },
  { id: "d6", name: "River Station Patna", location: "Gandhi Ghat", status: "warning", battery: 71, uptime: 94.3, lastCalibration: "6 days ago" },
  { id: "d7", name: "River Station Sundarbans", location: "Ganga delta mouth", status: "offline", battery: 5, uptime: 72.4, lastCalibration: "2 days ago" },
];

const statusConfig: Record<DeviceStatus, { label: string; chip: string; dot: string }> = {
  normal: { label: "Normal", chip: "bg-success/15 text-success", dot: "bg-success" },
  warning: { label: "Warning", chip: "bg-warning/15 text-warning", dot: "bg-warning" },
  critical: { label: "Critical", chip: "bg-destructive/15 text-destructive", dot: "bg-destructive" },
  offline: { label: "Offline", chip: "bg-muted text-muted-foreground", dot: "bg-muted-foreground" },
};

const DevicesPage = () => {
  const [devices, setDevices] = useState<Device[]>(seed);
  const [query, setQuery] = useState("");

  const stats = useMemo(() => {
    const online = devices.filter((d) => d.status !== "offline").length;
    const offline = devices.filter((d) => d.status === "offline").length;
    const avgBattery = Math.round(devices.reduce((a, d) => a + d.battery, 0) / devices.length);
    return { total: devices.length, online, offline, avgBattery };
  }, [devices]);

  const filtered = devices.filter((d) => {
    const q = query.trim().toLowerCase();
    return !q || d.name.toLowerCase().includes(q) || d.location.toLowerCase().includes(q);
  });

  const remove = (id: string) => setDevices((prev) => prev.filter((d) => d.id !== id));

  const batteryColor = (b: number) =>
    b >= 70 ? "text-success" : b >= 35 ? "text-warning" : "text-destructive";

  const summary = [
    { label: "Total devices", value: stats.total, accent: "text-foreground" },
    { label: "Online", value: stats.online, accent: "text-success" },
    { label: "Offline", value: stats.offline, accent: "text-destructive" },
    { label: "Avg. battery", value: `${stats.avgBattery}%`, accent: "text-primary" },
  ];

  return (
    <main className="min-h-screen">
      <TopNav />

      <section className="container mx-auto px-6 pt-28 pb-10">
        <p className="text-sm font-medium text-primary uppercase tracking-widest">Network</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold">Device management</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Monitor and manage IoT monitoring nodes deployed along the Ganga basin.
        </p>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {summary.map((s) => (
            <div key={s.label} className="glass-card rounded-2xl p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              <div className={`mt-2 text-3xl font-bold tabular-nums ${s.accent}`}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col md:flex-row gap-3">
          <div className="glass-card rounded-2xl p-3 flex items-center gap-2 flex-1">
            <Search className="h-4 w-4 text-muted-foreground ml-2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search devices by name or location…"
              className="flex-1 bg-transparent outline-none text-sm py-2"
            />
          </div>
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-aqua px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
            <Plus className="h-4 w-4" /> Add device
          </button>
        </div>

        <div className="mt-6 glass-card rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border/50">
            <h2 className="font-semibold">Monitoring nodes</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border/40">
                  <th className="px-6 py-3 font-medium">Device</th>
                  <th className="px-4 py-3 font-medium">Location</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Battery</th>
                  <th className="px-4 py-3 font-medium">Uptime</th>
                  <th className="px-4 py-3 font-medium">Last calibration</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d) => {
                  const cfg = statusConfig[d.status];
                  return (
                    <tr key={d.id} className="border-b border-border/30 hover:bg-secondary/30 transition-smooth">
                      <td className="px-6 py-4 font-medium flex items-center gap-2">
                        {d.status === "offline" ? (
                          <WifiOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Wifi className="h-4 w-4 text-primary" />
                        )}
                        {d.name}
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" /> {d.location}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${cfg.chip}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                          {cfg.label}
                        </span>
                      </td>
                      <td className={`px-4 py-4 font-semibold tabular-nums ${batteryColor(d.battery)}`}>
                        <span className="inline-flex items-center gap-1.5">
                          <Battery className="h-3.5 w-3.5" /> {d.battery}%
                        </span>
                      </td>
                      <td className="px-4 py-4 tabular-nums text-muted-foreground">{d.uptime}%</td>
                      <td className="px-4 py-4 text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" /> {d.lastCalibration}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="p-2 rounded-xl bg-secondary hover:bg-secondary/70 transition-smooth"
                            aria-label="Configure"
                          >
                            <Settings className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => remove(d.id)}
                            className="p-2 rounded-xl bg-secondary hover:bg-destructive/20 hover:text-destructive transition-smooth"
                            aria-label="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-muted-foreground">
                      No devices match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default DevicesPage;
