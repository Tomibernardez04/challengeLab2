import { Router } from "express";
import { getIdByEmail } from "../repository/UserRepository";
import {getStatsList} from "../service/UserService";

const router = Router();

router.get('/stats', async (req, res) => {
    const email = req.body.email;
    const userId = await getIdByEmail(email);
    if (userId !== 0) {
        const stats = await getStatsList();
        res.status(200).send(stats);
    }
    else {
        res.status(403).send("Your are not allowed to see stats");
    }
});

export default router;