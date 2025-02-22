"use client"

import React, { useEffect } from "react";
import InvoicesTable from "@/app/components/tables/InvoicesTable";
import InvoiceDialog from "@/app/components/dialogs/InvoiceDialog";
import { useLayout } from "@/app/contexts/LayoutContext";
import { Button } from "@/components/ui/button";
import useInvoiceStore from "@/stores/useInvoiceStore";

const InvoicesDashboard: React.FC = () => {
  const { updateInvoiceDialog, resetDraft } = useInvoiceStore();

  const handleCreateInvoice = () => {
    resetDraft()
    updateInvoiceDialog(true)
  }
  const { setHeaderContent } = useLayout();
  useEffect(() => {
    setHeaderContent(<Button onClick={handleCreateInvoice}>Create Invoice</Button>)
    return () => setHeaderContent(null)
  }, [])


  return (
    <div>
      <InvoiceDialog />
      <InvoicesTable />
    </div>
  );
}

export default InvoicesDashboard;