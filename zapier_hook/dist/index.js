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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.post('/hooks/catch/:userId/:zapId/', async (req, res) => {
//     const zapId = req.params.zapId
//     // const userId = req.params.userId
//     // const data = req.body
//     console.log('zapId', zapId)
//     console.log('reached here')
//     res.json({ message: 'webhook received' })
// })
app.post('/hooks/catch/:userId/:zapId/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const zapId = req.params.zapId;
    const userId = req.params.userId;
    const data = req.body;
    console.log('zapId', zapId);
    console.log('reached here');
    try {
        yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const run = yield tx.zapRun.create({
                data: {
                    zapId: zapId,
                    metadata: data,
                }
            });
            console.log('reached here1');
            const zapRunOUtBoxResponse = yield tx.zapRunOutbox.create({
                //@ts-ignore
                data: {
                    zapRunId: run.id,
                }
            });
        }));
    }
    catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'error' });
    }
    console.log('reached here2');
    res.json({ message: 'webhook received' });
}));
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
