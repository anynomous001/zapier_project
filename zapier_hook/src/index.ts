import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
app.use(express.json())
const prisma = new PrismaClient()


app.post('hooks/catch/:userId/:zapId/', (req, res) => {
    const zapId = req.params.zapId
    const userId = req.params.userId

    prisma.zap.create({
        data: {
            triggerId:
        })

