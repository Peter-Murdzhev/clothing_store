"use client"
import { useActionState, useEffect, useRef } from "react"
import Link from "next/link";
import { login } from "@/actions/user.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FiX } from "react-icons/fi";

export default function LoginForm({ toggleLogin, setToggleLogin }) {
  const router = useRouter();
  const loginRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (loginRef.current && !loginRef.current.contains(e.target)) {
        setToggleLogin(false);
      }
    }

    document.addEventListener("pointerdown", handleClick);
    return () => document.removeEventListener("pointerdown", handleClick)
  }, [])

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
    <form action={formAction} ref={loginRef} className={`login_form ${toggleLogin ? "active" : ""}`}>
      <FiX fontSize={20} className="remove_icon" onClick={() => setToggleLogin(false)} />

      <input type="email" name="email" placeholder="Enter email"
        defaultValue={state?.values?.email || ""}></input>
      <input type="password" name="password"
        placeholder="Enter password"></input>
      {!state.success && <p style={{ color: "rgba(163, 53, 53, 1)", fontSize: "14px", textAlign: "center" }}>{state.message}</p>}
      <Link href={"/register_user"} onClick={() => setToggleLogin(false)}>Click here to create account</Link>
      <button style={{ marginTop: state.message ? "10px" : "20px" }}>Login</button>
    </form>
  )
}
