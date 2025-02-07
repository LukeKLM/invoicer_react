import { InputField } from "@/app/components/forms_inputs/inputField"
import React from "react"
import useInvoiceStore from "@/stores/useInvoiceStore"
import { Button } from "@/components/ui/button"


const InvoiceForm: React.FC = () => {
  const { draftInvoice, updateDraft, updateApiInvoice, createApiInvoice, fetchInvoices, updateInvoiceDialog } = useInvoiceStore()


  const formValueChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateDraft(name, value);
  }


  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = { ...draftInvoice }
    if (draftInvoice?.id) {
      await updateApiInvoice(draftInvoice.id, data)
    } else {
      await createApiInvoice(data)
    }
    await fetchInvoices()
    updateInvoiceDialog(false)
  }

  return (
    <div>
      <div className="max-w-screen-sm w-full mx-auto px-4">
        <form onSubmit={handleSubmitForm}>
          <div>
            <InputField
              id="dueDate"
              name="dueDate"
              className="mt-3"
              type="date"
              required={true}
              label="Due Date"
              value={draftInvoice.dueDate}
              onChange={formValueChanged}
            />
            <InputField
              id="exposeDate"
              name="exposeDate"
              className="mt-3"
              type="date"
              required={true}
              label="Expose Date"
              value={draftInvoice.exposeDate}
              onChange={formValueChanged}
            />
            <InputField
              id="invoiceNumber"
              name="invoiceNumber"
              className="mt-3"
              type="text"
              required={true}
              label="Invoice Number"
              value={draftInvoice.invoiceNumber}
              onChange={formValueChanged}
            />
            <InputField
              id="paymentType"
              name="paymentType"
              className="mt-3"
              type="text"
              required={true}
              label="Payment Type"
              value={draftInvoice.paymentType}
              onChange={formValueChanged}
            />
            <InputField
              id="state"
              name="state"
              className="mt-3"
              type="text"
              required={true}
              label="State"
              value={draftInvoice.state}
              onChange={formValueChanged}
            />
            <InputField
              id="customerId"
              name="customerId"
              className="mt-3"
              type="number"
              required={true}
              label="Customer ID"
              value={draftInvoice.customerId}
              onChange={formValueChanged}
            />
            <InputField
              id="supplierId"
              name="supplierId"
              className="mt-3"
              type="number"
              required={true}
              label="Supplier ID"
              value={draftInvoice.supplierId}
              onChange={formValueChanged}
            />
            <InputField
              id="variableSymbol"
              name="variableSymbol"
              className="mt-3"
              type="text"
              required={true}
              label="Variable Symbol"
              value={draftInvoice.variableSymbol}
              onChange={formValueChanged}
            />
          </div>
          <Button className="mt-4" size="lg" type="submit">{draftInvoice.id ? 'Update' : 'Create'}</Button>
        </form>
      </div>
    </div>
  )
}

export default InvoiceForm