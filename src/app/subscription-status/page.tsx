"use client";
import { useMemo, useState } from "react";
import { Subscriber } from "@/types/subscriber";
import SubscriberCount from "../components/subscription-status/SubscriberCount";
import SubscriptionTable from "../components/subscription-status/SubscriotionTable";
import ExportExcelButton from "../components/subscription-status/ExportExcelButton";

export default function SubscriptionManagement() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    {
      name: "홍길동",
      email: "gildong.hong@gmail.com",
      phone: "010-1234-5678",
      status: "진행중",
      startDate: "2025-01-12",
      endDate: "2025-01-13",
      expiryDate: "2025-02-13",
    },
    {
      name: "홍길똥",
      email: "gilddong.hong@gmail.com",
      phone: "010-1234-5679",
      status: "일시정지",
      startDate: "2025-01-13",
      endDate: "2025-01-14",
      expiryDate: "2026-01-13",
    },
  ]);

  const [filters, setFilters] = useState({
    inProgress: false,
    paused: false,
  });

  const handleFilterChange = (filterName: "inProgress" | "paused") => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const filteredSubscribers = useMemo(() => {
    if (!filters.inProgress && !filters.paused) {
      return subscribers;
    }

    return subscribers.filter((subscriber) => {
      if (filters.inProgress && subscriber.status === "진행중") return true;
      if (filters.paused && subscriber.status === "일시정지") return true;
      return false;
    });
  }, [subscribers, filters]);

  return (
    <div className="p-[3.1rem]">
      <h1 className="text-[3.5rem] mt-[2.1rem] font-bold">구독현황관리</h1>

      <SubscriberCount totalCount={0} newCount={0} pausedCount={0} />

      <div className="flex justify-between items-center mt-[4.9rem]">
        <ExportExcelButton data={subscribers} fileName="구독자_목록" />

        <div className="space-x-7">
          <select className="border border-black p-2 w-[17rem]">
            <option>이름</option>
          </select>
          <input type="text" className="border p-2 w-[17rem]" />
        </div>
      </div>

      <div className="flex mt-[2.5rem] text-[1.3rem] gap-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={filters.inProgress}
            onChange={() => handleFilterChange("inProgress")}
          />
          진행중
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={filters.paused}
            onChange={() => handleFilterChange("paused")}
          />
          일시정지
        </label>
      </div>
      <p className="my-[1.5rem] text-[1.3rem] text-[#4D4D4D]">
        검색 결과 : {filteredSubscribers.length}
      </p>

      <SubscriptionTable subscribers={filteredSubscribers} />
    </div>
  );
}
