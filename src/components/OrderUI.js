"use client"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import Link from "next/link"

//This page displays the whole information about a created order
export default function OrderUI({ order, items, user, finishOrderFunction }) {
    const router = useRouter();

    return (
        <div className="current_order">
            <div className="order_info">
                <h2>Order info</h2>
                <ul>
                    <li>Order created: {format(order.createdAt, "dd-MM-yyyy HH:mm")}</li>
                    <li>Order number: {order.id}</li>
                    <li>Total price: {order.totalPrice}$</li>
                    <li>Status: <span style={{
                        color: order.status === "CREATED" ?
                            "rgba(202, 20, 20, 1)" : "rgba(60, 108, 67, 1)"
                    }}>{order.status}</span></li>
                </ul>
            </div>

            <div className="customer_info">
                <h2>Customer info</h2>
                <ul>
                    <li>Fullname: {order.customerName}</li>
                    <li>Phone Number: {order.phoneNumber}</li>
                    <li>Shipping address: {order.address}</li>
                </ul>
            </div>

            <h2 style={{ marginTop: "50px", color: "rgb(90, 152, 90)" }}>Purchased products</h2>
            <div className="products">
                {items.map((product, index) => (
                    <div key={index} className="shoping_cart_item">
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
                ))}
            </div>

            <div className="order_actions">
                <button onClick={() => router.back()}>Back to orders</button>
                {user.role === "ADMIN" && order.status === "CREATED" && <button
                    onClick={async () => {
                        if (window.confirm("Do you want to set the order as SENT?")) {
                            await finishOrderFunction(order.id);
                            router.refresh();
                        }
                    }
                    }>Set order finished</button>}
            </div>
        </div>
    )
}
