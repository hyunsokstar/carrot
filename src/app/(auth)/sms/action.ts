"use server";
import { z } from "zod";


import validator from "validator";
import { redirect } from "next/navigation";


interface ActionState {
    token: boolean;
}
const phoneSchema = z.string().trim().refine(validator.isMobilePhone);
const tokenSchema = z.coerce.number().min(100000).max(999999);


// export async function smsLogIn(prevState: any, formData: FormData) {
export async function smsLogIn(prevState: ActionState, formData: FormData) {


    const phone = formData.get("phone");
    const token = formData.get("token");

    // 토큰이 false 즉 폰번호 입력 단계일 경우
    if (!prevState.token) {

        // 폰번호 검증
        const result = phoneSchema.safeParse(phone);

        if (!result.success) { // 폰번호 검증 성공시
            return {
                token: false,
                error: result.error.flatten(),
            };
        } else { // 폰번호 검증 실패시
            return {
                token: true,
            };
        }
    } else { // token 이 true 일 경우 즉 token 검증 단계일 경우
        const result = tokenSchema.safeParse(token);
        if (!result.success) { // 토큰이 유효하지 않을 경우
            return {
                token: true,
                error: result.error.flatten(),
            };
        } else { // 토큰이 유효할 경우
            redirect("/");
        }
    }


}