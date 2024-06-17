"use client";

import Input from "@/components/input";
import Button from "@/components/button";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useFormState } from "react-dom";
import { createAccount } from "./action";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function CreateAccount() {
    const [state, dispatch] = useFormState(createAccount, null);
    // console.log("state for dispatch: ", state);

    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">안녕하세요!</h1>
                <h2 className="text-xl">Fill in the form below to join!</h2>
            </div>

            <form action={dispatch} className="flex flex-col gap-3">
                <Input
                    name="username"
                    type="text"
                    placeholder="UserName"
                    required
                    minLength={PASSWORD_MIN_LENGTH}
                    maxLength={10}
                    errors={state?.fieldErrors?.username}
                />

                <Input
                    name="email"
                    type="text"
                    placeholder="Email"
                    required
                    minLength={PASSWORD_MIN_LENGTH}
                    errors={state?.fieldErrors?.email}
                />

                <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    minLength={PASSWORD_MIN_LENGTH}
                    errors={state?.fieldErrors?.password}
                />

                <Input
                    name="confirm_password"
                    type="password"
                    placeholder="Confirm Password"
                    required
                    minLength={PASSWORD_MIN_LENGTH}
                    errors={state?.fieldErrors?.confirm_password}
                />

                <Button text="Create Account" />
            </form>

            <div className="w-full h-px bg-neutral-500" />

            <div>
                <Link
                    className="primary-btn flex h-10 items-center justify-center gap-2"
                    href="/sms"
                >
                    <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
                    <span>Sign up with SMS</span>
                </Link>
            </div>
        </div>
    );
}
