"use client";

import { InvoiceForm } from "@/app/components/forms/InvoiceForm";
import {
    getInvoices,
    deleteInvoice,
    downloadInvoice,
} from "@/lib/services/invoicesApiService";
import { useState, useEffect } from "react";
import { Invoice } from "@/types/invoice";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function InvoicesDashboard() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [draftInvoice, setDraftInvoice] = useState<Invoice | null>(null);

    async function fetchData() {
        const invoices =
            await getInvoices(); /* todo: move path to api service with base path from env */
        setInvoices(invoices);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteInvoice = async (invoice_id: number | null) => {
        if (!invoice_id) return;

        await deleteInvoice(invoice_id);
        await fetchData();
    };

    const handleEditInvoice = (invoice: Invoice) => {
        setDraftInvoice({ ...invoice });
    };

    const handleCopyInvoice = (invoice: Invoice) => {
        setDraftInvoice({ ...invoice, id: null });
    };

    const handleDownlaodInvoice = async (invoice_id: number | null) => {
        if (!invoice_id) return;

        console.log("Downloading invoice with id: ", invoice_id);
        await downloadInvoice(invoice_id);
    };

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Number</TableHead>
                        <TableHead>Due date</TableHead>
                        <TableHead>Expose date</TableHead>
                        <TableHead>Payment type</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>Variable symbol</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                            <TableCell className="font-medium">{invoice.id}</TableCell>
                            <TableCell>{invoice.invoice_number}</TableCell>
                            <TableCell>{invoice.due_date}</TableCell>
                            <TableCell>{invoice.expose_date}</TableCell>
                            <TableCell>{invoice.payment_type}</TableCell>
                            <TableCell>{invoice.state}</TableCell>
                            <TableCell>{invoice.variable_symbol}</TableCell>
                            <TableCell className="text-right">
                                <Button onClick={() => handleDeleteInvoice(invoice.id)}>
                                    Delete
                                </Button>
                                <Button onClick={() => handleEditInvoice(invoice)}>Edit</Button>
                                <Button onClick={() => handleCopyInvoice(invoice)}>Copy</Button>
                                <Button onClick={() => handleDownlaodInvoice(invoice.id)}>
                                    Download
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">{invoices.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <InvoiceForm afterSubmit={fetchData} draftInvoice={draftInvoice} />
        </div>
    );
}
