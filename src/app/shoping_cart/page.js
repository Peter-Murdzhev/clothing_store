import ShopingCartUI from "@/components/ShopingCartUI";
import { getCurrentUser } from "@/lib/current_user";

export default async function page() {
  const user = await getCurrentUser();

  return (
    <>
      <h1 style={{textAlign: "center", color: "rgb(90, 152, 90)"}}>
        Shoping Cart</h1>
      <ShopingCartUI user={user} />
    </>
  )
}
