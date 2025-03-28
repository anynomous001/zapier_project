"use client";
import { useRouter } from "next/navigation"
import { LinkButton } from "./buttons/linkbutton"
import { PrimaryButton } from "./buttons/primarybutton";
import Link from "next/link";

export const Appbar = () => {
    const router = useRouter();
    return <div className="flex border-b justify-between p-4">
        <div className="flex flex-col justify-center text-2xl font-extrabold">
            <Link href={'/'} onClick={() => router.push('/')} className="text-black hover:text-slate-600 hover:cursor-pointer">
                Zapier
            </Link>
        </div>
        <div className="flex">
            <div className="pr-4">
                <LinkButton onClick={() => { }}>Contact Sales</LinkButton>
            </div>
            <div className="pr-4">
                <LinkButton onClick={() => {
                    router.push("/signin")
                }}>Login</LinkButton>
            </div>
            <PrimaryButton onClick={() => {
                router.push("/signup")
            }}>
                Signup
            </PrimaryButton>
        </div>
    </div>
}