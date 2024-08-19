import { validateUser, getUserByEmail, repositoryRegister } from "../repository/UserRepository";
import jwt from 'jsonwebtoken';
import { User } from "@prisma/client";

export async function login(email: string, password: string): Promise<string> {
    const user = await validateUser(email, password);
    return activateToken(user);
}

export async function register(email: string, password: string): Promise<string> {
    const user = await getUserByEmail(email);
    if (!user) {
        await repositoryRegister(email, password);
        return "Register Successful";
    } else {
        throw new CustomError("Email already used");
    }
}

function activateToken(user: User): string {
    return jwt.sign(user, "secret key", { expiresIn: "1h" });
}