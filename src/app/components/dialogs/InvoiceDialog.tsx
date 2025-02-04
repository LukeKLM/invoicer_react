'use client'
import React from 'react';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import InvoiceForm from "@/app/components/forms/InvoiceForm"

const InvoiceDialog: React.FC = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Create Invoice</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Invoice</DialogTitle>
                </DialogHeader>
                <InvoiceForm afterSubmit={async () => { }} draftInvoice={null} />
                <DialogFooter>
                    <Button type="submit">Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
}

export default InvoiceDialog;