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


const ZapsTable = ({ zaps }: { zaps: Zap[] }) => {
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ZapId</TableHead>
                        <TableHead>UserId</TableHead>
                        <TableHead>Trigger</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        zaps.map((zap, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{zap.id}</TableCell>
                                <TableCell>{zap.userId}</TableCell>
                                <TableCell>{zap.trigger?.type.name || ''}</TableCell>
                                <TableCell className="text-right">{zap.actions.map((action, index) => {
                                    return (
                                        <div key={index}>
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