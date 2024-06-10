import TabBar from "@/components/tab-bar";

export default function TabLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="border-2 border-red-500">
            {children}
            <TabBar />
        </div>
    );
}