"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserService_1 = require("../service/UserService");
const router = (0, express_1.Router)();
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const token = yield (0, UserService_1.login)(email, password);
        res.send({ token });
    }
    catch (e) {
        res.status(500).send({ message: e.message });
    }
}));
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const message = yield (0, UserService_1.register)(email, password);
        res.send({ message });
    }
    catch (e) {
        res.status(500).send({ message: e.message });
    }
}));
router.post('/send', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, password, to, subject, text } = req.body;
    try {
        if ((yield (0, UserService_1.countEmails)(from)) < 1000) {
            yield (0, UserService_1.send)(from, password, to, subject, text);
            res.send({ message: 'Email Sent Successfully!' });
        }
        else {
            res.status(403).send({ message: 'Cannot send more than 1000 emails per day' });
        }
    }
    catch (e) {
        res.status(500).send({ message: e.message });
    }
}));
exports.default = router;
