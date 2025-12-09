import ProductCard from "@/components/ProductCard";

export default async function page() {
  const shoes = await fetch("https://dummyjson.com/products/category/womens-shoes")
                 .then(result => result.json())
                 .then(data => data.products);
 
   return (
    <>
     <h1 className="product_type">Women's Shoes</h1>

     <div className="products">
         {shoes.map((shoe,key) => <ProductCard key={shoe.id} product={shoe} />)}
     </div>
    </>
   )
}
