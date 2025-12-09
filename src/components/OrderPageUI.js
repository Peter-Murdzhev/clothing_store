"use client"
import { createOrder } from '@/actions/order.actions';
import { useCart, clearCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

//this displays the order form
export default function OrderPageUI({ user }) {
    const { cart, clearCart } = useCart();
    const router = useRouter();
    const [state, formAction] = useActionState(createOrder, {
        success: false,
        message: ""
    });

    const [formValues, setFormValues] = useState({
        fullname: "",
        address: "",
        phoneNumber: ""
    })

    let totalPrice = parseFloat(
        cart.reduce((sum, product) => sum + product.price, 0).toFixed(2)
    );

    const [hasLoaded, setHasLoaded] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormValues(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        const values = sessionStorage.getItem("form_values");
        if (values) {
            setFormValues(JSON.parse(values));
        }

        setHasLoaded(true);
    }, [])

    useEffect(() => {
        if (!hasLoaded) {
            return;
        }

        sessionStorage.setItem("form_values", JSON.stringify(formValues));
    }, [formValues, hasLoaded])

    useEffect(() => {
        if (!user) {
            toast.info("Login to proceed", {
                theme: "light",
                position: "bottom-center",
                autoClose: 3000,
                isLoading: false,
                closeButton: true
            })
            router.replace("/shoping_cart");
        }

        if (!cart || cart.length < 1) {
            router.replace("/shoping_cart");
        }
    }, [])

    useEffect(() => {
        if (state.success) {
            toast.success(state.message, {
                theme: "light",
                position: "bottom-center",
                autoClose: 3000,
                isLoading: false,
                closeButton: true
            })

            setTimeout(() => {
                clearCart();
                setFormValues({
                    fullname: "",
                    address: "",
                    phoneNumber: ""
                })
                router.replace("/")
            }, 2000);
        }
    }, [state])

    return (
        <div className="register_user_page">
            <h2>Finish order</h2>

            <form action={formAction} className="order_page_form">
                <input type="text" name="fullname" value={formValues.fullname}
                    onChange={handleInputChange} placeholder="Input your fullname"></input>
                <input type="text" name="address" value={formValues.address}
                    onChange={handleInputChange} placeholder="Input your delivery address"></input>
                <input type="text" name="phoneNumber" value={formValues.phoneNumber}
                    onChange={handleInputChange} placeholder="Input your phone number"></input>
                <input type="hidden" name="cart" value={JSON.stringify(cart)}></input>
                <input type="hidden" name="totalPrice" 
                value={totalPrice > 200 ? totalPrice : totalPrice + 10}></input>

                <span>Order price: {totalPrice}$</span>
                <span>- Pay on delivery: If the price is under 200$ the shipment price is 10$.</span>
                <span>Total: {parseFloat(totalPrice > 200 ? totalPrice : totalPrice + 10)
                                                                    .toFixed(2)}$</span>
                <div>
                    {state.message && !state.success &&
                     <p style={{color:"red", textAlign:"center"}}>{state.message}</p>}
                    <button type="button" style={{ marginRight: "20px" }} onClick={() => router.replace("/shoping_cart")}>Back to cart</button>
                    <button type="submit">Finish order</button>
                </div>
            </form>
        </div>
    )
}
