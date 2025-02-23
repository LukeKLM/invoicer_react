"use client"

import React, { useEffect } from "react";
import { useParams } from "next/navigation"
import useCustomerStore from "@/stores/useCustomerStore";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CustomerDetail: React.FC = () => {
  const { detailCustomer: detailCustomer, fetchCustomer } = useCustomerStore();
  const urlParams = useParams()

  useEffect(() => {
    if (!urlParams.id) return

    if (!detailCustomer.id) {
      fetchCustomer(Number(urlParams.id))
    }
  }, [])

  return (
    <div className="space-y-6 mt-6">
      {/* Customer & Supplier Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Customer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{detailCustomer.name}</p>
            <p className="text-gray-600">{detailCustomer.email}</p>
            <p>{detailCustomer.street}, {detailCustomer.city}, {detailCustomer.postalCode}</p>
            <p>{detailCustomer.country}</p>
            <p className="text-sm text-gray-500">VAT ID: {detailCustomer.vatId}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CustomerDetail;