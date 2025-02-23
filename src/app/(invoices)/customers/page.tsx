"use client";

import CustomerTable from "@/app/components/tables/CustomerTable";
import CustomerDialog from "@/app/components/dialogs/CustomerDialog";
import useCustomerStore from "@/stores/useCustomerStore";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLayout } from "@/app/contexts/LayoutContext";

const Customers: React.FC = () => {
  const { updateCustomerDialog, resetDraft } = useCustomerStore();

  const handleCreateCustomer = () => {
    resetDraft()
    updateCustomerDialog(true)
  }
  const { setHeaderContent } = useLayout();

  useEffect(() => {
    setHeaderContent(<Button onClick={handleCreateCustomer}>Create Customer</Button>)
    return () => setHeaderContent(null)
  }, [])

  return (
    <div className="mt-6">
      <CustomerDialog />
      <CustomerTable />
    </div>
  );
}

export default Customers;