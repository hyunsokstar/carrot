"use client"
import { useFormStatus } from 'react-dom';

interface FormButtonProps {
    text: string;
}


export default function Button({ text }: FormButtonProps) {
    const { pending } = useFormStatus();


    return (
        <button
            // disabled={loading}
            disabled={pending}
            className="
                h-10
                primary-btn
                disabled:cursor-not-allowed
                disabled:bg-neutral-400
                disabled:text-neutral-300
            "
        >
            {/* {loading ? "로딩 중" : text} */}
            {pending ? "Loading..." : text}
        </button>
    );
}