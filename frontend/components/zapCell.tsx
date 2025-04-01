import React from 'react'

const ZapCell = ({ index, name, onClick, image }: { index: number, name: string, onClick: () => void, image: string }) => {
    return (
        <div onClick={onClick} className='flex my-2 bg-slate-600 hover:cursor-pointer w-[200px] justify-center px-7 py-5 space-x-2 items-center'>
            <img src={image} alt={name} className='w-[30px] h-[30px]' />
            <span className='text-xl text-slate-50 '>{index}</span>
            <span className='text-xl text-slate-50 '>{name}</span>
        </div>
    )
}

export default ZapCell