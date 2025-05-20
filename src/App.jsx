import "./App.css"
import "./Components/Articles.css"
import React, { useEffect, useState } from 'react'



const Api = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://seeding-project-2.onrender.com/api/articles')
      .then(res => res.json())
      .then(data => {
        setArticles(data.articles)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading articles...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <main className="articles-container">
      {articles.map(({ article_id, title, author, created_at, comment_count }) => (
        <article key={article_id} className="article-card">
          <h2>{title}</h2>
          <p><strong>Author:</strong> {author}</p>
          <p><strong>Date:</strong> {new Date(created_at).toLocaleDateString()}</p>
          <p><strong>Comments:</strong> {comment_count}</p>
        </article>
      ))}
    </main>
  );
};

export default Api