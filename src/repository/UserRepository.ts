import { prisma } from "../tools/Constantes";
import { User } from "@prisma/client";

export async function validateUser(email: string, password: string): Promise<User> {
    const user = await prisma.user.findFirst({
        where: {
            email: email,
            password: password,
        }
    });
    if (!user) {
        throw new CustomError("User not found");
    }
    return user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findFirst({
        where: {
            email: email,
        }
    });
}

export async function repositoryRegister(email: string, password: string): Promise<void> {
    await prisma.user.create({
        data: { email: email, password: password, emailsSent: 0 },
    });
}