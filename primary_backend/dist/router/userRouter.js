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
exports.userRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zodSchema_1 = require("../types/zodSchema");
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = (0, express_1.Router)();
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { success, error, data } = zodSchema_1.SignupSchema.safeParse(body);
    let zodErrors = {};
    if (!success) {
        error.issues.forEach((issue) => {
            zodErrors = Object.assign(Object.assign({}, zodErrors), { [issue.path[0]]: issue.message });
        });
        return res.status(411).send(Object.keys(zodErrors).length > 0 ? { errors: zodErrors } : { success: true });
    }
    try {
        const checkUser = yield db_1.prisma.user.findFirst({
            where: {
                email: data.email
            }
        });
        if (checkUser) {
            //TODO: zodErros type is not defined in the zod library
            //@ts-ignore
            zodErrors.email = 'This email is already taken!';
            return res.status(409).send('User already exists');
        }
        const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
        const user = yield db_1.prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name
            }
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET);
        res.status(200).send({ user, token });
    }
    catch (error) {
        return res.status(403).json({
            errors: zodErrors, // Ensure we return zodErrors if they exist
            //@ts-ignore
            message: error.message || 'An error occurred',
        });
    }
}));
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { success, error, data } = zodSchema_1.LoginSchema.safeParse(body);
    let zodErrors = {};
    if (!success) {
        error.issues.forEach((issue) => {
            zodErrors = Object.assign(Object.assign({}, zodErrors), { [issue.path[0]]: issue.message });
        });
        return res.status(411).json(Object.keys(zodErrors).length > 0 ? { errors: zodErrors } : { success: true });
    }
    try {
        const checkUser = yield db_1.prisma.user.findFirst({
            where: {
                email: data.email
            }
        });
        if (!checkUser) {
            //@ts-ignore
            zodErrors.email = 'User does not exist';
            return res.status(404).json({ errors: zodErrors });
        }
        else {
            const isPasswordValid = yield bcrypt_1.default.compare(data.password, checkUser.password);
            if (!isPasswordValid) {
                //@ts-ignore
                zodErrors.password = 'Invalid password';
                return res.status(401).json({ errors: zodErrors });
            }
            else {
                const token = jsonwebtoken_1.default.sign({ id: checkUser.id }, process.env.JWT_SECRET);
                return res.status(200).json({ checkUser, token });
            }
        }
    }
    catch (error) {
        return res.status(403).json({
            errors: zodErrors, // Ensure we return zodErrors if they exist
            //@ts-ignore
            message: error.message || 'An error occurred',
        });
    }
}));
router.get('/user', auth_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userId;
    const user = yield db_1.prisma.user.findFirst({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ user });
}));
exports.userRouter = router;
