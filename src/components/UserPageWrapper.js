"use client"
import LogoutButton from '@/components/LogoutButton'
import { useState } from 'react'
import UserInfo from './UserInfo';

export default function UserPageWrapper({ OrdersSection, user }) {
  const [section, setSection] = useState("orders");

  return (
    <>
      <h2 style={{textAlign:"center", color:"rgb(149, 149, 67)"}}>Welcome, {user.fullname}</h2>
      <div className="user_page_navbar">
        <button className={`user_nav_button ${section === "orders" ? "selected" : ""}`} onClick={() => setSection("orders")}>Orders</button>
        <button className={`user_nav_button ${section === "user_info" ? "selected" : ""}`} onClick={() => setSection("user_info")}>Change user info</button>
        <LogoutButton />
      </div>

      {section === "orders" ? OrdersSection : <UserInfo user={user}/>}
    </>

  )
}
