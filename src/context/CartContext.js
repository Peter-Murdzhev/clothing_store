"use client"
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(undefined);

export const CartProvider = ({children}) =>{
    const [cart, setCart] = useState([]);

    useEffect(() =>{
        const savedCart = sessionStorage.getItem("cart");
        if(savedCart){
            setCart(JSON.parse(savedCart));
        }
    },[])
    
    useEffect(() =>{
        sessionStorage.setItem("cart", JSON.stringify(cart));
    },[cart])

    const addToCart = (product) =>{
        setCart(prev => [...prev, product]);
    }

    const removeFromCart = (product) =>{
        setCart(prev => prev.filter(item => item.id !== product.id));
    }

    const clearCart = () =>{
        setCart([]);
    }

    return(
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = ()=>{
    const context = useContext(CartContext);
    if(!context){
        throw new Error("useCart must be used within CartProvider")
    }

    return context;
}
