import ProductUI from "@/components/ProductUI";

export default async function page({ params }) {
  const { id } = await params;
  const product = await fetch(`https://dummyjson.com/products/${id}`, {
    cache: "no-store"
  })
    .then(response => response.json())

  return (
    <ProductUI product={product} />
  )
}