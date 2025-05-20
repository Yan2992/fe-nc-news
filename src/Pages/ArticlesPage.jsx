import { useEffect, useState } from "react"
import ArticleCard from "../Components/ArticleCard"
import { getAllArticles } from "../utils/api" 

export default function ArticlesPage() {
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getAllArticles()
      .then((articlesData) => {
        setArticles(articlesData)
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading articles...</p>

  return (
    <section>
      <h2>All Articles</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.article_id}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </section>
  )
}
