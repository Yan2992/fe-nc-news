import { useEffect, useState } from "react"
import { getSingleArticle, getArticleComments, updateArticleVotes, postNewComment, deleteComment } from "../utils/api" 
import { useParams, Link } from "react-router-dom"
import './SingleArticlesPage.css'

export default function SingleArticle() {
  const { article_id } = useParams()
  const [article, setSingleArticle] = useState(null)
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [newCommentAuthor, setNewCommentAuthor] = useState("")
  const [newCommentBody, setNewCommentBody] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    Promise.all([
      getSingleArticle(article_id),
      getArticleComments(article_id)
    ])
    .then(([articleData, commentsData]) => {
      const votedArticles = JSON.parse(localStorage.getItem('votedArticles') || '{}')
      const localVote = votedArticles[article_id] || 0

      setSingleArticle({...articleData, votes: articleData.votes + localVote})
      setHasVoted(localVote !== 0)
      setComments(commentsData)
      setIsLoading(false)
    })
    .catch((err) => {
      console.error(err)
      setIsLoading(false)
    })
  }, [article_id])

  const handleVote = (voteChange) => {
    if (hasVoted) return setError(null)

    setSingleArticle((currentArticle) => ({...currentArticle, votes: currentArticle.votes + voteChange}))

    updateArticleVotes(article_id, voteChange)
      .then(() => {
        setHasVoted(true)
        const votedArticles = JSON.parse(localStorage.getItem('votedArticles') || '{}')
        votedArticles[article_id] = voteChange
        localStorage.setItem('votedArticles', JSON.stringify(votedArticles))
      })
      .catch(() => {
        setSingleArticle((currentArticle) => ({...currentArticle, votes: currentArticle.votes - voteChange}))
        setError("Failed to update vote. Please try again...")
      })
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()

    if (!newCommentAuthor.trim() || !newCommentBody.trim()) {
      setFeedbackMessage("Please fill out both name and comment.")
      return
    }

    setIsSubmitting(true)
    setFeedbackMessage("")

    postNewComment(article_id, {
      author: newCommentAuthor,
      body: newCommentBody,
    })
      .then((comment) => {
        setComments((currentComments) => [comment, ...currentComments])
        setNewCommentAuthor("")
        setNewCommentBody("")
        setFeedbackMessage("Comment posted successfully!")
      })
      .catch((err) => {
        setFeedbackMessage("Failed to post comment. Please try again.")
        console.error(err)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const handleDeleteComment = (comment_id) => {
  setIsDeleting(true)
  deleteComment(comment_id)
    .then(() => {
      setComments((currentComments) =>
        currentComments.filter((comment) => comment.comment_id !== comment_id)
      )
      setFeedbackMessage("Comment deleted successfully.")
    })
    .catch((err) => {
      console.error(err)
      setFeedbackMessage("Failed to delete comment.")
    })
    .finally(() => {
      setIsDeleting(false)
    })
}

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

      <div className="vote-buttons">
        <button onClick={() => handleVote(1)} disabled={hasVoted}>Vote</button>
        <button onClick={() => handleVote(-1)} disabled={hasVoted}>Unvote</button>
      </div>

      {hasVoted && <p className="vote-info">You've already voted on this article.</p>}
      {error && <p className="error-message">{error}</p>}

      <section className="comments-section">
        <h3>Comments ({comments.length})</h3>
        {comments.length === 0 && <p>No comments yet.</p>}
        {comments.map(comment => (
          <div key={comment.comment_id}>
            <p><strong>{comment.author}</strong> said:</p>
            <p>{comment.body}</p>
            <p><em>{new Date(comment.created_at).toLocaleDateString()}</em></p>
            {comment.author === newCommentAuthor && (<button onClick={() => handleDeleteComment(comment.comment_id)} disabled={isDeleting}>Delete</button>)}
          </div>
        ))}

        <form onSubmit={handleSubmitComment} className="comment-form">
          <label htmlFor="author">Name:</label><br />
          <input id="author" type="text" value={newCommentAuthor} onChange={(e) => setNewCommentAuthor(e.target.value)} required />
          <br />
          <label htmlFor="body">Comment:</label><br />
          <textarea id="body" value={newCommentBody} onChange={(e) => setNewCommentBody(e.target.value)} required />
          <br />
          <button type="submit" disabled={isSubmitting}>Post Comment</button>
        </form>
        {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}
      </section>
    </section>
  )
}