import { PrismaClient } from "@/generated/prisma";

/*This is done to ensure we only use one instance of Prisma */
const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if(process.env.NODE_ENV !== "production"){
    globalForPrisma.prisma = prisma;
}