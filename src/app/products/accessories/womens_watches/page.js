import ProductCard from "@/components/ProductCard";

export default async function page() {
  const watches = await fetch("https://dummyjson.com/products/category/womens-watches")
                 .then(result => result.json())
                 .then(data => data.products);
 
   return (
    <>
     <h1 className="product_type">Women's Watches</h1>

     <div className="products">
         {watches.map((watch,key) => <ProductCard key={watch.id} product={watch} />)}
     </div>
    </>
   )
}
