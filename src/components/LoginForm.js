"use client"
import { useActionState, useEffect } from "react"
import Link from "next/link";
import { login } from "@/actions/user.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LoginForm({ toggleLogin, setToggleLogin }) {
  const router = useRouter();

  const [state, formAction] = useActionState(login, {
    success: false,
    message: ""
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.message, {
        position: "bottom-center",
        autoClose: 3000,
        closeButton: true,
        isLoading: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light"
      })

      setToggleLogin(false);
      router.push("/user_page")
    }
  }, [state, router])

  return (
    <form action={formAction} className={`login_form ${toggleLogin ? "active" : ""}`}>
      <input type="email" name="email" placeholder="Enter email"
        defaultValue={state?.values?.email || ""}></input>
      <input type="password" name="password"
        placeholder="Enter password"></input>
      {!state.success && <p style={{ color: "rgba(163, 53, 53, 1)", textAlign: "center" }}>{state.message}</p>}
      <Link href={"/register_user"} onClick={() => setToggleLogin(false)}>Click here to create account</Link>
      <button style={{ marginTop: state.message ? "10px" : "20px" }}>Login</button>
    </form>
  )
}
