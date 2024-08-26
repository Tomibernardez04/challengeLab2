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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.register = register;
exports.send = send;
exports.countEmails = countEmails;
exports.getStatsList = getStatsList;
const UserRepository_1 = require("../repository/UserRepository");
const MailRepository_1 = require("../repository/MailRepository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const MailService_1 = require("../mailService/MailService");
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, UserRepository_1.validateUser)(email, password);
        return activateToken(user);
    });
}
function register(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, UserRepository_1.getUserByEmail)(email);
        if (!user) {
            yield (0, UserRepository_1.repositoryRegister)(email, password);
            return "Register Successful";
        }
        else {
            throw new CustomError("Email already used");
        }
    });
}
function send(from, password, to, subject, text) {
    return __awaiter(this, void 0, void 0, function* () {
        const authorize = yield (0, UserRepository_1.validateUser)(from, password); // await para validar el usuario correctamente
        if (!authorize) {
            throw new CustomError("Invalid user");
        }
        const user = yield (0, UserRepository_1.getUserByEmail)(from);
        if (!user) {
            throw new CustomError("User not found");
        }
        try {
            yield (0, MailService_1.sendMail)(to, subject, `${from} te envía un saludo`, text);
            yield (0, MailRepository_1.createMail)(user, to, subject, text);
        }
        catch (error) {
            console.error('Error enviando el correo:', error);
            throw new CustomError('Error registrando usuario o enviando correo.');
        }
    });
}
function countEmails(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, UserRepository_1.getUserByEmail)(email);
        if (!user) {
            throw new CustomError("User not found");
        }
        return (0, UserRepository_1.countDayUserEmails)(user);
    });
}
function getStatsList() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, UserRepository_1.statsList)();
    });
}
function activateToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, "secret key", { expiresIn: "1h" });
}
