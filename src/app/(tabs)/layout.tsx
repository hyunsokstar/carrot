import TabBar from "@/components/tab-bar";

export default function TabLayout({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="
            w-full mx-auto
            ">
            {children}

            <TabBar />
        </div>
    );
}
