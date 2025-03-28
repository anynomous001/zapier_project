import { Router } from "express";
import { authmiddleware } from "../middleware/auth";
import { zapCreateSchema } from "../types/zapSchema";
import { prisma } from "../db";
import { isAsync } from "zod";


const router = Router()

router.post('/', authmiddleware, async (req: any, res: any) => {
    const body = req.body

    const { success, error, data } = zapCreateSchema.safeParse(body)

    if (!success) {
        return res.status(411).send({ error })
    }

    const response = await prisma.$transaction(async (tx) => {

        const id = req.get('userId')

        const zap = await prisma.zap.create({
            data: {
                userId: id,
                triggerId: '',
                actions: {
                    create: data.actions.map((x, index) => ({
                        actionId: x.availableactionId,
                        sortingOrder: index,
                    }))
                }
            }
        })


        const trigger = await tx.trigger.create({
            data: {
                zapId: zap.id,
                triggerId: data.availabletriggerId,
            }
        })

        await tx.zap.update({
            where: {
                id: zap.id
            },
            data: {
                triggerId: trigger.id
            }
        })
    })


    res.status(200).send({ success: true, response })

})

router.get('/zaps', authmiddleware, async (req, res) => {

    const id = req.get('userId')

    const zaps = await prisma.zap.findMany({
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

    })
    res.send({ zaps })
})
router.get('/:zapId', authmiddleware, async (req, res) => {

    const zapId = req.params.zapId

    const id = req.get('userId')

    const zap = await prisma.zap.findFirst({
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
    })
    res.send({ zap })
})




export const zapRouter = router