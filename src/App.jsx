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

export default App;








// optimistically render voting when it comes to working on voting 
// the vote should update by one. not by 2 not by 50, just by one. Use optimistic rendering. The response to the api is sent, but we're not waiting for a response back. Do not initialise state with a prop. Vte value should start at 0. 

// Posting a comment is a pain: If you optimistically render a comment (just don't). 