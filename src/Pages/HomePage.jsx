import { Link } from "react-router-dom"

export default function HomePage() {
    return (
        <section>
        <h1>Welcome to NC NEWS  📰</h1>
        <p>Your one stop place for the latest news articles and community discussions.</p>
        <Link to="/articles" className="enter-link">Browse Articles</Link>
        </section>
    )
}