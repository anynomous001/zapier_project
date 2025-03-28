"use client";
import { CheckFeature } from "@/components/checkFeature";
import { Input } from "@/components/input";
import { PrimaryButton } from "@/components/buttons/primarybutton";
import { useRouter } from "next/navigation";

export default function () {

    const router = useRouter();

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
                        console.log(e.target.value)
                    }} label={"Email"} type="text" placeholder="Your Email"></Input>
                    <Input onChange={e => {
                        console.log(e.target.value)
                    }} label={"Password"} type="password" placeholder="Password"></Input>
                    <div className="pt-4">
                        <PrimaryButton onClick={async () => {
                            router.push("/dashboard");
                        }} size="big">Login</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
}