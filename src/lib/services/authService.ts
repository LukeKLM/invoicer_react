import { post } from "@/lib/httpClient"

export const login = async (email: string, password: string) => {
    const result =  await post("http://127.0.0.1:8000/auth/token", { email, password })
    console.log(result)
}
