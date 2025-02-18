"use client";

import { Button } from "@/components/ui/button";
import useInvoiceStore from "@/stores/useInvoiceStore";
import { useEffect } from "react";
import { DataTable } from "@/app/components/tables/dataTable";
import { columns } from "@/app/components/tables/invoices/columns";



export default function InvoicesTable() {
  const { invoices, fetchInvoices, updateInvoiceDialog, resetDraft } = useInvoiceStore();

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);


  const handleCreateInvoice = () => {
    resetDraft()
    updateInvoiceDialog(true)
  }

  return (
    <div><Button onClick={handleCreateInvoice}>Create Invoice</Button>
      <DataTable columns={columns} data={invoices} />
    </div>
  );
}