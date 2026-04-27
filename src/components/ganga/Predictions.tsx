import { Brain, CloudRain, TrendingUp, ShieldAlert } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const forecast = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  pollution: 32 + Math.sin(i / 3) * 12 + (i > 14 ? (i - 14) * 2.5 : 0),
  flood: 18 + Math.cos(i / 4) * 6 + (i > 16 ? (i - 16) * 1.8 : 0),
}));

export const Predictions = () => {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-3xl p-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-primary text-sm font-medium">
                <Brain className="h-4 w-4" />
                AI Forecast · LSTM model
              </div>
              <h3 className="mt-2 text-2xl font-bold">24-hour pollution & flood risk</h3>
            </div>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-2">
                <span className="h-2 w-4 rounded-full bg-primary" /> Pollution Index
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-4 rounded-full bg-warning" /> Flood Risk
              </span>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecast}>
                <defs>
                  <linearGradient id="lp" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="hour" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} stroke="hsl(var(--border))" />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} stroke="hsl(var(--border))" />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Line type="monotone" dataKey="pollution" stroke="url(#lp)" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="flood" stroke="hsl(var(--warning))" strokeWidth={2.5} dot={false} strokeDasharray="5 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-5">
          {[
            {
              icon: ShieldAlert,
              title: "Water Quality Class",
              value: "Class B",
              detail: "Random Forest · 94.2% confidence · Suitable for outdoor bathing",
              tone: "success",
            },
            {
              icon: TrendingUp,
              title: "Pollution Trend",
              value: "+8.4%",
              detail: "Rising over last 6h near Kanpur industrial zone",
              tone: "warning",
            },
            {
              icon: CloudRain,
              title: "Rainfall + Tide",
              value: "Moderate",
              detail: "12mm expected · tide rising · low flood probability",
              tone: "primary",
            },
          ].map(({ icon: Icon, title, value, detail, tone }) => (
            <div key={title} className="glass-card rounded-3xl p-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                <Icon className={`h-4 w-4 text-${tone}`} />
                {title}
              </div>
              <div className={`mt-3 text-3xl font-bold text-${tone}`}>{value}</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
