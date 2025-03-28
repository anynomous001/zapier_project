import { Router } from "express";
import { authmiddleware } from "../middleware/auth";
import jwt from 'jsonwebtoken'
import { LoginSchema, SignupSchema } from "../types/zodSchema";
import { prisma } from "../db";
import bcrypt from 'bcrypt';
import express from 'express'


const router = Router()

router.post('/signup', async (req: any, res: any) => {

    const body = req.body
    const { success, error, data } = SignupSchema.safeParse(body)

    let zodErrors = {};

    if (!success) {
        error.issues.forEach((issue) => {
            zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
        });

        return res.status(411).send(
            Object.keys(zodErrors).length > 0 ? { errors: zodErrors } : { success: true }
        );
    }

    try {
        const checkUser = await prisma.user.findFirst({
            where: {
                email: data.email
            }
        })

        if (checkUser) {
            //TODO: zodErros type is not defined in the zod library
            //@ts-ignore
            zodErrors.email = 'This email is already taken!';


            return res.status(409).send('User already exists')
        }


        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name
            }
        });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string)


        res.status(200).send({ user, token })


    } catch (error) {
        return res.status(403).json({
            errors: zodErrors, // Ensure we return zodErrors if they exist
            //@ts-ignore
            message: error.message || 'An error occurred',
        });

    }




})
router.post('/signin', async (req: any, res: any) => {

    const body = req.body
    const { success, error, data } = LoginSchema.safeParse(body)

    let zodErrors = {}


    if (!success) {
        error.issues.forEach((issue) => {
            zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
        })
        return res.status(411).json(
            Object.keys(zodErrors).length > 0 ? { errors: zodErrors } : { success: true }
        )
    }

    try {
        const checkUser = await prisma.user.findFirst({
            where: {
                email: data.email
            }
        });

        if (!checkUser) {
            //@ts-ignore
            zodErrors.email = 'User does not exist'
            return res.status(404).json({ errors: zodErrors })
        } else {
            const isPasswordValid = await bcrypt.compare(data.password, checkUser.password);
            if (!isPasswordValid) {
                //@ts-ignore
                zodErrors.password = 'Invalid password';
                return res.status(401).json({ errors: zodErrors });
            } else {
                const token = jwt.sign({ id: checkUser.id }, process.env.JWT_SECRET as string)
                return res.status(200).json({ checkUser, token })
            }
        }
    } catch (error) {
        return res.status(403).json({
            errors: zodErrors, // Ensure we return zodErrors if they exist
            //@ts-ignore
            message: error.message || 'An error occurred',
        });
    }


})
router.get('/user', authmiddleware, async (req: any, res: any) => {

    const id = req.userId

    const user = await prisma.user.findFirst({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    })

    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json({ user })

})

export const userRouter = router