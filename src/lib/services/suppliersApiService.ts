import fetchClient from "@/lib/httpClient";

export const getSuppliers = async() => {
    const suppliers = await fetchClient(
        "/invoice-suppliers",
        {
            method: "GET",
        }
    )
    return suppliers.json()
}

export const createSupplier = async(data: any) => {
    const suppliers = await fetchClient(
        "/invoice-suppliers/",
        {
            method: "POST",
            body: JSON.stringify(data),
        }
    )
    return suppliers.json()
}

export const deleteSupplier = async(id: number) => {
    await fetchClient(
        `/invoice-suppliers/${id}`,
        {
            method: "DELETE",
        }
    )
}

export const updateSupplier = async(id: number, data: any) => {
    await fetchClient(
        `/invoice-suppliers/${id}`,
        {
            method: "PATCH",
            body: JSON.stringify(data),
        }
    )
}
