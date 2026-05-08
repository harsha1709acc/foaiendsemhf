# 🛰️ Real-Time ISS & News Dashboard

A premium, interactive dashboard built with React and Vite that tracks the International Space Station (ISS) in real-time, displays the latest global news using GNews, and features an AI-powered chatbot for data-driven insights.

![ISS Dashboard](https://cdn-icons-png.flaticon.com/512/2094/2094513.png)

## 🚀 Live Demo
**GitHub Repository:** [harsha1709acc/foaiendsemhf](https://github.com/harsha1709acc/foaiendsemhf)

---

## ✨ Features

### 📡 Real-Time ISS Tracker
- **Interactive Map**: Live location tracking using Leaflet.js with a custom satellite icon.
- **Trajectory Path**: Visualizes the last 15 positions of the ISS.
- **Live Stats**: Real-time Latitude, Longitude, and Altitude.
- **Speed Calculation**: Dynamically calculates speed in km/h using the Haversine formula.
- **Reverse Geocoding**: Identifies the city or ocean currently below the ISS.
- **Astronaut Status**: Lists all people currently in space and their respective crafts.

### 📰 News Dashboard
- **GNews Integration**: Fetches top headlines for Technology and Science.
- **Search & Filter**: Search through articles and sort by date or relevance.
- **Caching**: Implements `localStorage` caching with a 15-minute TTL to optimize API usage.
- **Responsive Design**: Clean, modern card-based layout with skeleton loading states.

### 🤖 AI Dashboard Assistant
- **Context-Aware**: An AI chatbot (Mistral-7B) that only answers based on the current dashboard data.
- **Floating Interface**: Accessible from any section of the dashboard.
- **Proxy-Routed**: Uses a Vite proxy to handle CORS and network-level security.

### 📊 Data Visualization
- **Speed Chart**: Line chart showing ISS speed trends over time.
- **News Distribution**: Doughnut chart showing the balance of news categories.

---

## 🛠️ Tech Stack
- **Frontend**: React 18, Vite
- **Styling**: Vanilla CSS (Modern Design System)
- **Maps**: Leaflet.js
- **Charts**: Chart.js
- **APIs**:
  - ISS Tracking: OpenNotify API
  - News: GNews API
  - AI: Hugging Face Inference API (Mistral-7B)
  - Geocoding: Nominatim (OpenStreetMap)

---

## 💻 Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/harsha1709acc/foaiendsemhf.git
   cd foaiendsemhf
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your API keys:
   ```env
   VITE_NEWS_API_KEY=your_gnews_api_key
   VITE_AI_TOKEN=your_huggingface_token
   ```
   *   Get a GNews key at [gnews.io](https://gnews.io/)
   *   Get a Hugging Face token at [huggingface.co](https://huggingface.co/settings/tokens)

4. **Run the development server**:
   ```bash
   npm run dev
   ```

---

## 🌐 Deployment (Vercel)

This project is optimized for Vercel deployment using Serverless Functions to proxy the ISS API (which is insecure HTTP).

1. **Connect to Vercel**: Import your repository into the Vercel Dashboard.
2. **Set Environment Variables**:
   Add `VITE_NEWS_API_KEY` and `VITE_AI_TOKEN` in the Vercel project settings.
3. **Build Settings**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Deploy**: Vercel will automatically use the `vercel.json` and `api/iss/` directory to set up the production proxies.

---

## 📝 License
MIT License. Created for FOAI Endsem Project.
