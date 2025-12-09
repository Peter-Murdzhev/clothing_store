import ProductCard from "@/components/ProductCard";

export default async function page() {
  const shoes = await fetch("https://dummyjson.com/products/category/mens-shoes")
                 .then(result => result.json())
                 .then(data => data.products);
 
   return (
    <>
     <h1 className="product_type">Men's Shoes</h1>

     <div className="products">
         {shoes.map((shoes,key) => <ProductCard key={shoes.id} product={shoes} />)}
     </div>
    </>
   )
}
