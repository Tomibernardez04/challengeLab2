import express from 'express';
import { router } from './tools/Constantes';
import { PrismaClient } from '@prisma/client';
import userController from "./controller/UserController";
import { sendEmail } from './mailService/mailService';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(router);
app.use(userController);

app.listen(3000, () => {
    console.log('REST API server ready at: http://localhost:3000');

    sendEmail(['test@example.com'], 'Hello', 'Testing some Mailgun awesomeness!', '<h1>Testing some Mailgun awesomeness!</h1>')
        .then(() => console.log('Correo enviado correctamente'))
        .catch(error => console.error('Error al enviar correo:', error));
});
