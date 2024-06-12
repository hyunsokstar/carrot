"use client";

import {
    HomeIcon as SolidHomeIcon,
    NewspaperIcon as SolidNewspaperIcon,
    ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
    VideoCameraIcon as SolidVideoCameraIcon,
    UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import {
    HomeIcon as OutlineHomeIcon,
    NewspaperIcon as OutlineNewspaperIcon,
    ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
    VideoCameraIcon as OutlineVideoCameraIcon,
    UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
    const pathname = usePathname();

    return (
        <div className="flex justify-between border-2 border-gray-100">
            {/* Button 1 */}
            <Link href="/products" className="flex flex-col items-center gap-px py-2 px-4">
                {pathname === "/products" ? (
                    <SolidHomeIcon className="w-7 h-7 text-yellow-500" />
                ) : (
                    <OutlineHomeIcon className="w-7 h-7" />
                )}
                <span>홈</span>
            </Link>

            {/* Button 2 */}
            <Link href="/life" className="flex flex-col items-center gap-px py-2 px-4">
                {pathname === "/life" ? (
                    <SolidNewspaperIcon className="w-7 h-7 text-yellow-500" />
                ) : (
                    <OutlineNewspaperIcon className="w-7 h-7" />
                )}
                <span>동네생활</span>
            </Link>

            {/* Button 3 */}
            <Link href="/chat" className="flex flex-col items-center gap-px py-2 px-4">
                {pathname === "/chat" ? (
                    <SolidChatIcon className="w-7 h-7 text-yellow-500" />
                ) : (
                    <OutlineChatIcon className="w-7 h-7" />
                )}
                <span>채팅</span>
            </Link>

            {/* Button 4 */}
            <Link href="/profile" className="flex flex-col items-center gap-px py-2 px-4">
                {pathname === "/profile" ? (
                    <SolidUserIcon className="w-7 h-7 text-yellow-500" />
                ) : (
                    <OutlineUserIcon className="w-7 h-7" />
                )}
                <span>나의 당근</span>
            </Link>
        </div>
    );
}