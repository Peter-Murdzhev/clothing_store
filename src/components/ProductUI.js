"use client"
import { useEffect, useState } from "react"
import { useCart } from "@/context/CartContext"
import { toast } from "react-toastify"
import SizeSelector from "./SizeSelector"

export default function ProductUI({ product }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0])
  const [selectedSize, setSelectedSize] = useState("");
  const { addToCart } = useCart();

  const [productInfo, setProductInfo] = useState({
    id: product.id,
    images: product.images,
    title: product.title,
    price: product.price,
    category: product.category,
    size: selectedSize
  })

  useEffect(() => {
    setProductInfo(prev => ({
      ...prev,
      size: selectedSize
    }))
  }, [selectedSize])

  const handlePurchaseButton = () => {
    if (["dresses", "shirts", "shoes"].some(value => product.category.includes(value)) &&
        selectedSize === "") {
      toast.info("Please choose a size.", {
        position: "top-center",
        autoClose: 3000,
        closeButton: true,
        isLoading: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light"
      })

      return;
    }

    addToCart(productInfo);

    toast.success("Product successfully added to Cart", {
      position: "top-center",
      autoClose: 3000,
      closeButton: true,
      isLoading: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light"
    })
  }

  return (
    <div className="product_page">
      <img src={selectedImage}></img>
      <div className="thumbnail_photos">
        {product.images.map((image, index) =>
          <img key={index} src={image}
            onClick={() => setSelectedImage(image)}
            className={image === selectedImage ? "selected" : ""}>
          </img>)}
      </div>
      <h2>{product.title}</h2>

      <SizeSelector product={product} selectedSize={selectedSize}
        setSelectedSize={setSelectedSize} />

      <div style={{ display: "flex", gap: "80px" }}>
        <p style={{ color: product.availabilityStatus === "In Stock" ? "green" : "red" }}>
          {product.availabilityStatus}</p>
        <p>Price: {product.price}$</p>
      </div>

      <p className="product_description">{product.description}</p>
      <button className="purchase_button" onClick={handlePurchaseButton}
        disabled={product.availabilityStatus === "Out of Stock"}
        style={{
          opacity: product.availabilityStatus === "Out of Stock"
            ? 0.2 : 1
        }}>Buy</button>
    </div>
  )
}
