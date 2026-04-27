import { NavLink } from "react-router-dom";
import { Waves } from "lucide-react";

const links = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/alerts", label: "Alerts" },
  { to: "/devices", label: "Devices" },
];

export const TopNav = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/40 border-b border-border/40">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <NavLink to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="rounded-xl bg-gradient-aqua p-2 shadow-glow">
            <Waves className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold tracking-tight hidden sm:inline">Ganga Sentinel</span>
        </NavLink>
        <nav className="flex items-center gap-3 sm:gap-8 text-xs sm:text-sm overflow-x-auto">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `transition-smooth whitespace-nowrap ${isActive ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button className="rounded-full bg-gradient-aqua px-3 sm:px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow shrink-0">
          <span className="hidden sm:inline">Agency login</span>
          <span className="sm:hidden">Login</span>
        </button>
      </div>
    </header>
  );
};