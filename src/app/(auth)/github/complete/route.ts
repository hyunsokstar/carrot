import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get("code");
    console.log("code : ", code);

    if (!code) {
        return notFound();
    }

    const accessTokenParams = new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID!,
        client_secret: process.env.GITHUB_CLIENT_SECRET!,
        code,
    }).toString();

    const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;
    const accessTokenResponse = await fetch(accessTokenURL, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
    });

    // const accessTokenData = await accessTokenResponse.json();
    // if ("error" in accessTokenData) {
    //     return new Response(null, {
    //         status: 400,
    //     });
    // }

    // return Response.json({ accessTokenData });

    const { error, access_token } = await accessTokenResponse.json();
    if (error) {
        return new Response(null, {
            status: 400,
        });
    }

    const userProfileResponse = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        cache: "no-cache",
    });
    const { id, avatar_url, login } = await userProfileResponse.json();

    // return Response.json({ id, avatar_url, login });
    // 얻어온 user 정보가 db의 user 모델에 저장 되어 있는지 확인 
    const user = await db.user.findUnique({
        where: {
            github_id: id + "",
        },
        select: {
            id: true,
        },
    });

    // 있으면 로그인 시키고 프로필 페이지로 리다이렉트
    if (user) {
        const session = await getSession();
        session.id = user.id;
        await session.save();
        return redirect("/profile");
    }

    // 없으면 회원 가입 시키기
    const newUser = await db.user.create({
        data: {
            username: login,
            github_id: id + "",
            avatar: avatar_url,
        },
        select: {
            id: true,
        },
    });

    // 있으면 로그인 처리
    const session = await getSession();
    session.id = newUser.id;
    await session.save();

    // 프로필 페이지로 리다이렉트 
    return redirect("/profile");

}
