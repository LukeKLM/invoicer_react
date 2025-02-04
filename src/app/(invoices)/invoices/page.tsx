import React from "react";
import InvoicesTable from "@/app/components/tables/invoices-table";
import InvoicesDialog from "@/app/components/dialogs/invoices-dialog";

const InvoicesDashboard: React.FC = () => {

    return (
        <div>
            <InvoicesDialog />
            <InvoicesTable />
        </div>
    );
}

export default InvoicesDashboard;