import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import ArticlesPage from "./Pages/ArticlesPage";
import SingleArticlePage from "./Pages/SingleArticlePage";
import TopicsPage from "./Pages/TopicsPage";
import TopicArticlesPage from "./Pages/TopicArticlesPage"; 
import NotFoundPage from "./Pages/NotFoundPage";
import Footer from "./Components/Footer";
import "./App.css";
import './Styles/CommentCard.css';


function App() {
  return (
    <Router>
      <div className="App">
        
        <div className="starfield"></div>
        <div className="glow-blob2"></div>

        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:article_id" element={<SingleArticlePage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/topics/:topic" element={<TopicArticlesPage />} /> 
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

