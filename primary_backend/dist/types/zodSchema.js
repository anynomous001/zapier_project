"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.SignupSchema = void 0;
const zod_1 = require("zod");
exports.SignupSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, 'Name should be atleast 3 characters long').max(20, 'Name should be atmost 20 characters long'),
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string(),
});
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string(),
});
