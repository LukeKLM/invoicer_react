import React from "react";
import { Customer } from "@/types/customer";
import { useRouter } from "next/navigation";
import useCustomerStore from "@/stores/useCustomerStore";


interface CustomerDetailLinkProps {
  customer: Customer;
}

const CustomerDetailLink: React.FC<CustomerDetailLinkProps> = ({ customer }) => {

  const { setDetail } = useCustomerStore();
  const router = useRouter();

  const handleClickDetail = () => {
    setDetail(customer)
    router.push(`/customers/${customer.id}`)
  }

  return (
    <div
      className="cursor-pointer hover:text-blue-500"
      onClick={() => handleClickDetail()}
    >
      {customer.name}
    </div>
  );
};

export default CustomerDetailLink;