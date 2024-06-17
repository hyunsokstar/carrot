"use client";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getProduct } from "../../action";



export default function Modal({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [product, setProduct] = useState<any | null>(null);


    const onCloseClick = () => {
        router.back();
    };


    useEffect(() => {
        const fetchProduct = async () => {
            const id = Number(params.id);
            if (!isNaN(id)) {
                const fetchedProduct = await getProduct(id);
                setProduct(fetchedProduct);
            }
        };
        fetchProduct();
    }, [params.id]);


    return (
        <div className="
            absolute left-0 top-0 flex items-center justify-center
            w-full h-full z-50bg-black bg-opacity-60
            "
        >
            <button
                onClick={onCloseClick}
                className="absolute right-5 top-5 text-neutral-200"
            >
                <XMarkIcon className="size-10" />
            </button>
            <div className="max-w-screen-sm h-1/2 flex justify-center w-full">
                <div className="aspect-square bg-neutral-700 text-neutral-200  rounded-md flex justify-center items-center">
                    {product ? (
                        <>
                            <div className="relative w-full h-full">
                                <Image
                                    fill
                                    src={`${product.photo}/public`}
                                    alt={product.photo}
                                    className="object-cover"
                                />
                            </div>
                        </>
                    ) : (
                        <PhotoIcon className="h-28" />
                    )}
                </div>
            </div>
        </div>
    );
}