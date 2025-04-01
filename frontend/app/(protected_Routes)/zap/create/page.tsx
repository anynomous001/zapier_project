"use client"

import { LinkButton } from '@/components/buttons/linkbutton'
import { PrimaryButton } from '@/components/buttons/primarybutton'
import ZapCell from '@/components/zapCell'
import { BACKEND_URL } from '@/config'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

interface availableActions {
    index: number
    id: string
    name: string
    image: string
}[]
interface availabletrigger {
    id: string
    name: string
    image: string
}


const useAvailableTriggersAndActions = () => {


    const [loading, setLoading] = React.useState<boolean>(true)
    const [availableTriggers, setAvailableTriggers] = React.useState([])
    const [availableActions, setAvailableActions] = React.useState([])
    const [error, setError] = React.useState<string | null>(null)


    React.useEffect(() => {
        setLoading(true)
        axios.get(`${BACKEND_URL}/api/v1/trigger/available`, {
            headers: {
                "Authorization": `${localStorage.getItem("token")}`
            }
        }).then((response) => {
            console.log(response.data)
            setAvailableTriggers(response.data.trigger)
        }
        ).catch((error) => {
            console.log(error)
            setError(error)
        }
        ).finally(() => {
            setLoading(false)
        })

        axios.get(`${BACKEND_URL}/api/v1/actions/available`, {
            headers: {
                "Authorization": `${localStorage.getItem("token")}`
            }
        }).then((response) => {
            console.log(response.data)
            setAvailableActions(response.data.actions)
        }
        ).catch((error) => {
            console.log(error)
            setError(error)
        }
        ).finally(() => {
            setLoading(false)
        })

    }, [])

    return { loading, availableActions, availableTriggers, error }
}


const page = () => {

    const router = useRouter()
    const [selecetdTrigger, setSelectedTrigger] = React.useState<availabletrigger>()
    const [selectedActions, setSelectedActions] = React.useState<availableActions[]>([])
    const [selectedModalIndex, setSelectedModalIndex] = React.useState<number | null>(null)

    const { loading, availableActions, availableTriggers, error } = useAvailableTriggersAndActions()


    return (
        <div>
            <PrimaryButton onClick={async () => {
                if (!selecetdTrigger?.id) {
                    return 'User has not selected trigger'
                }

                const response = await axios.post(`${BACKEND_URL}/api/v1/zap`, {
                    availabletriggerId: selecetdTrigger?.id,
                    triggerMetadata: {},
                    actions: selectedActions.map(a => ({
                        availableactionId: a.id,
                        actionMetadata: {}
                    }))


                }, {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    },
                },
                )

                router.push('/dashboard')
            }}
            >
                Create Zap
            </PrimaryButton>
            <div className='flex bg-slate-200 h-screen w-[100vw] justify-center items-center'>
                <div className=' flex flex-col items-center space-y-4 w-[70%] justify-center rounded-lg shadow-lg p-5'>
                    <ZapCell onClick={() => setSelectedModalIndex(1)} index={1} name={selecetdTrigger?.name || "Trigger"} image={selecetdTrigger?.image || ''} />
                    <div className='flex flex-col space-y-2'>
                        {

                            selectedActions.map((action, index) => {
                                return (
                                    <ZapCell onClick={() => setSelectedModalIndex(action.index)} key={index} index={action.index} name={action.name} image={action?.image || ''} />
                                )
                            })
                        }
                        <LinkButton onClick={() => {
                            setSelectedActions(a => [...a, { index: selectedActions.length + 2, id: 'actionId', name: 'Action', image: '' }])
                        }} >
                            Add Action
                        </LinkButton>

                    </div>

                </div>

                {selectedModalIndex && <Modal loading={loading} availableItems={selectedModalIndex === 1 ? availableTriggers : availableActions} onSelect={(props: null | { name: string, id: string, image: string }) => {
                    if (props === null) {
                        setSelectedModalIndex(null)
                        return
                    }
                    if (selectedModalIndex === 1) {
                        setSelectedTrigger({ id: props.id, name: props.name, image: props.image })
                    }
                    if (selectedModalIndex !== 1 && props !== null) {
                        setSelectedActions(a => {
                            const newActions = [...a]
                            newActions[selectedModalIndex - 2] = { index: selectedModalIndex, name: props.name, id: props.id, image: props.image }
                            return newActions
                        })
                    }

                    setSelectedModalIndex(null)
                }} index={selectedModalIndex} />}
            </div >
        </div >

    )
}

export default page

const Modal = ({ index, onSelect, availableItems, loading }: { index: number, onSelect: (props: null | { name: string, id: string, image: string }) => void, loading: boolean, availableItems: { id: string, name: string, imageUrl: string }[] }) => {
    console.log(availableItems)

    return (
        <div className=" overflow-y-auto flex bg-slate-200 bg-opacity-75   fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {index === 1 ? 'Select Trigger' : ' Select Action'}
                        </h3>
                        <button type="button"
                            onClick={() => onSelect(null)}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className='flex flex-col items-center justify-center p-6 space-y-4'>
                        {
                            loading ?
                                <div className='flex justify-center items-center'>
                                    loading....
                                </div>


                                : availableItems.map((item, index) => {
                                    return (
                                        <div key={index} onClick={() => onSelect({ name: item.name, id: item.id, image: item.imageUrl })} className='flex my-2 bg-slate-600 hover:cursor-pointer w-[200px] justify-center px-7 py-5 space-x-2 items-center'>
                                            <img src={item.imageUrl} alt={item.name} className='w-[30px] h-[30px]' />
                                            <span className='text-xl text-slate-50 '>{item.name}</span>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

/**
 * 

 https://th.bing.com/th/id/R.229079c8f5240851cece598cf8eee770?rik=JND2PKmC%2fxzB1w&riu=http%3a%2f%2fpngimg.com%2fuploads%2femail%2femail_PNG11.png&ehk=6sNwAjueFilXp3tCehLPbXDGgZgsYZdR7y6dZ3vpSk4%3d&risl=&pid=ImgRaw&r=0
 
 https://www.cryptovantage.com/app/uploads/2021/05/Solana-logo-1.png

 https://cdn.freebiesupply.com/logos/large/2x/webhooks-logo-png-transparent.png
 
 */