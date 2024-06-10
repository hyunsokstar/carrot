"use client";


import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { uploadProduct } from "./action";



export default function AddProduct() {
    const [preview, setPreview] = useState("");

    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { files },
        } = event;
        if (!files) {
            return;
        }

        // 업로드할 파일 정보 초기화
        const file = files[0];
        // 미리 보기 image url 초기화
        const url = URL.createObjectURL(file);
        // 미리 보기 image url 상태에 설정
        setPreview(url);
    };


    return (
        <div>
            {/* action 과 이미지 업로드 디스패치 연동 */}
            <form action={uploadProduct} className="p-5 flex flex-col gap-5">
                {/* 미리 보기 이미지 있을시 출력 되도록 설정 */}
                {preview ? (
                    <label
                        htmlFor="photo"
                        className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
                        style={{
                            backgroundImage: `url(${preview})`,
                        }}
                    >
                        <PhotoIcon className="w-20" />
                    </label>
                ) : (
                    <label
                        htmlFor="photo"
                        className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer"
                    >
                        <PhotoIcon className="w-20" />
                        <div className="text-neutral-400 text-sm">사진을 추가해주세요.</div>
                    </label>
                )}
                <input
                    onChange={onImageChange}
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    className="hidden"
                />
                <Input name="title" required placeholder="제목" type="text" />
                <Input name="price" type="number" required placeholder="가격" />
                <Input
                    name="description"
                    type="text"
                    required
                    placeholder="자세한 설명"
                />
                <Button text="작성 완료" />
            </form>
        </div>
    );
}

