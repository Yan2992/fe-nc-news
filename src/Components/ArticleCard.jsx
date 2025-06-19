import { Link } from "react-router-dom";
import "../Styles/ArticleCard.css"


export default function ArticleCard({ article }) {
  const formattedDate = new Date(article.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article>
      <h2>
        <Link to={`/articles/${article.article_id}`}>
          {article.title}
        </Link>
      </h2>
      <p>{article.topic}</p>
      <p>By {article.author}</p>
      <p>{formattedDate}</p>
    </article>
  );
}
