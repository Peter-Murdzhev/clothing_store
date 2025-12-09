"use server"
import { extractProductsFromOrder } from '@/actions/order.actions'
import SeeOrderButton from './SeeOrderButton';

export default async function OrderCard({ order }) {
  const productEntities = await extractProductsFromOrder(order);

  const products = await Promise.all(
    productEntities.map(prod => (fetch(`https://dummyjson.com/products/${prod.productId}`)
      .then(response => response.json()))));

  return (
    <div className="order_card">
      <ul>
        {products.map(prod => (<img key={prod.id} src={prod.images[0]}
          style={{ width: "70px", marginBottom: "30px" }} />))}
        <li>Order number: {order.id}</li>
        <li>Created at: {order.createdAt}</li>
        <li>Total Sum: {order.totalPrice.toString()}$</li>
        <li>Status: <span style={{
          color: order.status === "CREATED" ?
            "rgba(202, 20, 20, 1)" : "rgba(60, 108, 67, 1)"
        }}>{order.status}</span></li>
        <SeeOrderButton orderId={order.id} />
      </ul>
    </div>
  )
}
