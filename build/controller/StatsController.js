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
const UserRepository_1 = require("../repository/UserRepository");
const UserService_1 = require("../service/UserService");
const router = (0, express_1.Router)();
router.get('/stats', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const userId = yield (0, UserRepository_1.getIdByEmail)(email);
    if (userId !== 0) {
        const stats = yield (0, UserService_1.getStatsList)();
        res.status(200).send(stats);
    }
    else {
        res.status(403).send("Your are not allowed to see stats");
    }
}));
exports.default = router;
