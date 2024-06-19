import React, { useState } from 'react';
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";


interface LikeButtonProps {
    id: number;
    isLiked: boolean;
    likeCount: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ id, isLiked: initialIsLiked, likeCount: initialLikeCount }) => {
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [likeCount, setLikeCount] = useState(initialLikeCount);

    const handleLike = async () => {
        if (isLiked) {
            await fetch(`/api/posts/${id}/dislike`, {
                method: 'POST',
            });
            setIsLiked(false);
            setLikeCount(likeCount - 1);
        } else {
            await fetch(`/api/posts/${id}/like`, {
                method: 'POST',
            });
            setIsLiked(true);
            setLikeCount(likeCount + 1);
        }
    };

    return (


        <div
            className="flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2 cursor-pointer"
            onClick={handleLike}>
            {isLiked ? (
                <HandThumbUpIcon className="size-5 text-orange-500" />
            ) : (
                <OutlineHandThumbUpIcon className="size-5" />
            )}
            <span>{isLiked ? likeCount : `공감하기 (${likeCount})`}</span>
        </div>

    );
};

export default LikeButton;
