import React from 'react';
import Link from "next/link";
import "@/lib/db"


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-20 min-h-screen border border-white-100">
      <div className="flex flex-col items-center gap-2">
        <span className='text-9xl'>🥕</span>
        <h1 className='text-4xl'>당근</h1>
        <h2 className='text-2xl'>당근 마켓에 어서오세요!</h2>
      </div>

      <div className='flex flex-col items-center gap-3'>
        <Link
          href="/create-account"
          className="
          py-2.5 px-5 text-center text-white bg-orange-500 hover:bg-orange-400 transition-colors rounded-md
          "
        >
          시작하기
        </Link>
        <div className='flex gap-2'>
          <span>이미 계정이 있나요?</span>
          <Link
            href="/login"
            className='hover:underline'
          >
            로그인
          </Link>

        </div>
      </div>
    </div>
  );
}
