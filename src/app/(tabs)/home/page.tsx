import ProductList from "@/components/porduct-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache, revalidatePath } from "next/cache";
export const dynamic = "force-dynamic";


export type InitialProducts = Prisma.PromiseReturnType<
    typeof getInitialProducts
>;

// const getCachedProducts = nextCache(getInitialProducts, ["home-products"], {
//     revalidate: 60,
// });

const getCachedProducts = nextCache(getInitialProducts, ["home-products"]);

async function getInitialProducts() {
    console.log("hit!!!!");
    const products = await db.product.findMany({
        select: {
            title: true,
            price: true,
            created_at: true,
            photo: true,
            id: true,
        },
        orderBy: {
            created_at: "desc",
        },
    });
    return products;
}

export const metadata = {
    title: "Home",
};


export default async function Products() {
    // const products = await getProducts();
    const initialProducts = await getCachedProducts();

    const revalidate = async () => {
        "use server";
        revalidatePath("/home");
    };

    return (
        // <div className="p-5 flex flex-col gap-5">
        //     {products.length ? products.map((product) => (
        //         <ListProduct key={product.id} {...product} />
        //     )) : "no data"}
        // </div>
        <>
            <ProductList initialProducts={initialProducts} />

            <form action={revalidate}>
                <button>Revalidate</button>
            </form>
        </>

    );
}