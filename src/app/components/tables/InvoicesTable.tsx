"use client";

import {
  downloadInvoice,
} from "@/lib/services/invoicesApiService";
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
import useInvoiceStore from "@/stores/useInvoiceStore";
import { useEffect } from "react";



export default function InvoicesTable() {
  const { invoices, draftInvoice, fetchInvoices, setDraft, updateInvoiceDialog, deleteApiInvoice } = useInvoiceStore();

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const handleDeleteInvoice = async (invoice_id: number | null) => {
    if (!invoice_id) return;

    await deleteApiInvoice(invoice_id);
    await fetchInvoices();
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setDraft({ ...invoice });
    updateInvoiceDialog(true);
  };

  const handleCopyInvoice = (invoice: Invoice) => {
    setDraft({ ...invoice, id: null });
    updateInvoiceDialog(true);
  };

  const handleDownlaodInvoice = async (invoice_id: number | null) => {
    if (!invoice_id) return;

    console.log("Downloading invoice with id: ", invoice_id);
    await downloadInvoice(invoice_id);
  };
  return (
    <div>{JSON.stringify(draftInvoice)}
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
              <TableCell>{invoice.invoiceNumber}</TableCell>
              <TableCell>{invoice.dueDate}</TableCell>
              <TableCell>{invoice.exposeDate}</TableCell>
              <TableCell>{invoice.paymentType}</TableCell>
              <TableCell>{invoice.state}</TableCell>
              <TableCell>{invoice.variableSymbol}</TableCell>
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
    </div>
  );
}