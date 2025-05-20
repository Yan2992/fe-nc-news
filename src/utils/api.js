import axios from "axios"

const newsApi = axios.create({
  baseURL: "https://seeding-project-2.onrender.com/api",
})

export const getAllArticles = () => {
  return newsApi.get("/articles").then((res) => res.data.articles)
}