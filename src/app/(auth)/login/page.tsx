"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";

// import { handleForm } from "./action";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { logIn } from "./action";



export default function LogIn() {
    const [state, dispatch] = useFormState(logIn, null);


    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">안녕하세요!</h1>
                <h2 className="text-xl">Log in with email and password.</h2>
            </div>
            <form
                className="flex flex-col gap-3"
                // action={action}
                action={dispatch}
            >
                <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    // required errors={[]}
                    errors={state?.fieldErrors.email}
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    // errors={state?.errors ?? []}
                    minLength={PASSWORD_MIN_LENGTH}
                    errors={state?.fieldErrors.password}
                />
                <Button
                    // loading={false}
                    text="Log in"
                />
            </form>
            <SocialLogin />
        </div>
    );
}