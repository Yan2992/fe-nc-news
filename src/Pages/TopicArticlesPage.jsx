import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ArticleCard from "../Components/ArticleCard";
import { getArticlesByTopic } from "../utils/api";
import "../Styles/TopicArticlesPage.css";

export default function TopicArticlesPage() {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getArticlesByTopic(topic)
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [topic]);

  return (
    <section className="topic-articles-page">
      <div className="topic-articles-wrapper">
        <h2 className="topic-articles-heading">Articles on topic: {topic}</h2>

        {loading || error ? (
          <p className={`status-message ${error ? "error" : ""}`}>
            {error ? `Error loading articles: ${error}` : "Loading articles..."}
          </p>
        ) : articles.length === 0 ? (
          <p className="status-message">No articles found.</p>
        ) : (
          <div className="topic-articles-grid">
            {articles.map((article) => (
              <ArticleCard key={article.article_id} article={article} />
            ))}
          </div>
        )}
        <button
          className="back-button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          ← Back
        </button>
      </div>
    </section>
  );
}
