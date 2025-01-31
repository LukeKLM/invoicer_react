"use client"

import { deleteSupplier, getSuppliers } from "@/lib/services/suppliersApiService";
import { useEffect, useState } from "react";
import { Supplier } from "@/types/supplier";
import SupplierForm from "@/app/components/forms/SupplierForm";
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

const SupplierTable = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [draftSupplier, setDraftSupplier] = useState<Supplier | null>(null);

    const fetchData = async () => {
        const suppliers: Supplier[] = await getSuppliers()
        setSuppliers(suppliers)
    }
    const handleDeleteSupplier = async (invoice_id: number | null) => {
        if (!invoice_id) return

        await deleteSupplier(invoice_id)
        await fetchData()
    }

    const handleEditSupplier = (invoice: Supplier) => {
        setDraftSupplier({ ...invoice })
    }

    const handleCopySupplier = (invoice: Supplier) => {
        setDraftSupplier({ ...invoice, id: null })
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
                        <TableHead>Bank account</TableHead>
                        <TableHead>Bank code</TableHead>
                        <TableHead>IBAN</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {suppliers.map((supplier) => (
                        <TableRow key={supplier.id}>
                            <TableCell className="font-medium">{supplier.id}</TableCell>
                            <TableCell>{supplier.name}</TableCell>
                            <TableCell>{supplier.email}</TableCell>
                            <TableCell>{supplier.vat_id}</TableCell>
                            <TableCell>{supplier.city}</TableCell>
                            <TableCell>{supplier.country}</TableCell>
                            <TableCell>{supplier.street}</TableCell>
                            <TableCell>{supplier.postal_code}</TableCell>
                            <TableCell>{supplier.bank_account}</TableCell>
                            <TableCell>{supplier.bank_code}</TableCell>
                            <TableCell>{supplier.iban}</TableCell>
                            <TableCell className="text-right">
                                <Button onClick={() => handleDeleteSupplier(supplier.id)}>Delete</Button>
                                <Button onClick={() => handleEditSupplier(supplier)}>Edit</Button>
                                <Button onClick={() => handleCopySupplier(supplier)}>Copy</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">{suppliers.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>

            <SupplierForm
                draftSupplier={draftSupplier}
                afterSubmit={fetchData}
            />
        </div>
    )
}

export default SupplierTable
