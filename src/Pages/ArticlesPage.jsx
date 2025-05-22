import { useEffect, useState } from "react"
import { getAllArticles } from "../utils/api"
import { Link, useLocation } from "react-router-dom"
import './Articles.css'

export default function ArticlesPage() {
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const location = useLocation()

  useEffect(() => {
    setIsLoading(true)
    getAllArticles()
      .then((data) => {
        setArticles(data)
        setIsLoading(false)
      })
      .catch((err) => {
        setError("Failed to load articles.")
        setIsLoading(false)
      })
  }, [location.key])

  if (isLoading) return <p>Loading articles...</p>
  if (!articles.length) return <p>No articles found</p>

  return (
    <section className="articles-container">
      {articles.map((article) => (
        <article key={article.article_id} className="article-card">
          <Link to={`/articles/${article.article_id}`}>
            <h3>{article.title}</h3>
          </Link>
          <p><strong>By:</strong> {article.author}</p>
          <p><strong>Votes:</strong> {article.votes}</p>
        </article>
      ))}
      <Link to="/home" className="back-link">Back to Home</Link>
    </section>
    
  )
}