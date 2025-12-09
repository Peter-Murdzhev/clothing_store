"use client"
import Link from "next/link"
import { useState } from "react"

export default function NavbarItemsCategories() {
    const [isOpen, setOpen] = useState(false);

    return (
        <div>
            <button className="nav_toggle"
                onClick={() => setOpen(!isOpen)}>☰</button>

            <ul className={`nav_list_mobile ${isOpen ? "opened" : ""}`}>
                <li onClick={() => setOpen(false)}><Link href="/">
                    <button className="nav_button">Home</button></Link> </li>

                <li className="nav_item">
                    <button className="nav_button">Women</button>
                    <ul className="dropdown">
                        <li onClick={() => setOpen(false)}>
                            <Link href="/products/women/dresses">Dresses</Link></li>
                        <li onClick={() => setOpen(false)}>
                            <Link href="/products/women/bags">Bags</Link></li>
                        <li onClick={() => setOpen(false)}>
                            <Link href="/products/women/shoes">Shoes</Link></li>
                    </ul>
                </li>

                <li className="nav_item">
                    <button className="nav_button">Men</button>
                    <ul className="dropdown">
                        <li onClick={() => setOpen(false)}>
                            <Link href="/products/men/shirts">Shirts</Link></li>
                        <li onClick={() => setOpen(false)}>
                            <Link href="/products/men/shoes">Shoes</Link></li>
                    </ul>
                </li>

                <li className="nav_item">
                    <button className="nav_button">Accessories</button>
                    <ul className="dropdown">
                        <li onClick={() => setOpen(false)}>
                            <Link href="/products/accessories/jewelery">Jewelery</Link></li>
                        <li onClick={() => setOpen(false)}>
                            <Link href="/products/accessories/womens_watches">Women's watches</Link></li>
                        <li onClick={() => setOpen(false)}>
                            <Link href="/products/accessories/mens_watches">Men's watches</Link></li>
                    </ul>
                </li>
            </ul>

            <ul className="nav_list">
                <li><Link href="/"><button className="nav_button">Home</button></Link> </li>

                <li className="nav_item">
                    <button className="nav_button">Women</button>
                    <ul className="dropdown">
                        <li><Link href="/products/women/dresses">Dresses</Link></li>
                        <li><Link href="/products/women/bags">Bags</Link></li>
                        <li><Link href="/products/women/shoes">Shoes</Link></li>
                    </ul>
                </li>

                <li className="nav_item">
                    <button className="nav_button">Men</button>
                    <ul className="dropdown">
                        <li><Link href="/products/men/shirts">Shirts</Link></li>
                        <li><Link href="/products/men/shoes">Shoes</Link></li>
                    </ul>
                </li>

                <li className="nav_item">
                    <button className="nav_button">Accessories</button>
                    <ul className="dropdown">
                        <li><Link href="/products/accessories/jewelery">Jewelery</Link></li>
                        <li><Link href="/products/accessories/womens_watches">Women's watches</Link></li>
                        <li><Link href="/products/accessories/mens_watches">Men's watches</Link></li>
                    </ul>
                </li>
            </ul>
        </div>

    )
}
