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
exports.zapRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const zapSchema_1 = require("../types/zapSchema");
const db_1 = require("../db");
const router = (0, express_1.Router)();
router.post('/', auth_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { success, error, data } = zapSchema_1.zapCreateSchema.safeParse(body);
    if (!success) {
        return res.status(411).send({ error });
    }
    const response = yield db_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        //@ts-ignore
        const id = req.id;
        const zap = yield db_1.prisma.zap.create({
            data: {
                userId: id,
                triggerId: '',
                actions: {
                    create: data.actions.map((x, index) => ({
                        actionId: x.availableactionId,
                        sortingOrder: index,
                        metadata: x.actionMetadata
                    }))
                }
            }
        });
        const trigger = yield tx.trigger.create({
            data: {
                zapId: zap.id,
                triggerId: data.availabletriggerId,
            }
        });
        yield tx.zap.update({
            where: {
                id: zap.id
            },
            data: {
                triggerId: trigger.id
            }
        });
    }));
    res.status(200).send({ success: true, response });
}));
router.get('/zaps', auth_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const id = req.id;
    const zaps = yield db_1.prisma.zap.findMany({
        where: {
            userId: id,
        },
        include: {
            trigger: {
                include: {
                    type: true
                }
            },
            actions: {
                include: {
                    type: true
                }
            }
        }
    });
    res.send({ zaps });
}));
router.get('/:zapId', auth_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const zapId = req.params.zapId;
    //@ts-ignore
    const id = req.id;
    const zap = yield db_1.prisma.zap.findFirst({
        where: {
            id: zapId,
            userId: id
        },
        include: {
            trigger: {
                include: {
                    type: true
                }
            },
            actions: {
                include: {
                    type: true
                }
            }
        }
    });
    res.send({ zap });
}));
exports.zapRouter = router;
