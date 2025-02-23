import React from "react";
import { Invoice } from "@/types/invoice";
import { useRouter } from "next/navigation";
import useInvoiceStore from "@/stores/useInvoiceStore";


interface InvoiceDetailLinkProps {
  invoice: Invoice;
}

const InvoiceDetailLink: React.FC<InvoiceDetailLinkProps> = ({ invoice }) => {

  const { setDetail } = useInvoiceStore();
  const router = useRouter();

  const handleClickDetail = () => {
    setDetail(invoice)
    router.push(`/invoices/${invoice.id}`)
  }

  return (
    <div
      className="cursor-pointer hover:text-blue-500"
      onClick={() => handleClickDetail()}
    >
      {invoice.invoiceNumber}
    </div>
  );
};

export default InvoiceDetailLink;