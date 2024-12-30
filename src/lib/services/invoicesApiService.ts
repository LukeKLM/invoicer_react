import fetchClient from "@/lib/httpClient"

const INVOICES_URL = "/invoices"

export const getInvoices = async () => {
    const invoices = await fetchClient(
        INVOICES_URL,
        {
            method: "GET",
        }

    )
    return invoices.json()
}

export const createInvoice = async (data: any) => {
    const invoice = await fetchClient(
        INVOICES_URL,
        {
            method: "POST",
            body: JSON.stringify(data),
        }
    )
    return invoice.json()
}

export const deleteInvoice = async (id: number) => {
    await fetchClient(
        `${INVOICES_URL}/${id}`,
        {
            method: "DELETE",
        }
    )
}

export const updateInvoice = async (id: number, data: any) => {
    await fetchClient(
        `${INVOICES_URL}/${id}`,
        {
            method: "PATCH",
            body: JSON.stringify(data),
        }
    )
}

export const downloadInvoice = async (id: number) => {
    const response = await fetchClient(
        `${INVOICES_URL}/${id}/pdf`,
        {
            method: "GET",
        }
    )
    return response.blob()
}