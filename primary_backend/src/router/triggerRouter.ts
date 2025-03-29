import { Router } from 'express';
import { authmiddleware } from '../middleware/auth';
import { prisma } from '../db';

const router = Router()



router.get('/available', authmiddleware, async (req, res) => {
    const trigger = await prisma.availableTrigger.findMany({})

    res.status(200).send({ success: true, trigger })
})



export const triggerRouter = router


