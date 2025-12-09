"use client"

import { useActionState, useEffect } from "react"
import { changeUserInfo } from "@/actions/user.actions";
import { useRouter } from "next/navigation";

export default function UserInfo({user}) {
  const router = useRouter();
  const [state, formAction] = useActionState(changeUserInfo, {
    success: false,
    message: ""
  });

  useEffect(()=>{
    if(state.success){
      router.refresh();
    }
  },[state])

  return (
    <div className="register_user_page">
      <form action={formAction}>
        <input type="text" name="fullname" defaultValue={user.fullname} placeholder="Input your fullname"></input>
        <input type="password" name="oldPassword" placeholder="Input your old password"></input>
        <input type="password" name="newPassword" placeholder="Input your new password"></input>
        <input type="password" name="repeatPassword" placeholder="Repeat your new password"></input>
        {state?.message && <p style={{ color: "white" }}>{state.message}</p>}
        <button>Change info</button>
      </form>
    </div>
  )
}
