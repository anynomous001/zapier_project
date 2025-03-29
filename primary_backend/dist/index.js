"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = require("./router/userRouter");
const zapRouter_1 = require("./router/zapRouter");
const cors_1 = __importDefault(require("cors"));
const triggerRouter_1 = require("./router/triggerRouter");
const actionsRouter_1 = require("./router/actionsRouter");
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/v1/user', userRouter_1.userRouter);
app.use('/api/v1/zap', zapRouter_1.zapRouter);
app.use('/api/v1/trigger', triggerRouter_1.triggerRouter);
app.use('/api/v1/actions', actionsRouter_1.actionsRouter);
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
// Compare this snippet from primary_backend/src/router/userRouter.ts:
