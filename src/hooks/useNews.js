import { useState, useCallback } from 'react';
import { fetchNews } from '../utils/api';
import { getWithExpiry, setWithExpiry } from '../utils/storage';
import { useDashboard } from '../context/DashboardContext';

const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

export function useNews() {
  const { newsData, updateNews } = useDashboard();
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});

  const loadCategory = useCallback(
    async (category, forceRefresh = false) => {
      const cacheKey = `news-${category}`;

      if (!forceRefresh) {
        const cached = getWithExpiry(cacheKey);
        if (cached) {
          updateNews({
            articles: { ...newsData.articles, [category]: cached },
          });
          return;
        }
      }

      setLoading((prev) => ({ ...prev, [category]: true }));
      setErrors((prev) => ({ ...prev, [category]: null }));

      try {
        const articles = await fetchNews(category);
        setWithExpiry(cacheKey, articles, CACHE_TTL);
        updateNews({
          articles: { ...newsData.articles, [category]: articles },
        });
      } catch (err) {
        setErrors((prev) => ({ ...prev, [category]: err.message }));
      } finally {
        setLoading((prev) => ({ ...prev, [category]: false }));
      }
    },
    [newsData.articles, updateNews]
  );

  const searchArticles = useCallback(
    async (query) => {
      if (!query.trim()) {
        updateNews({ searchResults: [] });
        return;
      }

      setLoading((prev) => ({ ...prev, search: true }));
      setErrors((prev) => ({ ...prev, search: null }));

      try {
        const articles = await fetchNews('general', query);
        updateNews({ searchResults: articles });
      } catch (err) {
        setErrors((prev) => ({ ...prev, search: err.message }));
      } finally {
        setLoading((prev) => ({ ...prev, search: false }));
      }
    },
    [updateNews]
  );

  return {
    articles: newsData.articles,
    searchResults: newsData.searchResults,
    loading,
    errors,
    loadCategory,
    searchArticles,
  };
}
