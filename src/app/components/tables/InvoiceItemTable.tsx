"use client"

import { deleteInvoiceItem, getInvoiceItems } from "@/lib/services/invoicesItemsApiService";
import { useEffect, useState } from "react";
import { InvoiceItem } from "@/types/invoice";
import InvoiceItemForm from "../forms/InvoiceItemForm";
import Button from "@/app/components/Button";

const InvoiceItemTable = () => {
    const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
    const [draftInvoiceItem, setDraftInvoiceItem] = useState<InvoiceItem | null>(null);

    const fetchData = async () => {
        const invoiceItems: InvoiceItem[] = await getInvoiceItems()
        setInvoiceItems(invoiceItems)
    }
    const handleDeleteInvoiceitem = async (invoice_item_id: number | null) => {
        if (!invoice_item_id) return

        await deleteInvoiceItem(invoice_item_id)
        await fetchData()
    }

    const handleEditInvoiceItem = (invoice: InvoiceItem) => {
        setDraftInvoiceItem({...invoice})
    }

    const handleCopyInvoiceItem = (invoice: InvoiceItem) => {
        setDraftInvoiceItem({...invoice, id: null})
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div>
            <h1>Invoice Item Table</h1>
            <table className="border-black border-2" border={1}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Invoice ID</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody className="border-black border-2">
                {invoiceItems.map((invoiceItem) => (
                    <tr key={invoiceItem.id}>
                        <td>{invoiceItem.id}</td>
                        <td>{invoiceItem.title}</td>
                        <td>{invoiceItem.invoice_id}</td>
                        <td>{invoiceItem.price}</td>
                        <td>{invoiceItem.quantity}</td>
                        <td>
                        <Button onClick={() => handleDeleteInvoiceitem(invoiceItem.id)}>Delete</Button>
                        <Button onClick={() => handleEditInvoiceItem(invoiceItem)}>Edit</Button>
                        <Button onClick={() => handleCopyInvoiceItem(invoiceItem)}>Copy</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <InvoiceItemForm
            draftInvoiceItem={draftInvoiceItem}
            afterSubmit={fetchData}
        />
        </div>
    )
}

export default InvoiceItemTable
