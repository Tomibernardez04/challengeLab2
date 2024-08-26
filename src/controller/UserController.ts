import { Router } from "express";
import {countEmails, login, register, send} from "../service/UserService";

const router = Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await login(email, password);
        res.send({ token });
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
});

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const message = await register(email, password);
        res.send({ message });
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
});

router.post('/send', async (req, res) => {
    const { from, password, to, subject, text } = req.body;
    try {
        if (await countEmails(from) < 1000) {
            await send(from, password, to, subject, text);
            res.send({ message: 'Email Sent Successfully!' });
        }
        else {
            res.status(403).send({ message: 'Cannot send more than 1000 emails per day' });
        }
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
})

export default router;
