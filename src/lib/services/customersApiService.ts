import fetchClient from "@/lib/httpClient";

export const getCustomers = async() => {
    const customers = await fetchClient(
        "/invoice-customers",
        {
            method: "GET",
        }
    )
    return customers.json()
}

export const createCustomer = async(data: any) => {
    const customers = await fetchClient(
        "/invoice-customers/",
        {
            method: "POST",
            body: JSON.stringify(data),
        }
    )
    return customers.json()
}

export const deleteCustomer = async(id: number) => {
    await fetchClient(
        `/invoice-customers/${id}`,
        {
            method: "DELETE",
        }
    )
}

export const updateCustomer = async(id: number, data: any) => {
    await fetchClient(
        `/invoice-customers/${id}`,
        {
            method: "PATCH",
            body: JSON.stringify(data),
        }
    )
}
