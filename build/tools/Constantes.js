"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
exports.prisma = new client_1.PrismaClient();
exports.router = (0, express_1.Router)();
