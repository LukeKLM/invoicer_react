import { create } from 'zustand'

const useInvoiceStore = create(() => ({
    invoices: []
}))

export default useInvoiceStore;