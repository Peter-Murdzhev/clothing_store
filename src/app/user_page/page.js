import UserPageWrapper from "@/components/UserPageWrapper"
import UserOrders from "@/components/UserOrders"
import { getCurrentUser } from "@/lib/current_user"
import { redirect } from "next/navigation";

export default async function page() {
  const user = await getCurrentUser();

  if(!user){
    redirect("/")
  }

  return (
    <UserPageWrapper OrdersSection={<UserOrders />} user={user} />
  )
}
