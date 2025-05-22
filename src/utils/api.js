import axios from "axios"

const newsApi = axios.create({
  baseURL: "https://seeding-project-2.onrender.com/api",
})

const localApi = axios.create({
  baseURL: "http://localhost:9090/api"
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

export const updateArticleVotes = (article_id, voteChange) => {
  return localApi.patch(`/articles/${article_id}`, {inc_votes: voteChange})
    .then((res) => res.data.article)
}

export const postNewComment = (article_id, { author, body }) => {
  return newsApi.post(`/articles/${article_id}/comments`, {username: author, body,}).then((res) => res.data.comment)
}
