"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useFormState } from "react-dom";

// import { uploadProduct } from "./action";
import { uploadProduct, getUploadUrl } from "./action";

export default function AddProduct() {
    const [preview, setPreview] = useState("");
    const [uploadUrl, setUploadUrl] = useState("");

    // const [state, action] = useFormState(uploadProduct, null);

    // 나중에 이미지에 접근하기 위한 id 를 상태로 관리
    const [photoId, setImageId] = useState("");

    // 이미지 선택시에 upload url 도 얻어 오기 with getUploadUrl()
    const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { files },
        } = event;
        if (!files) {
            return;
        }
        const file = files[0];
        const url = URL.createObjectURL(file);
        setPreview(url);

        const { success, result } = await getUploadUrl();
        console.log("result : ", result);
        if (success) {
            const { id, uploadURL } = result;
            console.log("uploadUrl : ", uploadURL);

            setImageId(id)

            setUploadUrl(uploadURL);
        } else {
            console.log("get upload url faile?");
        }
    };

    const interceptAction = async (_: any, formData: FormData) => {
        const file = formData.get("photo");
        console.log("file : ", file);


        if (!file) {
            return;
        }


        const cloudflareForm = new FormData();
        cloudflareForm.append("file", file);
        const response = await fetch(uploadUrl, {
            method: "post",
            body: cloudflareForm,
        });
        if (response.status !== 200) {
            return;
        }
        const photoUrl = `https://imagedelivery.net/GDnsAXwwoW7vpBbDviU8VA/${photoId}`;
        formData.set("photo", photoUrl);
        return uploadProduct(formData);
    };
    const [state, action] = useFormState(interceptAction, null);

    return (
        <div>
            <form action={action} className="p-5 flex flex-col gap-5">
                {uploadUrl ? uploadUrl : ""}
                <label
                    htmlFor="photo"
                    className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
                    style={{
                        backgroundImage: `url(${preview})`,
                    }}
                >
                    {preview === "" ? (
                        <>
                            <PhotoIcon className="w-20" />
                            <div className="text-neutral-400 text-sm">
                                사진을 추가해주세요.
                                {/* {state?.fieldErrors.photo} */}
                            </div>
                        </>
                    ) : null}
                </label>
                <input
                    onChange={onImageChange}
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    className="hidden"
                />
                <Input
                    name="title"
                    required
                    placeholder="제목"
                    type="text"
                // errors={state?.fieldErrors.title}
                />
                <Input
                    name="price"
                    type="number"
                    required
                    placeholder="가격"
                // errors={state?.fieldErrors.price}
                />
                <Input
                    name="description"
                    type="text"
                    required
                    placeholder="자세한 설명"
                // errors={state?.fieldErrors.description}
                />
                <Button text="작성 완료" />
            </form>
        </div>
    );
}