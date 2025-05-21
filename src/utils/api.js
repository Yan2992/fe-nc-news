import axios from "axios"

const newsApi = axios.create({
  baseURL: "https://seeding-project-2.onrender.com/api",
})

export const getAllArticles = () => {
  return newsApi.get("/articles")
  .then((res) => res.data.articles)
}

export const getSingleArticle = (article_id) => {
  return newsApi.get(`/articles/${article_id}`)
  .then(({ data }) => {
    return data.article
  })
}

export const getArticleComments = (article_id) => {
  return newsApi.get(`/articles/${article_id}/comments`)
  .then(({ data }) => {
    return data.comments
  })
}
