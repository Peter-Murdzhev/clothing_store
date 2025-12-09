
import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="header">
      <Link href={"/"}>
        <img src="/header_img.jpg"></img>
      </Link>

        <div className="header_title">
            <h1>Velvetaire</h1>
            <h2>Clothes for everyone</h2>
        </div>
        
    </header>
  )
}
