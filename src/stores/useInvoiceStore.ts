import { create } from 'zustand'
import { Invoice, InvoicePaymentType, InvoiceStateType } from '@/types/invoice'
import { getInvoices, createInvoice, updateInvoice, deleteInvoice } from '@/lib/services/invoicesApiService'
import { toCamelCase } from '@/lib/helpers'
import { camelToSnake } from '@/lib/helpers'

interface InvocieAction {
  deleteApiInvoice: (id: number) => Promise<void>,
  updateApiInvoice: (id: number, invoice: Invoice) => Promise<void>,
  createApiInvoice: (invoice: Invoice) => Promise<void>,
  fetchInvoices: () => Promise<void>,
  setDraft: (invoice: Invoice) => void,
  updateDraft: <K extends keyof Invoice>(name: string, value: Invoice[K]) => void,
  updateInvoiceDialog: (value: boolean) => void,
}

interface InvoiceState {
  invoices: Invoice[],
  draftInvoice: Invoice,
  invoiceDialog: boolean,
}

const getDefaultInvoice = (): Invoice => ({
  id: null,
  dueDate: "",
  exposeDate: "",
  invoiceNumber: "",
  paymentType: InvoicePaymentType.BANK_TRANSFER,
  state: InvoiceStateType.DRAFT,
  customerId: 1,
  supplierId: 1,
  variableSymbol: ""
})

const useInvoiceStore = create<InvoiceState & InvocieAction>((set) => ({
  invoiceDialog: false,
  invoices: [],
  draftInvoice: getDefaultInvoice(),
  deleteApiInvoice: async (id) => {
    await deleteInvoice(id)
  },
  createApiInvoice: async (invoice) => {
    await createInvoice(camelToSnake(invoice))
  },
  updateApiInvoice: async (id, invoice) => {
    await updateInvoice(id, camelToSnake(invoice))
  },
  fetchInvoices: async () => {
    set({ invoices: toCamelCase(await getInvoices()) })
  },
  setDraft: (invoice) => set({ draftInvoice: invoice }),
  updateDraft: (name, value) => set(
    (state) => ({
      draftInvoice: state.draftInvoice ? {
        ...state.draftInvoice,
        [name]: value,
      } : getDefaultInvoice()
    })
  ),
  updateInvoiceDialog: (value) => set({ invoiceDialog: value }),
}))

export default useInvoiceStore;