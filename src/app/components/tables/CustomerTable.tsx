"use client";

import useCustomerStore from "@/stores/useCustomerStore";
import { useEffect } from "react";
import { DataTable } from "@/app/components/tables/dataTable";
import { columns } from "@/app/components/tables/customers/columns";



export default function CustomerTable() {
  const { customers, fetchCustomers } = useCustomerStore();

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return (
    <div>
      <DataTable columns={columns} data={customers} />
    </div>
  );
}