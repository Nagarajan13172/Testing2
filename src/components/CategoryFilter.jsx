import React from 'react'

export default function CategoryFilter({category, setCategory}) {
  return (
    <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>

        <option value="beauty">Beauty</option>

        <option value="furniture">Furniture</option>

        <option value="groceries">Groceries</option>

    </select>
  )
}
