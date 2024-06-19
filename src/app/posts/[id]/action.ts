"use server"
import db from '@/lib/db';
import getSession from "@/lib/session";
// import { revalidateTag } from "next/cache";
import { revalidateTag, unstable_cache as nextCache } from "next/cache";


export async function incrementViewCount(id: number) {
    try {
        await db.post.update({
            where: { id },
            data: { views: { increment: 1 } },
        });
    } catch (e) {
        console.error("Failed to increment view count:", e);
    }
}

export async function getLikeCount(postId: number) {
    const count = await db.like.count({
        where: { postId },
    });
    return count;
}

export const getCachedLikeCount = (postId: number) => nextCache(async () => {
    const count = await getLikeCount(postId);
    return count;
}, ["like-count"], {
    tags: [`likes-${postId}`],
});



export async function getPost(id: number) {
    try {
        const post = await db.post.findUnique({
            where: { id },
            include: {
                user: {
                    select: { username: true, avatar: true },
                },
                _count: {
                    select: { comments: true, likes: true },
                },
            },
        });
        await incrementViewCount(id);

        return post;
    } catch (e) {
        return null;
    }
}

export const getCachedPost = nextCache(getPost, ["post-cache"], {
    revalidate: 10,
});

export async function likePost(id: number) {
    const session = await getSession();
    console.log("like post id check :", id);
    console.log("like user id check :", session.id);

    try {
        await db.like.create({
            data: {
                postId: id,
                userId: session.id!,
            },
        });
        revalidateTag(`likes-${id}`);
    } catch (e) {
        console.log("e : ", e);
    }
}

export async function dislikePost(id: number) {
    try {
        const session = await getSession();
        await db.like.delete({
            where: {
                id: {
                    postId: id,
                    userId: session.id!,
                },
            },
        });
        revalidateTag(`likes-${id}`);
    } catch (e) {
        console.log("e : ", e);
    }
}

export async function getLikeStatus(postId: number) {
    const session = await getSession();
    const like = await db.like.findUnique({
        where: {
            id: {
                postId,
                userId: session.id!,
            },
        },
    });
    return Boolean(like);
}

export async function getCachedLikeStatus(postId: number, sessionId: number | undefined) {
    const cachedOperation = nextCache(async (postId: number, sessionId: number | undefined) => {
        const like = await db.like.findUnique({
            where: {
                id: {
                    postId,
                    userId: sessionId ?? 0,
                },
            },
        });
        return Boolean(like);
    }, ["product-like-status"], {
        tags: [`likes-${postId}`],
    });
    return cachedOperation(postId, sessionId);
}
