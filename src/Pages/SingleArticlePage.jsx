import { useEffect, useState } from "react"
import { getSingleArticle, getArticleComments } from "../utils/api" 
import { useParams, Link } from "react-router-dom"
import './SingleArticlesPage.css'

export default function SingleArticle() {
    const { article_id } = useParams()
    const [article, setSingleArticle] = useState(null)
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)

     useEffect(() => {
        setIsLoading(true)

        Promise.all([
        getSingleArticle(article_id),
        getArticleComments(article_id)
        ])
          .then(([articleData, commentsData]) => {
            setSingleArticle(articleData)
            setComments(commentsData)
            setIsLoading(false)
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
            <section className="comments-section">
                
                <h3>Comments ({comments.length})</h3>
                {comments.length === 0 && <p>No comments yet.</p>}
                {comments.map(comment=> (
                    <div key={comment.comment_id}>
                        <p><strong>{comment.author}</strong> said:</p>
                        <p>{comment.body}</p>
                        <p><em>{new Date(comment.created_at).toLocaleDateString()}</em></p>
                    </div>
                ))}
            </section> 
        </section>
      )
}