"use client"
import { useRouter } from "next/navigation"

export default function SeeOrderButton({orderId}) {
    const router = useRouter();

    return (
        <button onClick={()=>router.push(`/order/${orderId}`)}>See order</button>
    )
}
