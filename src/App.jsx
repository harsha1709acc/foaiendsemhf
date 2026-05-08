import { ThemeProvider } from './context/ThemeContext';
import { DashboardProvider } from './context/DashboardContext';
import { ToastProvider } from './components/UI/Toast';
import { Header } from './components/Header/Header';
import { ISSTracker } from './components/ISS/ISSTracker';
import { NewsDashboard } from './components/News/NewsDashboard';
import { SpeedChart } from './components/Charts/SpeedChart';
import { NewsChart } from './components/Charts/NewsChart';
import { ChatBot } from './components/Chatbot/ChatBot';

function App() {
  return (
    <ThemeProvider>
      <DashboardProvider>
        <ToastProvider>
          <div className="app">
            <Header />
            <main className="main-content">
              <ISSTracker />
              <NewsDashboard />
              <section id="charts" className="section">
                <div className="section-header">
                  <h2 className="section-title">
                    <span className="section-icon">📊</span>
                    Data Visualization
                  </h2>
                </div>
                <div className="charts-grid">
                  <SpeedChart />
                  <NewsChart />
                </div>
              </section>
            </main>
            <footer className="footer">
              <p>ISS & News Dashboard &copy; {new Date().getFullYear()} | Data from open-notify.org & NewsAPI</p>
            </footer>
            <ChatBot />
          </div>
        </ToastProvider>
      </DashboardProvider>
    </ThemeProvider>
  );
}

export default App;
