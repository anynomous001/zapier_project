"use client"

import { LinkButton } from '@/components/buttons/linkbutton'
import ZapCell from '@/components/zapCell'
import React from 'react'

interface availableActions {
    id: string
    name: string
}[]


const page = () => {

    const [selecetdTrigger, setSelectedTrigger] = React.useState<string>('')
    const [selectedActions, setSelectedActions] = React.useState<availableActions[]>([])


    return (
        <div className='flex bg-slate-200 h-screen w-[100vw] justify-center items-center'>
            <div className=' flex flex-col items-center space-y-4 w-[70%] justify-center rounded-lg shadow-lg p-5'>
                <ZapCell id='1' name={selecetdTrigger || "Trigger"} />
                <div className='flex flex-col space-y-2'>
                    {
                        selectedActions.map((action, index) => {
                            return (
                                <ZapCell key={index} id={action.id} name={action.name} />
                            )
                        })
                    }
                    <LinkButton onClick={() => {
                        setSelectedActions([...selectedActions, { id: '1', name: 'Action' }])
                    }} >
                        Add Action
                    </LinkButton>

                </div>

            </div>
        </div >
    )
}

export default page