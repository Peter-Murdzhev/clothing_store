import { verifyAuthToken, getAuthCookie } from "./auth";
import { prisma } from "@/db/prisma";

export async function getCurrentUser() {
    try {
        const token = await getAuthCookie();

        if (!token) {
            return null;
        }

        const payload = await verifyAuthToken(token);

        if(!payload?.userId){
            return null;
        }

        const user = await prisma.user.findUnique({
            where: {id : payload.userId},
            select: {
                id: true,
                fullname: true,
                email: true,
                role: true
            }
        });

        return user;
    } catch (error) {
        throw new Error("get auth cookie failed")
    }
}