import "../Styles/CommentList.css";

import CommentCard from "./CommentCard"

export default function CommentList({ comments, onDelete, isDeleting, currentUser }) {
  if (!comments || comments.length === 0) {
    return <p>No comments yet.</p>
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentCard
          key={comment.comment_id}
          comment={comment}
          onDelete={onDelete}
          isDeleting={isDeleting}
          isOwnComment={comment.author === currentUser}
        />
      ))}
    </div>
  )
}
