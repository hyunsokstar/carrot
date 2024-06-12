import TabBar from "@/components/tab-bar";

export default function TabLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen">
            <div className="pb-20 overflow-y-auto"> {/* overflow-y-auto 추가 */}
                {children}
            </div>
            <div className="fixed bottom-0 left-0 right-0 w-1/2 mx-auto">
                <TabBar />
            </div>
        </div>
    );
}