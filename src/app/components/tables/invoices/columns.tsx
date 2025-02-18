"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Invoice } from "@/types/invoice"
import { InvoiceTableActions } from "@/app/components/tables/invoices/invoiceTableActions"

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "invoiceNumber",
    header: "Invoice number",
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      return (
        <div>{row.original.customer?.name}</div>
      )
    }
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
    cell: ({ row }) => {
      return (
        <div>{row.original.supplier?.name}</div>
      )
    }
  },
  {
    accessorKey: "dueDate",
    header: "Due date",
  },
  {
    accessorKey: "exposeDate",
    header: "Expose date",
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const invoice: Invoice = row.original

      return (
        <InvoiceTableActions invoice={invoice} />
      )
    },
  },
]