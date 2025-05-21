import { useEffect, useState } from "react"
import { getSingleArticle } from "../utils/api" 
import { useParams, Link } from "react-router-dom"
import './SingleArticlesPage.css'

export default function SingleArticle() {
    const { article_id } = useParams()
    const [article, setSingleArticle] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

     useEffect(() => {
        getSingleArticle(article_id)
          .then((data) => {
            setSingleArticle(data)
            setIsLoading(false);
          })
          .catch((err) => {
            console.error(err)
            setIsLoading(false)
          })
      }, [article_id])

      if (isLoading || !article) return <p>Loading article...</p>

      return (
        <section className="single-article">
            <Link to="/articles" className="back-link">Back to articles</Link>
            <h2>{article.title}</h2>
            <p>{article.body}</p>
            <p><strong>By: </strong>{article.author}</p>
            <p><strong>Date: {new Date(article.created_at).toLocaleDateString()}</strong></p>
             <div className="article-stats">
             <span>👍 {article.votes} votes</span> | <span>💬 {article.comment_count} comments</span>
            </div>
        </section>
      )
}