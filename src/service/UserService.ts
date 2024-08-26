import { validateUser, getUserByEmail, repositoryRegister, countDayUserEmails, statsList } from "../repository/UserRepository";
import { createMail } from "../repository/MailRepository";
import jwt from 'jsonwebtoken';
import { User } from "@prisma/client";
import { sendMail } from "../mailService/MailService";

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

export async function send(from: string, password: string, to: string, subject: string, text: string): Promise<void> {
    const authorize = await validateUser(from, password); // await para validar el usuario correctamente
    if (!authorize) {
        throw new CustomError("Invalid user");
    }

    const user = await getUserByEmail(from);
    if (!user) {
        throw new CustomError("User not found");
    }

    try {
        await sendMail(
            to,
            subject,
            `${from} te envía un saludo`,
            text
        );
        await createMail(user, to, subject, text);
    } catch (error) {
        console.error('Error enviando el correo:', error);
        throw new CustomError('Error registrando usuario o enviando correo.');
    }
}

export async function countEmails(email: string): Promise<number> {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new CustomError("User not found");
    }
    return countDayUserEmails(user);
}

export async function getStatsList() {
    return await statsList();
}

function activateToken(user: User): string {
    return jwt.sign({ id: user.id, email: user.email }, "secret key", { expiresIn: "1h" });
}
