import { getOrder, extractProductsFromOrder, setOrderCompleted } from "@/actions/order.actions"
import OrderUI from "@/components/OrderUI"
import { getCurrentUser } from "@/lib/current_user";

export default async function page({ params }) {
    const { id } = await params;
    const order = await getOrder(id);
    const orderItemsEntity = await extractProductsFromOrder(order);
    const user = await getCurrentUser();

    const items = await Promise.all(orderItemsEntity.map(
        async item => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${item.productId}`);
                const product = await response.json();

                return {
                    ...product,
                    size: item.size,
                }
            } catch (error) {
                console.log(error);
                return null;
            }

        })
    )

    //this is required because Client Components cannot receive non-serializable data,
    //and Prisma’s Decimal type is NOT serializable.
    const fixedOrder = {
        ...order,
        totalPrice: order.totalPrice.toNumber(),
        createdAt: order.createdAt.toISOString(),
    }

    return (
        <OrderUI order={fixedOrder} items={items} user={user} finishOrderFunction={setOrderCompleted} />
    )
}
