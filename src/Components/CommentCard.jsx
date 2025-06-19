import '../Styles/CommentCard.css'

export default function CommentCard({ comment, onDelete, isDeleting, isOwnComment }) {
  const authorInitial = comment.author.charAt(0).toUpperCase();

  return (
    <div className="comment-card">
      <div className="comment-header">
        <div className="author">
          <span className="avatar">{authorInitial}</span>
          <strong>{comment.author}</strong>
        </div>
        <time className="timestamp" dateTime={comment.created_at}>
          {new Date(comment.created_at).toLocaleString()}
        </time>
      </div>
      <div className="comment-body">{comment.body}</div>
      {isOwnComment && (
        <div className="comment-actions">
          <button onClick={() => onDelete(comment.comment_id)} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
    </div>
  );
}
