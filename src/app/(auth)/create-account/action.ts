"use server";
import { z } from "zod";
import {
    PASSWORD_MIN_LENGTH,
} from "@/lib/constants";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";


const formSchema = z
    .object({
        username: z
            .string({
                invalid_type_error: "Username must be a string!",
                required_error: "Where is my username???",
            })
            .min(3, "Way too short!!!")
            .max(10, "That is too looooong!")
            .trim()
            .toLowerCase()
            .transform((username) => `${username}`),
        // .refine(checkUniqueUsername, "This username is already taken"),
        email: z.string()
            .email(),
        // .refine(checkUniqueEmail, "this email is already taken"),
        password: z.string()
            .min(PASSWORD_MIN_LENGTH),
        confirm_password: z.string()
    })
    .superRefine(({ password, confirm_password }, ctx) => {
        if (password !== confirm_password) {
            ctx.addIssue({
                code: "custom",
                message: "Two passwords should be equal",
                path: ["confirm_password"],
            });
        }
    }).
    superRefine(async ({ username }, ctx) => {
        const user = await db.user.findUnique({
            where: {
                username,
            },
            select: {
                id: true,
            },
        });
        if (user) {
            ctx.addIssue({
                code: "custom",
                message: "This username is already taken",
                path: ["username"],
                fatal: true,
            });
            return z.NEVER;
        }
    })
    .superRefine(async ({ email }, ctx) => {
        const user = await db.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
            },
        });
        if (user) {
            ctx.addIssue({
                code: "custom",
                message: "This email is already taken",
                path: ["email"],
                fatal: true,
            });
            return z.NEVER;
        }
    })



export async function createAccount(prevState: any, formData: FormData) {
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
    };


    // const result = formSchema.safeParse(data);
    const result = await formSchema.safeParseAsync(data); // db 로직 실행 이므로 await 필요


    if (!result.success) {
        return result.error.flatten();
    } else { // 유효성 검사 성공적으로 통과시
        // console.log(result.data);
        const hashedPassword = await bcrypt.hash(result.data.password, 12); // 비밀 번호 해쉬화


        // db 에 회원 정보 신규 생성
        const user = await db.user.create({
            data: {
                username: result.data.username,
                email: result.data.email,
                password: hashedPassword
            },
            select: {
                id: true
            }
        })
        // console.log("user : ", user);

        // 쿠키 객체 생성
        // const cookie = await getIronSession(cookies(), {
        //     cookieName: "delicious-karrot",
        //     password: process.env.COOKIE_PASSWORD!,
        // });

        // 쿠키 정보 생성
        // //@ts-ignore
        // cookie.id = user.id;
        // await cookie.save();
        const session = await getSession();
        session.id = user.id;
        await session.save();


        // 프로필 페이지로 리다이렉트
        redirect("/profile");

    }
}