'use client'
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import InvoiceForm from "@/app/components/forms/InvoiceForm"
import useInvoiceStore from '@/stores/useInvoiceStore';

const InvoiceDialog: React.FC = () => {
  const { draftInvoice, invoiceDialog, updateInvoiceDialog } = useInvoiceStore();

  const getTitle = () => {
    return draftInvoice.id ? `Edit Invoice: ${draftInvoice.invoiceNumber} (${draftInvoice.id})` : 'Create Invoice';
  }

  return (
    <Dialog
      open={invoiceDialog}
      onOpenChange={() => updateInvoiceDialog(false)}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>
        <InvoiceForm />
      </DialogContent>
    </Dialog >
  );
}

export default InvoiceDialog;