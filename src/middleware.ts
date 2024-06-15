import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
    [key: string]: boolean;
}

// 퍼블릭 페이지: 비로그인 상태에서 접근 가능한 페이지
const publicOnlyUrls: Routes = {
    "/": true,
    "/login": true,
    "/sms": true,
    "/create-account": true,
    "/github/start": true,
    "/github/complete": true
};

export async function middleware(request: NextRequest) {
    const session = await getSession();
    const exists = publicOnlyUrls[request.nextUrl.pathname];

    if (!session.id) { // 비로그인 상태
        if (!exists) { // 현재 요청이 비로그인 상태에서 요청 가능한 범위에 있지 않다면 
            return NextResponse.redirect(new URL("/", request.url)); // 디폴트 페이지로 리다이렉트
        }
    } else { // 로그인 상태
        if (exists) { // 퍼블릭 페이지 즉 비로그인 상태에서만 접근 할수 있는 페이지를 요청한 경우
            return NextResponse.redirect(new URL("/home", request.url)); // products 페이지로 리다이렉트
        }
    }
}


export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};