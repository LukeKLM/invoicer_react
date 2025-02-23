"use client";

import SupplierTable from "@/app/components/tables/SupplierTable";
import SupplierDialog from "@/app/components/dialogs/SupplierDialog";
import useSupplierStore from "@/stores/useSupplierStore";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLayout } from "@/app/contexts/LayoutContext";

const Suppliers: React.FC = () => {
  const { updateSupplierDialog, resetDraft } = useSupplierStore();

  const handleCreateSupplier = () => {
    resetDraft()
    updateSupplierDialog(true)
  }
  const { setHeaderContent } = useLayout();

  useEffect(() => {
    setHeaderContent(<Button onClick={handleCreateSupplier}>Create Supplier</Button>)
    return () => setHeaderContent(null)
  }, [])

  return (
    <div className="mt-6">
      <SupplierDialog />
      <SupplierTable />
    </div>
  );
}

export default Suppliers;