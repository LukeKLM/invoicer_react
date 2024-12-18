import { post } from "@/lib/httpClient"
import Cookies from "js-cookie";

export const login = async (email: string, password: string) => {
    const result =  await post("http://127.0.0.1:8000/auth/token", { email, password })

    Cookies.set("access_token", result.access_token, {
        httpOnly: false, // Set to true only on server-side cookies
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    console.log(result)
}
