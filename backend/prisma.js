import { PrismaClient } from "@prisma/client";

const globalPrisma = globalThis;

export const prisma = 
    globalPrisma.prisma ||
    new PrismaClient({
        log:["query","warn","error"]
    }); 

if(process.env.NODE_ENV !== "production") {
        globalPrisma.prisma = prisma;
    }