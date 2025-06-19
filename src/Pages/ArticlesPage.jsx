import { useEffect, useState } from "react";
import { getAllArticles } from "../utils/api";
import { Link, useLocation } from "react-router-dom";
import "../Styles/ArticlesPage.css";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("date");
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    getAllArticles()
      .then((data) => {
        setArticles(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to load articles.");
        setIsLoading(false);
      });
  }, [location.key]);

  if (isLoading) return <p className="loading">Loading articles...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!articles.length) return <p className="no-articles">No articles found</p>;

  const sortedArticles = [...articles].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.created_at) - new Date(a.created_at);
    }
    if (sortBy === "author") {
      return a.author.localeCompare(b.author);
    }
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <section className="articles-container">
      <div className="sort-controls">
        <label htmlFor="sort-select">Sort articles by:</label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date">Date (newest first)</option>
          <option value="author">Author (A-Z)</option>
          <option value="title">Title (A-Z)</option>
        </select>
      </div>

      <div className="articles-grid">
        {sortedArticles.map((article) => (
          <article key={article.article_id} className="article-card">
            <Link to={`/articles/${article.article_id}`}>
              <h3>{article.title}</h3>
            </Link>
            <p><strong>By:</strong> {article.author}</p>
            <p><strong>Votes:</strong> {article.votes}</p>
          </article>
        ))}
      </div>

      <div className="back-button-container">
        <Link to="/home" className="back-button">← Back to Home</Link>
      </div>
    </section>
  );
}
