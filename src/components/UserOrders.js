"use server"
import { getAllOrders, getOrdersByUser } from '@/actions/order.actions'
import { getCurrentUser } from '@/lib/current_user'
import OrderCard from './OrderCard';

export default async function UserOrders() {
  const user = await getCurrentUser();
  const orders = user.role === "ADMIN" ? await getAllOrders() : await getOrdersByUser(user?.id);

  return (
    <div className="user_orders">
      {orders.length == 0 ? <p>No orders yet</p> :
        orders?.map(order => (<OrderCard key={order.id} order={order} />))
      }
    </div>
  )
}
