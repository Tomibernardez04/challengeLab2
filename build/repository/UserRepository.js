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
exports.validateUser = validateUser;
exports.getUserByEmail = getUserByEmail;
exports.getIdByEmail = getIdByEmail;
exports.repositoryRegister = repositoryRegister;
exports.countDayUserEmails = countDayUserEmails;
exports.statsList = statsList;
const Constantes_1 = require("../tools/Constantes");
function validateUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield Constantes_1.prisma.user.findFirst({
            where: {
                email: email,
                password: password,
            }
        });
        if (!user) {
            throw new CustomError("User not found");
        }
        return user;
    });
}
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return Constantes_1.prisma.user.findFirst({
            where: {
                email: email,
            }
        });
    });
}
function getIdByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield getUserByEmail(email);
        if (!user) {
            throw new CustomError("User not found");
        }
        return user.id;
    });
}
function repositoryRegister(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Constantes_1.prisma.user.create({
            data: { email: email, password: password },
        });
    });
}
function countDayUserEmails(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
        const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));
        return Constantes_1.prisma.email.count({
            where: {
                from: user,
                sentAt: {
                    gte: startOfDay,
                    lt: endOfDay,
                },
            },
        });
    });
}
function statsList() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield Constantes_1.prisma.user.findMany();
        const result = yield Promise.all(users.map((user) => __awaiter(this, void 0, void 0, function* () {
            const emailCount = yield countDayUserEmails(user);
            return { user, emailCount };
        })));
        return result.filter(({ emailCount }) => emailCount > 0);
    });
}
