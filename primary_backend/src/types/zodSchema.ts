import { z } from 'zod';



export const SignupSchema = z.object({
    name: z.string().min(3, 'Name should be atleast 3 characters long').max(20, 'Name should be atmost 20 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string(),
});


export const LoginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string(),
});