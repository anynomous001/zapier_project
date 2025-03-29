"use client";
import { CheckFeature } from "@/components/checkFeature";
import { Input } from "@/components/input";
import { PrimaryButton } from "@/components/buttons/primarybutton";
import { useRouter } from "next/navigation";
import React from "react";
import { BACKEND_URL } from "@/config";
import axios from "axios";

export default function () {
    // const { user, loading } = useAuthContext();    
    const router = useRouter();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    return <div>
        <div className="flex justify-center">
            <div className="flex pt-8 max-w-4xl">
                <div className="flex-1 pt-20 px-4">
                    <div className="font-semibold text-3xl pb-4">
                        Join millions worldwide who automate their work using Zapier.
                    </div>
                    <div className="pb-6 pt-4">
                        <CheckFeature label={"Easy setup, no coding required"} />
                    </div>
                    <div className="pb-6">
                        <CheckFeature label={"Free forever for core features"} />
                    </div>
                    <CheckFeature label={"14-day trial of premium features & apps"} />

                </div>
                <div className="flex-1 pt-6 pb-6 mt-12 px-4 border rounded">
                    <Input onChange={e => {
                        setEmail(e.target.value)
                    }} label={"Email"} type="text" placeholder="Your Email"></Input>
                    <Input onChange={e => {
                        setPassword(e.target.value)
                    }} label={"Password"} type="password" placeholder="Password"></Input>
                    <div className="pt-4">
                        <PrimaryButton onClick={async () => {
                            try {
                                const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                                    email: email,
                                    password: password
                                })

                                localStorage.setItem("token", response.data.token);
                                router.push("/dashboard");
                            } catch (error) {
                                console.log(error);
                            }

                        }} size="big">Login</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
}