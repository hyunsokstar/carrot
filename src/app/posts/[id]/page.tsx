'use client'; // 클라이언트 컴포넌트로 설정

import React, { useEffect, useState } from 'react';
import { EyeIcon } from "@heroicons/react/24/solid";
import { notFound, useParams } from 'next/navigation';
import Image from "next/image";
import { formatToTimeAgo } from "@/lib/utils";
import { getLikeStatus, getCachedPost } from './action';
import LikeButton from '@/components/LikeButton';

const PostDetail = () => {
    const params = useParams();
    const id = Number(params.id);
    const [post, setPost] = useState<any>(null);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (isNaN(id)) {
            notFound(); // id가 유효하지 않으면 404 페이지로 이동
            return;
        }

        async function fetchData() {
            try {
                const fetchedPost = await getCachedPost(id);
                if (!fetchedPost) {
                    notFound(); // 포스트가 없으면 404 페이지로 이동
                    return;
                }
                setPost(fetchedPost);

                const likeStatus = await getLikeStatus(id);
                setIsLiked(likeStatus);
            } catch (error) {
                console.error('Error fetching data:', error);
                notFound(); // 오류 발생 시 404 페이지로 이동
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>; // 데이터를 가져오는 동안 로딩 상태 표시
    }

    if (!post) {
        return null; // post가 없을 경우 null 반환
    }

    return (
        <div className="p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
                <Image
                    width={28}
                    height={28}
                    className="size-7 rounded-full"
                    src={post.user.avatar!}
                    alt={post.user.username}
                />
                <div>
                    <span className="text-sm font-semibold">{post.user.username}</span>
                    <div className="text-xs">
                        <span>{formatToTimeAgo(post.created_at.toString())}</span>
                    </div>
                </div>
            </div>
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="mb-5">{post.description}</p>
            <div className="flex flex-col gap-5 items-start">
                <div className="flex items-center gap-2 text-neutral-400 text-sm">
                    <EyeIcon className="size-5" />
                    <span>조회 {post.views}</span>
                </div>
                {/* likeCount: {post._count.likes} */}
                <LikeButton id={post.id} isLiked={isLiked} likeCount={post._count.likes} />
            </div>
        </div>
    );
};

export default PostDetail;
