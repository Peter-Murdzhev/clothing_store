import ProductCard from "@/components/ProductCard";

export default async function page() {
  const shirts = await fetch("https://dummyjson.com/products/category/mens-shirts")
                 .then(result => result.json())
                 .then(data => data.products);
 
   return (
    <>
     <h1 className="product_type"> Men's Shirts</h1>

     <div className="products">
         {shirts.map((shirt,key) => <ProductCard key={shirt.id} product={shirt} />)}
     </div>
    </>
   )
}
