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
const UserRepository_1 = require("../repository/UserRepository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
function activateToken(user) {
    return jsonwebtoken_1.default.sign(user, "secret key", { expiresIn: "1h" });
}
