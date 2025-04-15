import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()



const app = express()
app.use(express.json())
// app.post('/hooks/catch/:userId/:zapId/', async (req, res) => {
//     const zapId = req.params.zapId
//     // const userId = req.params.userId
//     // const data = req.body


//     console.log('zapId', zapId)
//     console.log('reached here')
//     res.json({ message: 'webhook received' })


// })

app.post('/hooks/catch/:userId/:zapId/', async (req, res) => {
    const zapId = req.params.zapId
    const userId = req.params.userId
    const data = req.body


    console.log('zapId', zapId)
    console.log('reached here')

    try {
        await prisma.$transaction(async (tx) => {
            const run = await tx.zapRun.create({
                data: {
                    zapId: zapId,
                    metadata: data,
                }
            })
            console.log('reached here1')

            const zapRunOUtBoxResponse = await tx.zapRunOutbox.create({
                //@ts-ignore
                data: {
                    zapRunId: run.id,
                }
            })

        })
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ message: 'error' })
    }
    console.log('reached here2')

    res.json({ message: 'webhook received' })

})

app.listen(3002, () => {
    console.log('Server is running on http://localhost:3002')
})   