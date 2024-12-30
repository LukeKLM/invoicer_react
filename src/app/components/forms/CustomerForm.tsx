"use client"

import { createCustomer, updateCustomer } from "@/lib/services/customersApiService"
import React, { useEffect, useState } from "react"
import { InputField } from "../forms_inputs/inputField"
import { Customer } from "@/types/customer"

interface CustomerFormProps {
    afterSubmit: () => Promise<void>
    draftCustomer: Customer | null
}

const initialCustomer = {
        email: "",
        name: "",
        vat_id: "",
        city: "",
        country: "",
        street: "",
        postal_code: ""
}

const CustomerForm: React.FC<CustomerFormProps> = ({ afterSubmit, draftCustomer }) => {
    const [formData, setFormData] = useState({...initialCustomer})

    const formValueChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(draftCustomer?.id) {
            await updateCustomer(draftCustomer.id, {...formData})
        } else {
            await createCustomer({...formData})
        }
        await afterSubmit()
    }

    useEffect(() => {
        if (draftCustomer) {
            setFormData({...draftCustomer});
        }
    }, [draftCustomer])

    return (
        <div>
            <h1>Invoice Item Form</h1>
            <div className="max-w-screen-sm w-full mx-auto px-4">
                <form onSubmit={handleSubmitForm}>
                    <div>
                        <InputField
                            id="email"
                            name="email"
                            type="text"
                            required={true}
                            label="Email"
                            value={formData.email}
                            onChange={formValueChanged}
                        />
                        <InputField
                            id="name"
                            name="name"
                            type="text"
                            required={true}
                            label="Name"
                            value={formData.name}
                            onChange={formValueChanged}
                        />
                        <InputField
                            id="vat_id"
                            name="vat_id"
                            type="text"
                            required={true}
                            label="VAT ID"
                            value={formData.vat_id}
                            onChange={formValueChanged}
                        />
                        <InputField
                            id="city"
                            name="city"
                            type="text"
                            required={true}
                            label="City"
                            value={formData.city}
                            onChange={formValueChanged}
                        />
                        <InputField
                            id="country"
                            name="country"
                            type="text"
                            required={true}
                            label="Country"
                            value={formData.country}
                            onChange={formValueChanged}
                        />
                        <InputField
                            id="street"
                            name="street"
                            type="text"
                            required={true}
                            label="Street"
                            value={formData.street}
                            onChange={formValueChanged}
                        />
                        <InputField
                            id="postal_code"
                            name="postal_code"
                            type="text"
                            required={true}
                            label="Postal Code"
                            value={formData.postal_code}
                            onChange={formValueChanged}
                        />
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {draftCustomer?.id ? "Update" : "Create"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CustomerForm