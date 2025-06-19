import "../Styles/SortMenu.css"

import { useState } from "react"


export default function SortMenu({ onSortChange }) {
  const [sortBy, setSortBy] = useState("created_at")
  const [order, setOrder] = useState("desc")

  const handleSortChange = (e) => {
    const newSortBy = e.target.value
    setSortBy(newSortBy)
    onSortChange(newSortBy, order)
  }

  const handleOrderChange = (e) => {
    const newOrder = e.target.value
    setOrder(newOrder)
    onSortChange(sortBy, newOrder)
  }

  return (
    <div className="sort-menu">
      <label htmlFor="sort-by">Sort by:</label>
      <select id="sort-by" value={sortBy} onChange={handleSortChange}>
        <option value="created_at">Date</option>
        <option value="comment_count">Comment Count</option>
        <option value="votes">Votes</option>
      </select>

      <label htmlFor="order">Order:</label>
      <select id="order" value={order} onChange={handleOrderChange}>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  )
}
