import { Zap } from '@/app/(protected_Routes)/dashboard/page'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { BACKEND_URL } from '@/config'


const ZapsTable = ({ zaps }: { zaps: Zap[] }) => {
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ZapId</TableHead>
                        <TableHead>Trigger</TableHead>
                        <TableHead>Hook URL</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        zaps.map((zap, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{zap.id}</TableCell>
                                <TableCell>{zap.trigger?.type.name || ''}</TableCell>
                                <TableCell className='max-w-5xl  text-wrap'>{`${BACKEND_URL}/hooks/catch/${zap.userId}/${zap.id}`}</TableCell>
                                <TableCell className="text-right">{zap.actions.map((action, index) => {
                                    return (
                                        <div key={index}>
                                            <div className=''>
                                                <img className='h-[30px] w-[30px]' src={action.type.imageUrl} />
                                            </div>
                                            {action.type.name}
                                        </div>
                                    )
                                })}</TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default ZapsTable