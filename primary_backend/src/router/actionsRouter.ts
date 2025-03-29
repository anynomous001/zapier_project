import { Router } from 'express';
import { authmiddleware } from '../middleware/auth';
import { prisma } from '../db';

const router = Router()



router.get('/available', authmiddleware, async (req, res) => {
    const actions = await prisma.availableAction.findMany({})

    res.status(200).send({ success: true, actions })
})



export const actionsRouter = router


