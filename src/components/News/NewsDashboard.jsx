import { useEffect, useState, useMemo } from 'react';
import { useNews } from '../../hooks/useNews';
import { NewsCard } from './NewsCard';
import { NewsFilters } from './NewsFilters';
import { Loader, SkeletonCard } from '../UI/Loader';
import { ErrorMessage } from '../UI/ErrorMessage';
import { useToast } from '../UI/Toast';

const CATEGORIES = ['technology', 'science'];

export function NewsDashboard() {
  const { articles, searchResults, loading, errors, loadCategory, searchArticles } = useNews();
  const [activeCategory, setActiveCategory] = useState('technology');
  const [sortBy, setSortBy] = useState('date-desc');
  const toast = useToast();

  useEffect(() => {
    CATEGORIES.forEach((cat) => loadCategory(cat));
  }, []);

  const handleRefresh = (cat) => {
    loadCategory(cat, true);
    toast(`${cat} news refreshed!`, 'success');
  };

  const handleSearch = (query) => {
    if (query.trim()) {
      searchArticles(query);
      toast(`Searching for "${query}"...`, 'info');
    }
  };

  const currentArticles = useMemo(() => {
    let items = searchResults?.length > 0 ? searchResults : articles[activeCategory] || [];

    items = [...items];

    switch (sortBy) {
      case 'date-asc':
        items.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
        break;
      case 'date-desc':
        items.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        break;
      case 'source':
        items.sort((a, b) => (a.source?.name || '').localeCompare(b.source?.name || ''));
        break;
    }

    return items;
  }, [articles, activeCategory, searchResults, sortBy]);

  const isLoading = loading[activeCategory] || loading.search;
  const error = errors[activeCategory] || errors.search;

  return (
    <section id="news" className="section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="section-icon">📰</span>
          News Dashboard
        </h2>
        <button className="btn btn-refresh" onClick={() => handleRefresh(activeCategory)}>
          ↻ Refresh
        </button>
      </div>

      <NewsFilters
        onSearch={handleSearch}
        onSort={setSortBy}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        categories={CATEGORIES}
      />

      {error && <ErrorMessage message={error} onRetry={() => loadCategory(activeCategory, true)} />}

      {isLoading ? (
        <div className="news-grid">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="news-grid">
          {currentArticles.length > 0 ? (
            currentArticles.map((article, i) => (
              <NewsCard key={article.url || i} article={article} />
            ))
          ) : (
            <p className="no-results">No articles found.</p>
          )}
        </div>
      )}
    </section>
  );
}
