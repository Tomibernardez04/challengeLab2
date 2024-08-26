import {prisma} from "../tools/Constantes";
import {Email, User} from "@prisma/client";

export async function createMail(from: User, to: string, subject: string, text: string): Promise<Email> {
    const currentDateTime = new Date();
    return prisma.email.create({
        data: {
            fromId: from.id,
            to: to,
            subject: subject,
            text: text,
            sentAt: currentDateTime,
        },
    });
}