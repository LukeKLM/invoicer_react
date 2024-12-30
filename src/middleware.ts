import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Cookies from "js-cookie";

export const config = {
    matcher: ['/', '/invoices/:path*', '/invoice-items/:path*','/customers/:path*','/suppliers/:path*'],
}

export function middleware(request: NextRequest) {
    const jwt_token = request.cookies.get("access_token");
    console.log(jwt_token)
    console.log(Cookies.get("access_token"))

    if (jwt_token === undefined) {
        return NextResponse.redirect(`${request.nextUrl.origin}/login`)
    }
}
