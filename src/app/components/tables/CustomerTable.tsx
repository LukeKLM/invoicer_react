"use client"

import { deleteCustomer, getCustomers } from "@/lib/services/customersApiService";
import { useEffect, useState } from "react";
import { Customer } from "@/types/customer";
import CustomerForm from "../forms/CustomerForm";
import Button from "@/app/components/Button";

const CustomerTable = () => {
    const [Customers, setCustomers] = useState<Customer[]>([]);
    const [draftCustomer, setDraftCustomer] = useState<Customer | null>(null);

    const fetchData = async () => {
        const Customers: Customer[] = await getCustomers()
        setCustomers(Customers)
    }
    const handleDeleteCustomer = async (invoice_id: number | null) => {
        if (!invoice_id) return

        await deleteCustomer(invoice_id)
        await fetchData()
    }

    const handleEditCustomer = (invoice: Customer) => {
        setDraftCustomer({...invoice})
    }

    const handleCopyCustomer = (invoice: Customer) => {
        setDraftCustomer({...invoice, id: null})
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div>
            <h1>Invoice Item Table</h1>
            <table className="border-black border-2" border={1}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th>VAT</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Street</th>
                    <th>Postal code</th>
                </tr>
            </thead>
            <tbody className="border-black border-2">
                {Customers.map((customer) => (
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.name}</td>
                        <td>{customer.email}</td>
                        <td>{customer.vat_id}</td>
                        <td>{customer.city}</td>
                        <td>{customer.country}</td>
                        <td>{customer.street}</td>
                        <td>{customer.postal_code}</td>
                        <td>
                        <Button onClick={() => handleDeleteCustomer(customer.id)}>Delete</Button>
                        <Button onClick={() => handleEditCustomer(customer)}>Edit</Button>
                        <Button onClick={() => handleCopyCustomer(customer)}>Copy</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <CustomerForm
            draftCustomer={draftCustomer}
            afterSubmit={fetchData}
        />
        </div>
    )
}

export default CustomerTable
