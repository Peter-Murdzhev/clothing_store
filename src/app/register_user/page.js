"use client"
import { useActionState, useEffect } from "react"
import { createUser } from "@/actions/user.actions";
import { toast } from 'react-toastify'
import { useRouter } from "next/navigation";

export default function page() {
    const router = useRouter();

    const [state, formAction] = useActionState(createUser, {
        success: false,
        message: ""
    });

    useEffect(() => {
        if (state.success) {
            toast.success(state.message, {
                position: "bottom-center",
                autoClose: 5000,
                closeButton: true,
                isLoading: false,
                pauseOnHover: true,
                draggable: true,
                theme: "light"
        })

        setTimeout(() => router.back(),5000)
    }
    }, [state.success])

    return (
        <div className="register_user_page">
            <h2>Registration form</h2>

            <form action={formAction}>
                <input type="text" name="fullname" defaultValue={state?.values?.fullname || ""}
                    placeholder="Input your fullname"></input>
                <input type="password" hidden={true}></input>
                <input type="email" name="email" defaultValue={state?.values?.email || ""}
                    placeholder="Input your email"></input>
                <input type="password" name="password"
                    placeholder="Input your password"></input>
                <input type="password" name="repeatPassword"
                    placeholder="Repeat your password"></input>

                {state.message && !state.success && (
                    <p style={{ color: "white" }}>{state.message}</p>
                )}

                <button>Register</button>
            </form>
        </div>
    )
}
