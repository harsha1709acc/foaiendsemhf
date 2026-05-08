import { createContext, useContext, useState, useRef, useCallback } from 'react';

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [issData, setIssData] = useState({
    currentPosition: null,
    positions: [],
    speeds: [],
    speed: 0,
    locationName: 'Fetching...',
    peopleInSpace: null,
  });

  const [newsData, setNewsData] = useState({
    articles: {},
    searchResults: [],
  });

  const updateISS = useCallback((updates) => {
    setIssData((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateNews = useCallback((updates) => {
    setNewsData((prev) => ({ ...prev, ...updates }));
  }, []);

  const getDashboardContext = useCallback(() => {
    const iss = issData;
    const news = newsData;

    let ctx = '=== ISS TRACKING DATA ===\n';
    if (iss.currentPosition) {
      ctx += `Current Position: Latitude ${iss.currentPosition.lat.toFixed(4)}, Longitude ${iss.currentPosition.lon.toFixed(4)}\n`;
      ctx += `Current Speed: ${iss.speed.toFixed(0)} km/h\n`;
      ctx += `Location: ${iss.locationName}\n`;
      ctx += `Positions Tracked: ${iss.positions.length}\n`;
    }
    if (iss.peopleInSpace) {
      ctx += `People in Space: ${iss.peopleInSpace.number}\n`;
      if (iss.peopleInSpace.people) {
        ctx += `Astronauts: ${iss.peopleInSpace.people.map((p) => `${p.name} (${p.craft})`).join(', ')}\n`;
      }
    }

    ctx += '\n=== NEWS DATA ===\n';
    const allArticles = [
      ...(news.articles.technology || []),
      ...(news.articles.science || []),
      ...(news.searchResults || []),
    ];
    ctx += `Total Articles Loaded: ${allArticles.length}\n`;
    allArticles.forEach((a, i) => {
      ctx += `\nArticle ${i + 1}: ${a.title}\n`;
      ctx += `Source: ${a.source?.name || 'Unknown'}\n`;
      ctx += `Date: ${a.publishedAt || 'N/A'}\n`;
      if (a.description) ctx += `Summary: ${a.description}\n`;
    });

    return ctx;
  }, [issData, newsData]);

  return (
    <DashboardContext.Provider
      value={{ issData, newsData, updateISS, updateNews, getDashboardContext }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider');
  return ctx;
}
