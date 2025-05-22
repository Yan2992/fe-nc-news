import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import ArticlesPage from "./Pages/ArticlesPage"
import SingleArticle from "./Pages/SingleArticlePage"
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
      </Routes>
    </Router>
  )
}

export default App