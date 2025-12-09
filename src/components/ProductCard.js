'use client';
import Link from "next/link";

export default function ProductCard({product}) {

  return (
    <div className="product_card">
      <Link href={`/products/${product.id}`}>
        <img src={product.images[0]}></img>
        <p>{product.title}</p>
        <p style={{alignSelf: "flex-end"}}>{product.price}$</p>
      </Link>
        
    </div>
  )
}
