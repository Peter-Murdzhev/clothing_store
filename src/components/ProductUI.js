"use client"
import { useEffect, useState } from "react"
import { useCart } from "@/context/CartContext"
import { toast } from "react-toastify"
import SizeSelector from "./SizeSelector"

export default function ProductUI({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
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

  let startX = 0;

  const handleTouchStart = e => {
    startX = e.touches[0].clientX;
  }

  const handleTouchEnd = e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50) {
      //swipe right
      setSelectedImage(prev => (prev + 1) % product.images.length)
    } else if (diff < -50) {
      //swipe left
      setSelectedImage(prev => prev === 0 ? product.images.length-1 : (prev - 1) )
    }
  }

  return (
    <div className="product_page">
      <img src={product.images[selectedImage]}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}></img>
      <div className="thumbnail_photos">
        {product.images.map((image, index) =>
          <img key={index} src={image}
            onClick={() => setSelectedImage(index)}
            className={index === selectedImage ? "selected" : ""}>
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
