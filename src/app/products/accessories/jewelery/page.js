import ProductCard from "@/components/ProductCard";

export default async function page() {
  const jewellery = await fetch("https://dummyjson.com/products/category/womens-jewellery")
                 .then(result => result.json())
                 .then(data => data.products);
 
   return (
    <>
     <h1 className="product_type">Women's Jewellery</h1>

     <div className="products">
         {jewellery.map((jewel,key) => <ProductCard key={jewel.id} product={jewel} />)}
     </div>
    </>
   )
}
