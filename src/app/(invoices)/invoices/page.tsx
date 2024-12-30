"use client";

import { InvoiceForm } from "@/app/components/forms/InvoiceForm";
import { getInvoices, deleteInvoice, downloadInvoice } from "@/lib/services/invoicesApiService"
import { useState, useEffect } from 'react';
import Button from "@/app/components/Button";
import { Invoice } from "@/types/invoice";


export default function InvoicesDashboard() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [draftInvoice, setDraftInvoice] = useState<Invoice | null>(null);

    async function fetchData() {
        const invoices = await getInvoices()  /* todo: move path to api service with base path from env */
        setInvoices(invoices);
    }

    useEffect(() => {
        fetchData();
    }, []);


    const handleDeleteInvoice = async (invoice_id: number | null) => {
        if (!invoice_id) return

        await deleteInvoice(invoice_id)
        await fetchData()
    }

    const handleEditInvoice = (invoice: Invoice) => {
        setDraftInvoice({...invoice})
    }

    const handleCopyInvoice = (invoice: Invoice) => {
        setDraftInvoice({...invoice, id: null})
    }

    const handleDownlaodInvoice = async (invoice_id: number | null) => {
        if(!invoice_id) return

        console.log("Downloading invoice with id: ", invoice_id)
        const pdfBlob = await downloadInvoice(invoice_id);
        console.log(pdfBlob)

      // Create a temporary URL for the PDF
      const url = URL.createObjectURL(pdfBlob);

      // Create a hidden link and auto-click it to start download
      const link = document.createElement("a");
      link.href = url;
      link.download = "document.pdf"; // Customize file name as needed
      link.click();

      // Clean up the temporary URL
      URL.revokeObjectURL(url);
    }

    return (
    <div className="text-black">
        <h1>InvoicesDashboard</h1>
        <table className="border-black border-2" border={1}>
            <thead>
                <tr>
                    <th>Invoice ID</th>
                    <th>Invoice Number</th>
                    <th>Due Date</th>
                    <th>Expose Date</th>
                    <th>Payment Type</th>
                    <th>State</th>
                    <th>Variable Symbol</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody className="border-black border-2">
                {invoices.map((invoice) => (
                    <tr key={invoice.id}>
                        <td>{invoice.id}</td>
                        <td>{invoice.invoice_number}</td>
                        <td>{invoice.due_date}</td>
                        <td>{invoice.expose_date}</td>
                        <td>{invoice.payment_type}</td>
                        <td>{invoice.state}</td>
                        <td>{invoice.variable_symbol}</td>
                        <td>
                        <Button onClick={() => handleDeleteInvoice(invoice.id)}>Delete</Button>
                        <Button onClick={() => handleEditInvoice(invoice)}>Edit</Button>
                        <Button onClick={() => handleCopyInvoice(invoice)}>Copy</Button>
                        <Button onClick={() => handleDownlaodInvoice(invoice.id)}>Download</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <InvoiceForm
            afterSubmit={fetchData}
            draftInvoice={draftInvoice}
        />
    </div>
);
}


