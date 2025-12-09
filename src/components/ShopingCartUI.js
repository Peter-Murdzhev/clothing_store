"use client"
import { useCart } from "@/context/CartContext"
import { FiX } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ShopingCartUI({ user }) {
    const { cart, removeFromCart } = useCart();
    const router = useRouter();

    const handleOrderButton = () => {
        if (!user) {
            toast.info("Login to proceed", {
                theme: "light",
                position: "bottom-center",
                autoClose: 3000,
                isLoading: false,
                closeButton: true
            })

            return;
        }

        router.push("/order_page")
    }

    return (
        <div className="shoping_cart">
            {cart.length == 0 ?
                <h3 style={{
                    gridColumn: "1 / -1", textAlign: "center",
                    marginTop: "50px", color: "rgb(8, 113, 8)"
                }}>
                    No items added</h3> :

                cart.map((product, index) => (
                    <div key={index} className="shoping_cart_item">
                        <FiX className="remove_icon" onClick={() => removeFromCart(product)} />
                        <Link href={`/products/${product.id}`}>
                            <img src={product.images[0]}></img>
                            <p>{product.title}</p>
                            {["dresses", "shirts", "shoes"]
                                .some(value => product.category.includes(value)) ?
                                <p>Size: {product.size}</p> :
                                <p></p>
                            }
                            <p style={{ alignSelf: "flex-end" }}>{product.price}$</p>
                        </Link>
                    </div>
                ))
            }

            {cart.length > 0 && <h3 style={{
                gridColumn: "1 / -1", textAlign: "center",
                marginTop: "20px", color: "rgb(90, 152, 90)"
            }}>
                Total: {cart.reduce((sum, product) => sum + product.price, 0).toFixed(2)}$
            </h3>
            }

            {cart.length > 0 && <button className="purchase_button"
                style={{ gridColumn: "1 / -1", alignSelf: "center" }}
                onClick={handleOrderButton}>Order</button>
            }

        </div>
    )
}
