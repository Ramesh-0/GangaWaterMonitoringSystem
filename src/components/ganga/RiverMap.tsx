const nodes = [
  { x: 8, y: 30, name: "Gangotri", status: "good" },
  { x: 18, y: 38, name: "Rishikesh", status: "good" },
  { x: 28, y: 50, name: "Haridwar", status: "good" },
  { x: 42, y: 62, name: "Kanpur", status: "critical" },
  { x: 55, y: 58, name: "Allahabad", status: "warning" },
  { x: 68, y: 55, name: "Varanasi", status: "warning" },
  { x: 82, y: 65, name: "Patna", status: "good" },
  { x: 94, y: 78, name: "Kolkata", status: "good" },
];

const colorFor = (s: string) =>
  s === "critical" ? "hsl(var(--destructive))" : s === "warning" ? "hsl(var(--warning))" : "hsl(var(--success))";

export const RiverMap = () => {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="glass-card rounded-3xl p-8 md:p-12 overflow-hidden relative">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-widest">Sensor network</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">From Gangotri to the Bay of Bengal</h2>
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-success" /> Healthy</span>
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-warning" /> Watch</span>
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-destructive" /> Critical</span>
          </div>
        </div>

        <div className="relative aspect-[16/7] rounded-2xl bg-gradient-river overflow-hidden">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="riverline" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="0.8" />
              </filter>
            </defs>
            <path
              d="M 0 28 Q 15 35, 28 50 T 55 58 Q 75 60, 100 80"
              stroke="url(#riverline)"
              strokeWidth="1.2"
              fill="none"
              filter="url(#glow)"
            />
            <path
              d="M 0 28 Q 15 35, 28 50 T 55 58 Q 75 60, 100 80"
              stroke="url(#riverline)"
              strokeWidth="0.4"
              fill="none"
            />
            {nodes.map((n) => (
              <g key={n.name}>
                <circle cx={n.x} cy={n.y} r="2.5" fill={colorFor(n.status)} opacity="0.3">
                  <animate attributeName="r" values="2.5;5;2.5" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0;0.6" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx={n.x} cy={n.y} r="1.2" fill={colorFor(n.status)} />
              </g>
            ))}
          </svg>

          {nodes.map((n) => (
            <div
              key={n.name}
              className="absolute -translate-x-1/2 -translate-y-full text-[10px] md:text-xs font-medium text-foreground/90 whitespace-nowrap"
              style={{ left: `${n.x}%`, top: `${n.y}%`, marginTop: -8 }}
            >
              {n.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
