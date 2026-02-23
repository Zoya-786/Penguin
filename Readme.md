# Smart Household Tank & Tap Water Quality Monitoring System

A low-cost, IoT-enabled solution designed to mitigate health risks by providing real-time surveillance of residential water storage and distribution networks.


## The Problem

Contamination often occurs between the municipal treatment plant and the household tap. Key challenges include:

* **Infrastructure Decay:** Biofilm and sediment accumulation in neglected overhead tanks.
* **Supply Irregularity:** Sudden spikes in turbidity and chemical pollutants after pipeline repairs.
* **The Connectivity Gap:** Existing smart solutions often fail in rural areas with unstable internet, leaving residents uninformed during critical contamination events.

## The Solution

This system provides a high-fidelity monitoring ecosystem that tracks water quality at four critical points: Overhead Tanks, Underground Sumps, Kitchen Taps, and Storage Drums. It utilizes an **Offline-First Alerting Architecture**, ensuring that residents receive critical health warnings via SMS even when cloud connectivity is compromised.

---

## Tech Stack

### Frontend & Dashboard

* **React (Vite):** High-performance functional components and hooks.
* **Tailwind CSS:** Responsive, mobile-first design with dark mode support.
* **Recharts:** Dynamic data visualization for historical trend analysis.
* **Lucide-React:** Consistent, professional iconography.

### Hardware & Backend (Conceptual)

* **Microcontroller:** ESP32 for WiFi/Bluetooth and sensor data processing.
* **Sensors:** pH (acidity), TDS (Total Dissolved Solids), and Turbidity (NTU).
* **Communication:** FastAPI/Firebase for cloud sync; Twilio/GSM Module for rural SMS alerts.

---

## System Architecture

### 1. Dashboard Interface

* **Live Metrics:** Real-time gauges for pH, TDS, Turbidity, and Temperature.
* **Source Differentiation:** Independent health cards for various household water nodes.
* **Historical Analytics:** Trend mapping (24h to 30d) to identify seasonal quality shifts.

### 2. Intelligent Alert Engine

* **Tiered Status:** Color-coded urgency (Safe, Warning, Critical).
* **Pulse Protocol:** Critical alerts trigger UI pulse animations and red-border glows.
* **SMS Gateway:** Automated cellular notifications for contamination events in low-connectivity zones.

---

## Performance Benchmarks

The system evaluates water quality against WHO and international safety standards:

| Parameter | Unit | Safe Range | Warning | Critical |
| --- | --- | --- | --- | --- |
| **pH Level** | pH | 6.5 — 8.5 | <6.5 / >8.5 | <5.0 / >10.0 |
| **Turbidity** | NTU | 0 — 5 | 5 — 10 | >10 |
| **TDS** | ppm | <300 | 300 — 600 | >1000 |
| **Tank Level** | % | 20 — 90 | <20 | <5 |

---

## Project Structure

```text
src/
├── components/
│   ├── MetricCard.jsx    # Individual sensor gauges
│   ├── AlertPanel.jsx    # Real-time notification log
│   ├── TankCard.jsx      # Multi-source monitoring units
│   └── StatusBadge.jsx   # Global system health indicator
├── pages/
│   ├── Landing.jsx       # Value proposition and features
│   ├── Dashboard.jsx     # Live monitoring control center
│   └── History.jsx       # Long-term data visualization
├── data/
│   └── sensorSim.js      # Real-time data generation logic
└── App.jsx               # Navigation and state orchestration

```

---

## Installation

1. **Clone the Repository**
```bash
git clone https://github.com/your-username/smart-water-monitor.git

```


2. **Install Dependencies**
```bash
npm install

```


3. **Launch Environment**
```bash
npm run dev

```



---

## Impact & Scalability

* **SDG 6 Integration:** Direct alignment with Clean Water and Sanitation goals.
* **Predictive Maintenance:** Roadmap includes ML models to predict tank cleaning schedules based on turbidity degradation rates.
* **Community Data:** Potential to aggregate anonymized household data to assist municipal authorities in identifying local pipeline breaches.