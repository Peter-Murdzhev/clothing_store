import ProductCard from "@/components/ProductCard";


export default async function page() {
  const bags = await fetch("https://dummyjson.com/products/category/womens-bags")
                 .then(result => result.json())
                 .then(data => data.products);
 
   return (
    <>
     <h1 className="product_type">Women's Bags</h1>

     <div className="products">
         {bags.map((bag,key) => <ProductCard key={bag.id} product={bag} />)}
     </div>
    </>
   )
}
