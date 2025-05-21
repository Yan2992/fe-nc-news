
export default function ArticleCard({ article }) {
  return (
    <article>
      <h3>{article.title}</h3>
      <p>By {article.author}</p>
      <p>{article.created_at}</p>
      <p>{article.votes} votes | {article.comment_count} comments</p>
    </article>
  )
}