export enum InvoicePaymentType {
  CASH = "CASH",
  BANK_TRANSFER = "BANK_TRANSFER",
}

export enum InvoiceStateType {
  DRAFT = "DRAFT",
  SENT = "SENT",
  PAID = "PAID",
  CANCELLED = "CANCELLED",
}


export interface InvoiceItem {
  id: number | null;
  invoiceId: number | null;
  price: string;
  title: string;
  quantity: number;
}

export interface Invoice {
  id: number | null;
  dueDate: string;
  exposeDate: string;
  invoiceNumber: string;
  paymentType: InvoicePaymentType;
  state: InvoiceStateType;
  customerId: number;
  supplierId: number;
  variableSymbol: string;
  items: InvoiceItem[];
  customer: { id: number, name: string } | null;
  supplier: { id: number, name: string } | null;
  totalPrice: string;
}

