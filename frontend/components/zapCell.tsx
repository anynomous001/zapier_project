import React from 'react'

const ZapCell = ({ id, name }: { id: string, name: string }) => {
    return (
        <div className='flex my-2 bg-slate-600 w-[200px] justify-center px-7 py-5 space-x-2 items-center'>
            <span className='text-xl text-slate-50 '>{id}</span>
            <span className='text-xl text-slate-50 '>{name}</span>
        </div>
    )
}

export default ZapCell