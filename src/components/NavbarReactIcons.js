"use client"
import { FiUser, FiShoppingCart } from 'react-icons/fi';
import { useState } from 'react';
import LoginForm from './LoginForm';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';


export default function NavbarReactIcons({user}) {
  const [toggleLogin, setToggleLogin] = useState(false);
  const router = useRouter();
  const { cart } = useCart();
  

  const toggleUserIcon = () =>{
      if(!user){
        setToggleLogin(!toggleLogin)
      }else{
        router.push("/user_page")
      }
  }

  return (
    <div className="react_icons">
      <FiUser className="icon" onClick={toggleUserIcon} />
      <LoginForm toggleLogin={toggleLogin} setToggleLogin={setToggleLogin} />

      <div className="shoping_cart_icon">
        <FiShoppingCart className="icon" onClick={() => { router.push("/shoping_cart") }} />
        {cart.length > 0 && <span className="cart_count">{cart.length}</span>}
      </div>
    </div>
  );
}