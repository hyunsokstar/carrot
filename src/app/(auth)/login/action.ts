"use server";

import {
    PASSWORD_MIN_LENGTH,
    PASSWORD_REGEX,
    PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import db from "@/lib/db";

const formSchema = z.object({
    email: z.string().email().toLowerCase(),
    password: z
        .string({
            required_error: "Password is required",
        })
        .min(PASSWORD_MIN_LENGTH)
    // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function logIn(prevState: any, formData: FormData) {
    const data = {
        email: formData.get("email"),
        password: formData.get("password"),
    };
    // const result = formSchema.safeParse(data);
    const result = await formSchema.safeParseAsync(data);


    if (!result.success) { // 로그인 실패시
        console.log(result.error.flatten());
        return result.error.flatten();
    } else { // 로그인 성공시
        console.log(result.data);

        // 로그인 성공시 다음과 같이 유저 정보를 다시 디비에서 조회 한뒤 getSession() 함수를 이용해 로그인 처리 후 프로필 페이지로 리다이렉트
        // 실패시 비밀번호 에러 정보를 응답 (단, zod 와 같은 방식)
        const user = await db.user.findUnique({
            where: {
                email: result.data.email,
            },
            select: {
                id: true,
                password: true,
            },
        });
        const ok = await bcrypt.compare(
            result.data.password,
            user!.password ?? "xxxx"
        );
        if (ok) {
            const session = await getSession();
            session.id = user!.id;
            await session.save() // 이거 해야 서버와 클라이언트 로그인 유저 정보 동기화 됨
            await redirect("/profile");
        } else {
            return {  // zod 와 같은 형식으로 에러 정보 리턴
                fieldErrors: {
                    password: ["Wrong password."],
                    email: [],
                },
            };
        }

    }
}
