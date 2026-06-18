import React from 'react'

export default function ProductCard({product}) {
  return (
    <div>
        <h1>{product.title}</h1>

        <p>{product.category}</p>

        <p>{product.price}</p>
    </div>
  )
}
