import express from 'express'
import { verify } from 'jsonwebtoken'

export const authmiddleware = async (req: any, res: any, next: any) => {
    console.log(' Inside Auth middleware')

    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({ message: 'No token provided' })
    }

    const decodedUser = await verify(token, process.env.JWT_SECRET as string)

    if (!decodedUser || typeof decodedUser === 'string') {
        return res.status(403).json({ error: "User Does not Exist!" })
    }

    res.set('userId', decodedUser.id);

    next()
}
// Compare this snippet from primary_backend/src/router/index.ts: