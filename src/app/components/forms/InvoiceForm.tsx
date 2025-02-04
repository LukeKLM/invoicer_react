import { InputField } from "@/app/components/forms_inputs/inputField"
import React, { useState, useEffect } from "react"
import { createInvoice, updateInvoice } from "@/lib/services/invoicesApiService"
import { Invoice } from "@/types/invoice"
import { Button } from "@/components/ui/button"

interface InvoiceFormProps {
    afterSubmit: () => Promise<void>
    draftInvoice: Invoice | null
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ afterSubmit, draftInvoice }) => {
    const [formData, setFormData] = useState({
        due_date: "",
        expose_date: "",
        invoice_number: "",
        payment_type: "CASH",
        state: "DRAFT",
        customer_id: 1,
        supplier_id: 1,
        variable_symbol: ""
    })

    useEffect(() => {
        if (draftInvoice) {
            setFormData({ ...draftInvoice });
        }
    }, [draftInvoice])

    const formValueChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value });
    }


    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = { ...formData }
        if (draftInvoice?.id) {
            await updateInvoice(draftInvoice.id, data)
        } else {
            await createInvoice(data)
        }
        await afterSubmit()
    }

    return (
        <div>
            <div className="max-w-screen-sm w-full mx-auto px-4">
                <form onSubmit={handleSubmitForm}>
                    <div>
                        <InputField
                            id="due_date"
                            name="due_date"
                            className="mt-3"
                            type="date"
                            required={true}
                            label="Due Date"
                            value={formData.due_date}
                            onChange={formValueChanged}
                        />
                        <InputField
                            id="expose_date"
                            name="expose_date"
                            className="mt-3"
                            type="date"
                            required={true}
                            label="Expose Date"
                            value={formData.expose_date}
                            onChange={formValueChanged}
                        />
                        <InputField
                            id="invoice_number"
                            name="invoice_number"
                            className="mt-3"
                            type="text"
                            required={true}
                            label="Invoice Number"
                            value={formData.invoice_number}
                            onChange={formValueChanged}
                        />
                        <InputField
                            id="payment_type"
                            name="payment_type"
                            className="mt-3"
                            type="text"
                            required={true}
                            label="Payment Type"
                            value={formData.payment_type}
                            onChange={formValueChanged}
                        />
                        <InputField
                            id="state"
                            name="state"
                            className="mt-3"
                            type="text"
                            required={true}
                            label="State"
                            value={formData.state}
                            onChange={formValueChanged}
                        />
                        <InputField
                            id="customer_id"
                            name="customer_id"
                            className="mt-3"
                            type="number"
                            required={true}
                            label="Customer ID"
                            value={formData.customer_id}
                            onChange={formValueChanged}
                        />
                        <InputField
                            id="supplier_id"
                            name="supplier_id"
                            className="mt-3"
                            type="number"
                            required={true}
                            label="Supplier ID"
                            value={formData.supplier_id}
                            onChange={formValueChanged}
                        />
                        <InputField
                            id="variable_symbol"
                            name="variable_symbol"
                            className="mt-3"
                            type="text"
                            required={true}
                            label="Variable Symbol"
                            value={formData.variable_symbol}
                            onChange={formValueChanged}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default InvoiceForm