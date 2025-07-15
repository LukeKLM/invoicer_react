import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { InputField } from "@/app/components/forms_inputs/inputField"
import { fetchEconomicSubject } from "@/lib/services/aresApiService"
import { AresCompany } from "@/types/aresCompany"

const AresVatIdForm: React.FC = () => {
  const [companyId, setCompanyId] = useState<string>("")
  const [companyData, setCompanyData] = useState<AresCompany | null>(null)

  async function handleFetchEconomicSubject() {
    const data = await fetchEconomicSubject(companyId)
    console.log(data)
    setCompanyData(data)
    console.log(companyData)
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <InputField
          id="companyId"
          name="companyId"
          type="text"
          required={true}
          label="Company ID"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
        />
        <div className="flex items-end">
          <Button
            className="button"
            onClick={() => handleFetchEconomicSubject()}
          >
            Fill out
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AresVatIdForm;