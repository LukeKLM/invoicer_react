import React from "react";
import { Supplier } from "@/types/supplier";
import { useRouter } from "next/navigation";
import useSupplierStore from "@/stores/useSupplierStore";


interface SupplierDetailLinkProps {
  supplier: Supplier;
}

const SupplierDetailLink: React.FC<SupplierDetailLinkProps> = ({ supplier }) => {

  const { setDetail } = useSupplierStore();
  const router = useRouter();

  const handleClickDetail = () => {
    setDetail(supplier)
    router.push(`/suppliers/${supplier.id}`)
  }

  return (
    <div
      className="cursor-pointer hover:text-blue-500"
      onClick={() => handleClickDetail()}
    >
      {supplier.name}
    </div>
  );
};

export default SupplierDetailLink;