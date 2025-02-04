"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="poppins py-[3.1rem] fixed top-0 left-0 h-screen w-[28.6rem] border-r border-black flex flex-col overflow-y-scroll scrollbar-hide">
      <Image
        src="images/desub_logo.png"
        alt="desub_logo"
        width={140}
        height={33}
        className="ml-[3rem]"
      />
      <h2 className="pt-[1.1rem] pl-[3.5rem] pb-[2.9rem] font-semibold text-[2.5rem]">
        Admin
      </h2>
      <div className="flex flex-col gap-[1.6rem] text-[1.8rem] px-[1.6rem]">
        <Link
          href="/dashboard"
          className={`rounded px-[1.7rem] py-[0.8rem] ${
            pathname === "/dashboard" ? "bg-[#F3F3F3] font-bold" : ""
          }`}
        >
          대시보드
        </Link>
        <Link
          href="/"
          className={`rounded px-[1.7rem] py-[0.8rem] ${
            pathname === "/task-request" ? "bg-[#F3F3F3] font-bold" : ""
          }`}
        >
          작업요청관리
        </Link>
        <Link
          href="/"
          className={`rounded px-[1.7rem] py-[0.8rem] ${
            pathname === "/consultation" ? "bg-[#F3F3F3] font-bold" : ""
          }`}
        >
          상담예약관리
        </Link>
        <Link
          href="/"
          className={`rounded px-[1.7rem] py-[0.8rem] ${
            pathname === "/online-meeting" ? "bg-[#F3F3F3] font-bold" : ""
          }`}
        >
          온라인미팅관리
        </Link>
        <Link
          href="/"
          className={`rounded px-[1.7rem] py-[0.8rem] ${
            pathname === "/subscription-product" ? "bg-[#F3F3F3] font-bold" : ""
          }`}
        >
          구독상품관리
        </Link>
        <Link
          href="/subscription-status"
          className={`rounded px-[1.7rem] py-[0.8rem] ${
            pathname === "/subscription-status" ? "bg-[#F3F3F3] font-bold" : ""
          }`}
        >
          구독현황관리
        </Link>
        <Link
          href="/subscription-cancel"
          className={`rounded px-[1.7rem] py-[0.8rem] ${
            pathname === "/subscription-cancel" ? "bg-[#F3F3F3] font-bold" : ""
          }`}
        >
          구독취소관리
        </Link>
        <Link
          href="/"
          className={`rounded px-[1.7rem] py-[0.8rem] ${
            pathname === "/sales" ? "bg-[#F3F3F3] font-bold" : ""
          }`}
        >
          매출관리
        </Link>
        <Link
          href="/"
          className={`rounded px-[1.7rem] py-[0.8rem] ${
            pathname === "/customer" ? "bg-[#F3F3F3] font-bold" : ""
          }`}
        >
          고객관리
        </Link>
        <Link
          href="/"
          className={`rounded px-[1.7rem] py-[0.8rem] ${
            pathname === "/kickoff-form" ? "bg-[#F3F3F3] font-bold" : ""
          }`}
        >
          킥오프 폼양식 관리
        </Link>
        <Link
          href="/"
          className={`rounded px-[1.7rem] py-[0.8rem] ${
            pathname === "/review" ? "bg-[#F3F3F3] font-bold" : ""
          }`}
        >
          리뷰관리
        </Link>
      </div>
      <div className="mt-auto pt-[2rem]">
        <div className="flex flex-col gap-[2.4rem] px-[3.5rem] text-[1.8rem]">
          <Link href="/">계정관리</Link>
          <Link href="/">로그관리</Link>
        </div>
        <p className="mt-[2.4rem] px-[3.3rem] font-light text-[1.3rem]">v1.0</p>
      </div>
    </div>
  );
};

export default Sidebar;
