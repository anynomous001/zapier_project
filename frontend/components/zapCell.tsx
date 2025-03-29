import React from 'react'

const ZapCell = ({ index, name, onClick }: { index: number, name: string, onClick: () => void }) => {
    return (
        <div onClick={onClick} className='flex my-2 bg-slate-600 hover:cursor-pointer w-[200px] justify-center px-7 py-5 space-x-2 items-center'>
            <span className='text-xl text-slate-50 '>{index}</span>
            <span className='text-xl text-slate-50 '>{name}</span>
        </div>
    )
}

export default ZapCell