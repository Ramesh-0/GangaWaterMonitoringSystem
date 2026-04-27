import { Waves } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-border/50 mt-10">
    <div className="container mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="rounded-xl bg-gradient-aqua p-2">
          <Waves className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-semibold">Ganga Sentinel</span>
        <span className="text-xs text-muted-foreground ml-2">
          IoT + AI for river conservation
        </span>
      </div>
      <p className="text-xs text-muted-foreground">
        Restoring the river that sustains 400+ million lives.
      </p>
    </div>
  </footer>
);
