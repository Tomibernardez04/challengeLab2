import { router } from "../tools/Constantes";
import { login, register } from "../service/UserService";

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

export default router;