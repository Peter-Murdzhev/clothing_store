import ProductCard from "@/components/ProductCard";

export default async function page() {
  const dresses = await fetch("https://dummyjson.com/products/category/womens-dresses")
    .then(result => result.json())
    .then(data => data.products);

  return (
    <>
      <h1 className="product_type">Women's Dresses</h1>

      <div className="products">
        {dresses.map((dress, key) => <ProductCard key={dress.id} product={dress} />)}
      </div>
    </>

  )
}
