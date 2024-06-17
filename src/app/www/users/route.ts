// app\www\users\route.ts
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    console.log(request);
    return Response.json({
        ok: true,
    });
}


// post, http://127.0.0.1:3001/www/users 에 대한 처리
export async function POST(request: NextRequest) {
    const data = await request.json();
    // console.log("log the user in!!!");
    return Response.json(data);
}