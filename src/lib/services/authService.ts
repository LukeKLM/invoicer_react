import Cookies from "js-cookie";
import fetchClient from "@/lib/httpClient";

export const login = async (email: string, password: string) => {
    const result = await fetchClient(
        "/auth/token",
        {
            method: "POST",
            body: JSON.stringify({ email, password }),
        }
    )
    const json_data = await result.json()

    if (!json_data.access_token) {
        return false
    }

    Cookies.set("access_token", json_data.access_token, {
        httpOnly: false, // Set to true only on server-side cookies
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    return true
}
