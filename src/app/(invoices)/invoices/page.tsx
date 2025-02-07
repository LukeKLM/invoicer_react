import React from "react";
import InvoicesTable from "@/app/components/tables/InvoicesTable";
import InvoiceDialog from "@/app/components/dialogs/InvoiceDialog";

const InvoicesDashboard: React.FC = () => {

  return (
    <div>
      <InvoiceDialog />
      <InvoicesTable />
    </div>
  );
}

export default InvoicesDashboard;