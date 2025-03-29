"use client";
import { CheckFeature } from "@/components/checkFeature";
import { Input } from "@/components/input";
import { PrimaryButton } from "@/components/buttons/primarybutton";
import { useRouter } from "next/navigation";
import React from "react";
import { BACKEND_URL } from "@/config";
import axios from "axios";

export default function () {
    const router = useRouter();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");


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
                    <Input label={"Name"} onChange={e => {
                        console.log(e.target.value)
                        setName(e.target.value)
                    }} type="text" placeholder="Your name"></Input>
                    <Input onChange={e => {
                        console.log(e.target.value)
                        setEmail(e.target.value)
                    }} label={"Email"} type="text" placeholder="Your Email"></Input>
                    <Input onChange={e => {
                        console.log(e.target.value)
                        setPassword(e.target.value)
                    }} label={"Password"} type="password" placeholder="Password"></Input>

                    <div className="pt-4">
                        <PrimaryButton onClick={async () => {
                            try {
                                const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                                    email: email,
                                    password: password,
                                    name: name
                                })
                                localStorage.setItem("token", response.data.token);
                                router.push("/dashboard");

                            } catch (error) {
                                console.log(error);
                                //handle error
                                if (axios.isAxiosError(error)) {
                                    console.log(error.response?.data);
                                }
                                if (error instanceof Error) {
                                    console.log(error.message);
                                }
                                // alert("Error signing up. Please try again.");

                            }
                        }} size="big">Get started free</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
}