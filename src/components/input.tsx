
import { InputHTMLAttributes } from "react";

// interface FormInputProps {
interface InputProps {
    name: string;
    errors?: string[];
    // type: string;
    // placeholder: string;
    // required: boolean;
}

export default function FormInput({
    // type,
    // placeholder,
    // required,
    errors = [],
    name,
    ...rest
    // }: FormInputProps) {
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
    // console.log(rest);

    return (
        <div className="flex flex-col gap-2">
            <input
                name={name}
                className="
                    w-full h-10 rounded-md border-none 
                    bg-transparent
                    focus:outline-none ring-2 
                    focus:ring-4 ring-neutral-200 focus:ring-orange-500 
                    placeholder:text-neutral-400
                    transition
                "
                // type={type}
                // placeholder={placeholder}
                // required={required}
                {...rest}
            />

            {errors.map((error, index) => (
                <span key={index} className="text-red-500 font-medium">
                    {error}
                </span>
            ))}
        </div>
    );
}
