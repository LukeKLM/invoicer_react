"use client"

import { deleteCustomer, getCustomers } from "@/lib/services/customersApiService";
import { useEffect, useState } from "react";
import { Customer } from "@/types/customer";
import CustomerForm from "../forms/CustomerForm";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const CustomerTable = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [draftCustomer, setDraftCustomer] = useState<Customer | null>(null);

    const fetchData = async () => {
        const customers: Customer[] = await getCustomers()
        setCustomers(customers)
    }
    const handleDeleteCustomer = async (invoice_id: number | null) => {
        if (!invoice_id) return

        await deleteCustomer(invoice_id)
        await fetchData()
    }

    const handleEditCustomer = (invoice: Customer) => {
        setDraftCustomer({ ...invoice })
    }

    const handleCopyCustomer = (invoice: Customer) => {
        setDraftCustomer({ ...invoice, id: null })
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>E-mail</TableHead>
                        <TableHead>Vat</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Street</TableHead>
                        <TableHead>Postal code</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {customers.map((customer) => (
                        <TableRow key={customer.id}>
                            <TableCell className="font-medium">{customer.id}</TableCell>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.vat_id}</TableCell>
                            <TableCell>{customer.city}</TableCell>
                            <TableCell>{customer.country}</TableCell>
                            <TableCell>{customer.street}</TableCell>
                            <TableCell>{customer.postal_code}</TableCell>
                            <TableCell className="text-right">
                                <Button onClick={() => handleDeleteCustomer(customer.id)}>Delete</Button>
                                <Button onClick={() => handleEditCustomer(customer)}>Edit</Button>
                                <Button onClick={() => handleCopyCustomer(customer)}>Copy</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">{customers.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>

            <CustomerForm
                draftCustomer={draftCustomer}
                afterSubmit={fetchData}
            />
        </div>
    )
}

export default CustomerTable
