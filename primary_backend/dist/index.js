"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = require("./router/userRouter");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use('/api/v1/user', userRouter_1.userRouter);
app.use('/api/v1/zap', userRouter_1.userRouter);
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
// Compare this snippet from primary_backend/src/router/userRouter.ts:
