"use client";

import { DarkButton } from '@/components/buttons/darkbutton'
import ZapsTable from '@/components/zapsTable'
import { BACKEND_URL } from '@/config'
import axios from 'axios'
import React from 'react'
import { useRouter } from 'next/navigation'


export interface Zap {
    id: string
    triggerId: string
    userId: string
    actions: {
        id: string
        zapId: string
        actionId: string
        sortingOrder: number
        type: {
            id: string
            name: string,
            imageUrl: string
        }
    }[]
    trigger: {
        id: string
        zapId: string
        triggerId: string
        type: {
            id: string
            name: string
            imageUrl: string

        }
    } | null
}[]



const useZaps = () => {
    const [loading, setLoading] = React.useState<boolean>(true)
    const [zaps, setZaps] = React.useState<Zap[]>([])
    const [error, setError] = React.useState<string | null>(null)


    React.useEffect(() => {
        setLoading(true)
        console.log(localStorage.getItem("token"))
        axios.get(`${BACKEND_URL}/api/v1/zap/zaps`, {
            headers: {
                "Authorization": `${localStorage.getItem("token")}`
            }
        }).then((response) => {
            console.log(response.data.zaps)
            setZaps(response.data.zaps)
        }
        ).catch((error) => {
            console.log(error)
            setError(error)
        }
        ).finally(() => {
            setLoading(false)
        })
    }, [])

    return { loading, zaps, error }
}



const page = () => {
    const router = useRouter()

    const { loading, zaps, error } = useZaps()

    return (
        <div className='flex justify-center bg-slate-300 h-screen w-[100vw]'>
            <div className='flex flex-col  w-[70%] pt-20'>
                <div className='flex justify-between items-center'>
                    <div className='font-semibold text-3xl pb-4'>
                        Your Zaps
                    </div>
                    <DarkButton size='big' onClick={() => {
                        router.push("/zap/create");

                    }}>
                        create
                    </DarkButton>
                </div>

                <div className='pb-6 pt-4'>
                    <p className='text-sm'>Zaps are workflows that connect your apps and automate tasks. You can create, edit, and delete zaps here.</p>
                </div>
                <div className='flex flex-col w-full'>
                    <ZapsTable zaps={zaps} />
                </div>
            </div>

        </div>
    )
}

export default page