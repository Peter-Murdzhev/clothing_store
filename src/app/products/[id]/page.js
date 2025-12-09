import ProductUI from "@/components/ProductUI";

export default async function page({params}) {
  const {id} = await params;
  const product = await fetch(`https://dummyjson.com/products/${id}`)
            .then(response => response.json())
            .then(data => data);

  return (
    <ProductUI product={product}/>
  )
}