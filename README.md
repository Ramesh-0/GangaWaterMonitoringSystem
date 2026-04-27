# 🌊 Ganga Sentinel

> **Listening to the pulse of the Ganga.**
> A real-time IoT + AI monitoring platform protecting India's most sacred river — from source to sea.

---

## 🪷 The Problem

Pollution in the Ganga is rising rapidly due to **industrial waste, untreated sewage, and garbage dumping**. This threatens public health, biodiversity, agriculture, and the cultural heritage of over **400 million people** who depend on the river.

The current monitoring systems are:
- **Too slow** — readings are manual and infrequent
- **Fragmented** — no unified picture across the 2,525 km basin
- **Reactive** — agencies learn about contamination *after* the damage is done

By the time authorities receive data, the pollution event is already over.

---

## 💡 Our Ideology

> **"Combine technology with conservation to restore a river that sustains a civilization."**

We believe the Ganga deserves a **nervous system** — a continuous, intelligent stream of awareness flowing alongside its waters. Instead of waiting for problems, we **predict and prevent** them.

Our approach rests on three pillars:

1. **Sense everywhere, continuously** — a distributed network of low-cost IoT nodes along the river basin.
2. **Understand with AI** — machine learning models that turn raw sensor data into forecasts and risk classifications.
3. **Act in time** — interactive dashboards and early-warning alerts that put actionable insight in the hands of authorities the moment it matters.

The end goal: **a cleaner, safer Ganga for future generations.**

---

## 🛰️ The Solution

A network of **edge IoT nodes** (Raspberry Pi + multi-parameter water sensors) deployed along the river continuously stream telemetry to the cloud. AI models analyze the stream to detect pollution events, forecast water quality, and predict flood risk — all surfaced through a beautiful real-time dashboard.

### What we monitor
- 🧪 **pH** — acidity / alkalinity
- 💨 **Dissolved Oxygen (DO)** — aquatic life indicator
- 👁️ **Turbidity** — suspended particles / discharge events
- ⚡ **Conductivity** — dissolved solids and salinity
- 🌡️ **Temperature** — thermal pollution + ecosystem health
- 🌊 **Water Level** — flood risk and flow

### AI Layer
- **LSTM neural network** — 24-hour pollution & flood-risk forecasting
- **Random Forest classifier** — water quality class (A / B / C / D) with confidence
- **Anomaly detection** — sudden spikes flagged as likely industrial discharge

---

## 🖥️ What's Built So Far

A fully-interactive **web dashboard** (mobile-responsive) with the following modules:

| Section | Purpose |
|---|---|
| **Hero** | Cinematic intro · live node count · key stats (2,525 km · 12.4K readings/min · 97 cities) |
| **Live Telemetry Grid** | 6 real-time sensor cards with sparkline charts, updating every 2.2s |
| **AI Predictions** | 24-hour pollution & flood-risk forecast chart + Random Forest classification |
| **River Map** | SVG visualization of the sensor network from Gangotri → Bay of Bengal, with node-status indicators |
| **Early Warning Alerts** | Severity-categorized alerts (Critical / Warning / Healthy) with location and detail |
| **Footer + Navigation** | Frosted-glass nav bar, agency login CTA |

### Design language
- **Deep teal + aqua glassmorphism** — evokes flowing water
- **Editorial typography** — Space Grotesk headings + Inter body
- **Animated wave divider, pulsing node beacons, gradient glow buttons**
- Fully token-driven design system in `src/index.css` + `tailwind.config.ts`

---

## 🧱 Tech Stack

- **React 18** + **Vite 5** + **TypeScript 5**
- **Tailwind CSS v3** — semantic HSL design tokens
- **shadcn/ui** — accessible component primitives
- **Recharts** — sparklines & forecast visualizations
- **lucide-react** — iconography

---

## 📁 Project Structure

```
src/
├── assets/
│   └── ganga-hero.jpg          # AI-generated aerial Ganga visual
├── components/
│   └── ganga/
│       ├── Hero.tsx            # Landing hero + live stats
│       ├── SensorGrid.tsx      # Real-time telemetry cards
│       ├── Predictions.tsx     # LSTM forecast + RF classifier
│       ├── RiverMap.tsx        # SVG sensor network map
│       ├── Alerts.tsx          # Early-warning system
│       └── Footer.tsx
├── pages/
│   └── Index.tsx               # Composition of all dashboard sections
├── index.css                   # Design tokens + animations
└── ...
```

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open the local preview to see the live dashboard.

---

## 🛣️ Roadmap

- [ ] Connect to **real IoT node feeds** (MQTT / WebSocket ingestion)
- [ ] **Interactive Leaflet/Mapbox** map replacing the SVG schematic
- [ ] **Push / SMS notifications** for critical events
- [ ] **Citizen reporting** — let locals flag pollution incidents with photos
- [ ] **Historical analytics** — long-term trend dashboards
- [ ] Multilingual support (हिन्दी, বাংলা, English)

---

## 🙏 Why this matters

The Ganga is not just a river — it is **drinking water for hundreds of millions, irrigation for the breadbasket of India, and a sacred presence woven into the country's identity**. Protecting it is both an environmental and a civilizational responsibility.

> *"By combining technology with conservation, this project aims to improve the health of the river and ensure its safety for future generations."*

---

**Ganga Sentinel** · Restoring the river that sustains 400+ million lives. 🌏
