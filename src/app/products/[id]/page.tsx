import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToWon } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";


async function getIsOwner(userId: number) {
    const session = await getSession();
    if (session.id) {
        return session.id === userId;
    }
    return false;
}

async function getProduct(id: number) {
    console.log("get product check");
    const product = await db.product.findUnique({
        where: {
            id,
        },
        include: {
            user: {
                select: {
                    username: true,
                    avatar: true,
                },
            },
        },
    });
    return product;
}

const getCachedProduct = nextCache(getProduct, ["product-detail"], {
    tags: ["product-detail", "xxxx"],
});

// 타이틀도 디비에서 각각 불러 오도록 수정
async function getProductTitle(id: number) {

    console.log("get product title check");
    const product = await db.product.findUnique({
        where: {
            id,
        },
        select: {
            title: true,
        },
    });
    return product;
}

const getCachedProductTitle = nextCache(getProductTitle, ["product-title"], {
    tags: ["product-title", "xxxx"],
});

export async function generateMetadata({ params }: {
    params: { id: string };
}) {
    // const product = await getProduct(Number(params.id));
    const product = await getCachedProductTitle(Number(params.id));

    return {
        title: product?.title,
    };
}

export default async function ProductDetail({
    params,
}: {
    params: { id: string };
}) {
    const id = Number(params.id);
    if (isNaN(id)) {
        return notFound();
    }
    // const product = await getProduct(id);
    const product = await getCachedProduct(id);

    if (!product) {
        return notFound();
    }
    const isOwner = await getIsOwner(product.userId);

    const revalidate = async () => {
        "use server";
        revalidateTag("xxxx");
    };

    return (
        <div>
            {/* 박스1 */}
            {/* {product.photo} */}
            <div className="relative aspect-square">
                {/* <Image fill src={product.photo} alt={product.title} /> */}
                <Image
                    fill
                    // src={product.photo}
                    src={`${product.photo}/public`}
                    alt={product.title}
                    className="object-cover"
                />
            </div>

            {/* 박스2 */}
            <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
                <div className="size-10 rounded-full">
                    {product.user.avatar !== null ? (
                        <Image
                            src={product.user.avatar}
                            width={40}
                            height={40}
                            alt={product.user.username}
                        />
                    ) : (
                        <UserIcon />
                    )}
                </div>
                <div>
                    <h3>{product.user.username}</h3>
                </div>
            </div>

            {/* 박스3 */}
            <div className="p-5 border border-red-100 border-b-0">
                <h1 className="text-2xl font-semibold">{product.title}</h1>
                <p>{product.description}</p>
            </div>

            {/* 위의 내용들과 넓이가 같게 만들려면? */}
            <div
                className="
                    p-5
                    py-6
                    bottom-0
                    flex
                    justify-between
                    items-center
                    bg-neutral-800
                    border
                    border-red-100
                "
            >
                <span className="font-semibold text-xl">
                    {formatToWon(product.price)}원
                </span>
                {/* {isOwner ? (
                    <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
                        Delete product
                    </button>
                ) : null} */}
                <form action={revalidate}>
                    <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
                        Revalidate title cache
                    </button>
                </form>
                <Link
                    className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
                    href={``}
                >
                    채팅하기
                </Link>
            </div>
        </div>
    );
}

// src\app\(tabs)\home\@modal\(..)products\[id]\page.tsx
// src\app\products\[id]\page.tsx