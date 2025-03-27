import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
app.use(express.json())
const prisma = new PrismaClient()


app.post('hooks/catch/:userId/:zapId/', async (req, res) => {
    const zapId = req.params.zapId
    const userId = req.params.userId
    const data = req.body

    await prisma.$transaction(async (tx) => {
        const run = await tx.zapRun.create({
            data: {
                zapId: zapId,
                metadata: data,
            }
        })

        const zapRunOUtBoxResponse = await tx.zapRunOutbox.create({
            //@ts-ignore
            data: {
                zapRunId: run.id,
            }
        })

    })
    res.send('ok')

})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
}   