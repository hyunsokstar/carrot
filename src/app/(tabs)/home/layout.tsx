import TabBar from "@/components/tab-bar";


export default function HomeLayout({
    children,
    // modal,
}: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
    return (
        <>
            {children}
            {/* {modal} */}
        </>
    );
}