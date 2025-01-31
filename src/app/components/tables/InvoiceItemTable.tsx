"use client";

import {
    deleteInvoiceItem,
    getInvoiceItems,
} from "@/lib/services/invoicesItemsApiService";
import { useEffect, useState } from "react";
import { InvoiceItem } from "@/types/invoice";
import InvoiceItemForm from "../forms/InvoiceItemForm";
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

const InvoiceItemTable = () => {
    const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
    const [draftInvoiceItem, setDraftInvoiceItem] = useState<InvoiceItem | null>(
        null
    );

    const fetchData = async () => {
        const invoiceItems: InvoiceItem[] = await getInvoiceItems();
        setInvoiceItems(invoiceItems);
    };
    const handleDeleteInvoiceitem = async (invoice_item_id: number | null) => {
        if (!invoice_item_id) return;

        await deleteInvoiceItem(invoice_item_id);
        await fetchData();
    };

    const handleEditInvoiceItem = (invoice: InvoiceItem) => {
        setDraftInvoiceItem({ ...invoice });
    };

    const handleCopyInvoiceItem = (invoice: InvoiceItem) => {
        setDraftInvoiceItem({ ...invoice, id: null });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoiceItems.map((invoiceItem) => (
                        <TableRow key={invoiceItem.id}>
                            <TableCell className="font-medium">{invoiceItem.id}</TableCell>
                            <TableCell>{invoiceItem.title}</TableCell>
                            <TableCell>{invoiceItem.invoice_id}</TableCell>
                            <TableCell>{invoiceItem.price}</TableCell>
                            <TableCell>{invoiceItem.quantity}</TableCell>
                            <TableCell className="text-right">
                                <Button onClick={() => handleDeleteInvoiceitem(invoiceItem.id)}>
                                    Delete
                                </Button>
                                <Button onClick={() => handleEditInvoiceItem(invoiceItem)}>
                                    Edit
                                </Button>
                                <Button onClick={() => handleCopyInvoiceItem(invoiceItem)}>
                                    Copy
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">{invoiceItems.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>

            <InvoiceItemForm
                draftInvoiceItem={draftInvoiceItem}
                afterSubmit={fetchData}
            />
        </div>
    );
};

export default InvoiceItemTable;
