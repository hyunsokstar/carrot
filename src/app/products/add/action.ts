// action.ts
"use server";

import { z } from "zod";
import fs from "fs/promises";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const productSchema = z.object({
    photo: z.string({
        required_error: "Photo is required",
    }),
    title: z.string({
        required_error: "Title is required",
    }),
    description: z.string({
        required_error: "Description is required",
    }),
    price: z.coerce.number({
        required_error: "Price is required",
    }),
});

// function isBlob(value: Blob | null): value is Blob {
//     return value !== null && typeof value !== "string" && !Number.isNaN(value as any);
// }

export async function uploadProduct(formData: FormData) {
    const imageUrl = formData.get("photo");
    const data = {
        // photo: formData.get("photo"),
        photo: imageUrl,
        title: formData.get("title"),
        price: formData.get("price"),
        description: formData.get("description"),
    };

    // const photoValue = data.photo as Blob;

    // if (isBlob(photoValue)) {
    //     const photoData = await photoValue.arrayBuffer();
    //     const fileName = `${Date.now()}.${photoValue.type.split("/")[1]}`;
    //     await fs.appendFile(`./public/${fileName}`, Buffer.from(photoData));
    //     data.photo = `/${fileName}`;
    // } else {
    //     // 사진이 없는 경우 처리할 로직 추가
    //     return { error: "Photo is required" };
    // }

    const result = productSchema.safeParse(data);

    if (!result.success) {
        return result.error.flatten();
    } else {
        const session = await getSession();
        if (session.id) {
            const product = await db.product.create({
                data: {
                    title: result.data.title,
                    description: result.data.description,
                    price: result.data.price,
                    photo: result.data.photo,
                    user: {
                        connect: {
                            id: session.id,
                        },
                    },
                },
                select: {
                    id: true,
                },
            });
            redirect(`/products/${product.id}`);
            //redirect("/products")
        }
    }
}

//.. 이전 코드  
export async function getUploadUrl() {
    const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
            },
        }
    );
    const data = await response.json();
    return data;
}