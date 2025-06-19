import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../utils/api";
import "../Styles/TopicPage.css"

export default function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTopics()
      .then((data) => {
        setTopics(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to load topics.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading topics...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="topics-page">
      <div className="topics-content">
        <h1 className="browse-heading">Browse Topics</h1>
        <div className="topics-list">
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              to={`/topics/${topic.slug}`}
              className="topic-card"
            >
              <h3>{topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}