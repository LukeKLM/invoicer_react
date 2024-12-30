"use client"

import { deleteSupplier, getSuppliers } from "@/lib/services/suppliersApiService";
import { useEffect, useState } from "react";
import { Supplier} from "@/types/supplier";
import SupplierForm from "@/app/components/forms/SupplierForm";
import Button from "@/app/components/Button";

const SupplierTable = () => {
    const [Suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [draftSupplier, setDraftSupplier] = useState<Supplier | null>(null);

    const fetchData = async () => {
        const Suppliers: Supplier[] = await getSuppliers()
        setSuppliers(Suppliers)
    }
    const handleDeleteSupplier = async (invoice_id: number | null) => {
        if (!invoice_id) return

        await deleteSupplier(invoice_id)
        await fetchData()
    }

    const handleEditSupplier = (invoice: Supplier) => {
        setDraftSupplier({...invoice})
    }

    const handleCopySupplier = (invoice: Supplier) => {
        setDraftSupplier({...invoice, id: null})
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
                    <th>Bank Account</th>
                    <th>Bank Code</th>
                    <th>IBAN</th>
                </tr>
            </thead>
            <tbody className="border-black border-2">
                {Suppliers.map((supplier) => (
                    <tr key={supplier.id}>
                        <td>{supplier.id}</td>
                        <td>{supplier.name}</td>
                        <td>{supplier.email}</td>
                        <td>{supplier.vat_id}</td>
                        <td>{supplier.city}</td>
                        <td>{supplier.country}</td>
                        <td>{supplier.street}</td>
                        <td>{supplier.postal_code}</td>
                        <td>{supplier.bank_account}</td>
                        <td>{supplier.bank_code}</td>
                        <td>{supplier.iban}</td>
                        <td>
                        <Button onClick={() => handleDeleteSupplier(supplier.id)}>Delete</Button>
                        <Button onClick={() => handleEditSupplier(supplier)}>Edit</Button>
                        <Button onClick={() => handleCopySupplier(supplier)}>Copy</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <SupplierForm
            draftSupplier={draftSupplier}
            afterSubmit={fetchData}
        />
        </div>
    )
}

export default SupplierTable
