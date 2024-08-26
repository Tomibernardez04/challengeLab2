import {prisma} from "../tools/Constantes";
import {User} from "@prisma/client";

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

export async function getIdByEmail(email: string): Promise<number> {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new CustomError("User not found");
    }
    return user.id;
}

export async function repositoryRegister(email: string, password: string): Promise<void> {
    await prisma.user.create({
        data: { email: email, password: password },
    });
}

export async function countDayUserEmails(user: User): Promise<number> {
    const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
    const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));

    return prisma.email.count({
        where: {
            from: user,
            sentAt: {
                gte: startOfDay,
                lt: endOfDay,
            },
        },
    });
}

export async function statsList(): Promise<{ user: User, emailCount: number }[]> {
    const users = await prisma.user.findMany();
    const result = await Promise.all(users.map(async (user) => {
        const emailCount = await countDayUserEmails(user);
        return {user, emailCount};
    }));
    return result.filter(({ emailCount }) => emailCount > 0);
}