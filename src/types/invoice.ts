export type Invoice = {
    id: number | null;
    due_date: string;
    expose_date: string;
    invoice_number: string;
    payment_type: string;
    state: string;
    customer_id: number;
    supplier_id: number;
    variable_symbol: string;
}

export type InvoiceItem = {
    id: number | null;
    invoice_id: number;
    price: string;
    title: string;
    quantity: number;
}
