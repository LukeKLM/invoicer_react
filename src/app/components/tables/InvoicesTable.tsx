"use client";

import useInvoiceStore from "@/stores/useInvoiceStore";
import { useEffect } from "react";
import { DataTable } from "@/app/components/tables/dataTable";
import { columns } from "@/app/components/tables/invoices/columns";



export default function InvoicesTable() {
  const { invoices, fetchInvoices } = useInvoiceStore();

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  return (
    <div>
      <DataTable columns={columns} data={invoices} />
    </div>
  );
}