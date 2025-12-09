import Link from "next/link"

export default function Footer() {
  return (
    <div className="footer">
        <ul>
            <li><Link href="/about_me">About me</Link></li>
        </ul>
    </div>
  )
}
