export function NewsCard({ article }) {
  const fallbackImg = 'https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=400&q=80';

  return (
    <article className="news-card">
      <div className="news-card-img-wrapper">
        <img
          src={article.urlToImage || fallbackImg}
          alt={article.title}
          className="news-card-img"
          onError={(e) => { e.target.src = fallbackImg; }}
          loading="lazy"
        />
      </div>
      <div className="news-card-body">
        <div className="news-card-meta">
          <span className="news-source">{article.source?.name || 'Unknown'}</span>
          <span className="news-date">
            {article.publishedAt
              ? new Date(article.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'N/A'}
          </span>
        </div>
        <h3 className="news-card-title">{article.title}</h3>
        {article.author && <p className="news-card-author">By {article.author}</p>}
        <p className="news-card-desc">
          {article.description?.slice(0, 120) || 'No description available.'}
          {article.description?.length > 120 ? '...' : ''}
        </p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-read-more"
        >
          Read More →
        </a>
      </div>
    </article>
  );
}
