'use client'
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog"
import CustomerForm from "@/app/components/forms/CustomerForm"
import useCustomerStore from '@/stores/useCustomerStore';
import { Button } from '@/components/ui/button';

const CustomerDialog: React.FC = () => {
  const { draftCustomer, customerDialog, updateCustomerDialog, updateApiCustomer, createApiCustomer, fetchCustomers } = useCustomerStore();

  const getTitle = () => {
    return draftCustomer.id ? `Edit Customer: ${draftCustomer.name} (${draftCustomer.id})` : 'Create Customer';
  }
  const handleSubmitForm = async () => {
    if (draftCustomer?.id) {
      await updateApiCustomer(draftCustomer.id, draftCustomer)
    } else {
      await createApiCustomer(draftCustomer)
    }
    await fetchCustomers()
    updateCustomerDialog(false)
  }

  return (
    <Dialog
      open={customerDialog}
      onOpenChange={() => updateCustomerDialog(false)}
    >
      <DialogContent className="w-full max-w-4xl">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>
            Customer form dialog
          </DialogDescription>
        </DialogHeader>
        <CustomerForm />
        <DialogFooter>
          <Button className="mt-4" size="lg" onClick={() => handleSubmitForm()}>{draftCustomer.id ? 'Update' : 'Create'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  );
}

export default CustomerDialog;