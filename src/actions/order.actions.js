"use server"
import { prisma } from "@/db/prisma"
import { getCurrentUser } from "@/lib/current_user"
import { format } from "date-fns"

export async function createOrder(prevState, formData) {
    const user = await getCurrentUser();
    const fullname = formData.get("fullname");
    const address = formData.get("address");
    const phoneNumber = formData.get("phoneNumber");
    const cart = JSON.parse(formData.get("cart"));
    const totalPrice = parseFloat(formData.get("totalPrice")).toFixed(2);

    if (!fullname || !address || !phoneNumber) {
        return {
            success: false,
            message: "All fields are required!"
        }
    }

    try {
        await prisma.order.create({
            data: {
                userId: user.id,
                customerName: fullname,
                address,
                phoneNumber,
                totalPrice,
                orderItems: {
                    create: cart.map(item => ({
                        productId: item.id,
                        size: item?.size
                    }))
                }
            }
        })

        return {
            success: true,
            message: "Order created successfully!"
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
}

export async function getOrder(orderId) {
    return await prisma.order.findUnique({
        where: { id: Number(orderId) }
    })
}

export async function getAllOrders() {
    try {
        const orders = await prisma.order.findMany();

        const ordersFormatted = orders.map(order => ({
            ...order,
            createdAt: format(order.createdAt, "dd-MM-yyyy HH:mm")
        }))

        return ordersFormatted;
    } catch (error) {
        console.log(error);
    }
}

export async function getOrdersByUser(userId) {
    try {
        const orders = await prisma.order.findMany({
            where: { userId }
        });

        const ordersFormatted = orders.map(order => ({
            ...order,
            createdAt: format(order.createdAt, "dd-MM-yyyy HH:mm")
        }))

        return ordersFormatted;
    } catch (error) {
        console.log("Error fetching orders by user " + error);
    }
}

export async function extractProductsFromOrder(order) {
    try {
        const products = await prisma.orderItem.findMany({
            where: {
                orderId: order.id
            }
        })

        return products;
    } catch (error) {
        console.log("error fetching products")
    }
}

export async function setOrderCompleted(orderId) {
    await prisma.order.update({
        where: { id: orderId },
        data: {
            status: "SENT"
        }
    })
}
