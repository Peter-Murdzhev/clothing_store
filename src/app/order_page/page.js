"use server"
import { getCurrentUser } from '@/lib/current_user'
import OrderPageUI from '@/components/OrderPageUI';

export default async function page() {
    const user = await getCurrentUser();

    return (
        <OrderPageUI user={user} />
    )
}
