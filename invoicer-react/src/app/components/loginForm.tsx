"use client";

import React, { useState } from "react"
import { InputField } from "./forms_inputs/inputField"
import { post } from "@/lib/httpClient"

export const LoginForm = () => {


const [formData, setFormData] = useState({ email: "", password: "" })


const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await post("http://127.0.0.1:8000/auth/token", formData)
    console.log(result)
}

const formValueChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value });
}

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        {/* {formData.toString()} */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
                onSubmit={onSubmit}
                className="space-y-6"
                >
                    <InputField
                        id="email"
                        name="email"
                        type="email"
                        required={true}
                        label="Email address"
                        value={formData.email}
                        onChange={formValueChanged}
                    />
                    <InputField
                        id="password"
                        name="password"
                        type="password"
                        required={true}
                        label="Password"
                        value={formData.password}
                        onChange={formValueChanged}
                    />

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                                Sign in
                        </button>
                    </div>
            </form>
        </div>
        </div>
    )
}