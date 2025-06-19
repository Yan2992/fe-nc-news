import "..Styles/CommentForm.css";

export default function CommentForm({
  author,
  body,
  onAuthorChange,
  onBodyChange,
  onSubmit,
  isSubmitting,
  feedbackMessage,
}) {
  return (
    <form onSubmit={onSubmit} className="comment-form">
      <h4>Leave a Comment</h4>
      <input
        type="text"
        placeholder="Your name"
        value={author}
        onChange={onAuthorChange}
        disabled={isSubmitting}
      />
      <textarea
        placeholder="Your comment"
        value={body}
        onChange={onBodyChange}
        disabled={isSubmitting}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Posting..." : "Post Comment"}
      </button>
      {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}
    </form>
  );
}
