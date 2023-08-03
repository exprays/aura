// Prevents NextJS hot reloading to cause any problem while initualizing prisma


import { PrismaClient } from  "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;