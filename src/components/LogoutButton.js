"use client"
import { useRouter } from "next/navigation"
import { logoutUser } from "@/actions/user.actions"
import { toast } from "react-toastify"


export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logoutUser();

            toast.success("Logged out successfully", {
                theme: "light",
                position: "bottom-center",
                autoClose: 3000,
                isLoading: false,
                closeButton: true
            });

            router.push("/")
        } catch (error) {
            toast.error("Logout failed", {
                theme: "light",
                position: "bottom-center",
                autoClose: 3000,
                isLoading: false,
                closeButton: true
            })
        }
    }

    return (
        <button onClick={handleLogout} className="user_nav_button">Logout</button>
    )
}
