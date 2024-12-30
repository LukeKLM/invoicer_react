"use client"

import { createInvoiceItem, updateInvoiceItem } from "@/lib/services/invoicesItemsApiService"
import React, { useEffect, useState } from "react"
import { InputField } from "../forms_inputs/inputField"
import { InvoiceItem } from "@/types/invoice"

interface InvoiceItemFormProps {
    afterSubmit: () => Promise<void>
    draftInvoiceItem: InvoiceItem | null
}

const InvoiceItemForm: React.FC<InvoiceItemFormProps> = ({ afterSubmit, draftInvoiceItem }) => {
    const [formData, setFormData] = useState({
        quantity: 1,
        price: "1000",
        invoice_id: 1,
        title: ""
    })

    const formValueChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(draftInvoiceItem?.id) {
            await updateInvoiceItem(draftInvoiceItem.id, {...formData})
        } else {
            await createInvoiceItem({...formData})
        }
        await afterSubmit()
    }

    useEffect(() => {
        if (draftInvoiceItem) {
            setFormData({...draftInvoiceItem});
        }
    }, [draftInvoiceItem])

    return (
        <div>
            <h1>Invoice Item Form</h1>
            <div className="max-w-screen-sm w-full mx-auto px-4">
                <form onSubmit={handleSubmitForm}>
                    <div>
                        <InputField
                            id="title"
                            name="title"
                            type="text"
                            required={true}
                            label="Title"
                            value={formData.title}
                            onChange={formValueChanged}
                        />
                        <InputField
                            id="price"
                            name="price"
                            type="text"
                            required={true}
                            label="Price"
                            value={formData.price}
                            onChange={formValueChanged}
                        />
                        <InputField
                            id="quantity"
                            name="quantity"
                            type="number"
                            required={true}
                            label="Quantity"
                            value={formData.quantity}
                            onChange={formValueChanged}
                        />
                        <InputField
                            id="invoice_id"
                            name="invoice_id"
                            type="number"
                            required={true}
                            label="Invoice ID"
                            value={formData.invoice_id}
                            onChange={formValueChanged}
                        />
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {draftInvoiceItem?.id ? "Update" : "Create"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default InvoiceItemForm