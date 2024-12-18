import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
    matcher: ['/', '/dashboard/:path*'],
}

export function middleware(request: NextRequest) {
    const jwt_token = request.cookies.get("access_token");

    if (jwt_token === undefined) {
        return NextResponse.redirect(`${request.nextUrl.origin}/login`)
    }
}
