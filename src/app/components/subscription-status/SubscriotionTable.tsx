import { SortField, SortOrder, Subscriber } from "@/types/subscriber";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

interface SubscriptionTableProps {
  subscribers: Subscriber[];
}

export default function SubscriptionTable({
  subscribers,
}: SubscriptionTableProps) {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedSubscribers = [...subscribers].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });

  return (
    <table className="w-full">
      <thead>
        <tr className="border-y bg-[#F3F3F3]">
          <th
            className="p-4 text-center cursor-pointer"
            onClick={() => handleSort("name")}
          >
            <div className="flex items-center justify-center">
              이름
              <span className="inline-flex flex-col ml-2">
                <ChevronUp
                  size={14}
                  className={
                    sortField === "name" && sortOrder === "asc"
                      ? "text-black"
                      : "text-gray-300"
                  }
                />
                <ChevronDown
                  size={14}
                  className={
                    sortField === "name" && sortOrder === "desc"
                      ? "text-black"
                      : "text-gray-300"
                  }
                />
              </span>
            </div>
          </th>
          <th
            className="p-4 text-center cursor-pointer"
            onClick={() => handleSort("email")}
          >
            <div className="flex items-center justify-center">
              이메일주소(아이디)
              <span className="inline-flex flex-col ml-2">
                <ChevronUp
                  size={14}
                  className={
                    sortField === "email" && sortOrder === "asc"
                      ? "text-black"
                      : "text-gray-300"
                  }
                />
                <ChevronDown
                  size={14}
                  className={
                    sortField === "email" && sortOrder === "desc"
                      ? "text-black"
                      : "text-gray-300"
                  }
                />
              </span>
            </div>
          </th>
          <th
            className="p-4 text-center cursor-pointer"
            onClick={() => handleSort("phone")}
          >
            <div className="flex items-center justify-center">
              전화번호
              <span className="inline-flex flex-col ml-2">
                <ChevronUp
                  size={14}
                  className={
                    sortField === "phone" && sortOrder === "asc"
                      ? "text-black"
                      : "text-gray-300"
                  }
                />
                <ChevronDown
                  size={14}
                  className={
                    sortField === "phone" && sortOrder === "desc"
                      ? "text-black"
                      : "text-gray-300"
                  }
                />
              </span>
            </div>
          </th>
          <th className="p-4 text-center">구독현황</th>
          <th
            className="p-4 text-center cursor-pointer"
            onClick={() => handleSort("startDate")}
          >
            <div className="flex items-center justify-center">
              최초결제일
              <span className="inline-flex flex-col ml-2">
                <ChevronUp
                  size={14}
                  className={
                    sortField === "startDate" && sortOrder === "asc"
                      ? "text-black"
                      : "text-gray-300"
                  }
                />
                <ChevronDown
                  size={14}
                  className={
                    sortField === "startDate" && sortOrder === "desc"
                      ? "text-black"
                      : "text-gray-300"
                  }
                />
              </span>
            </div>
          </th>
          <th
            className="p-4 text-center cursor-pointer"
            onClick={() => handleSort("endDate")}
          >
            <div className="flex items-center justify-center">
              최근결제일
              <span className="inline-flex flex-col ml-2">
                <ChevronUp
                  size={14}
                  className={
                    sortField === "endDate" && sortOrder === "asc"
                      ? "text-black"
                      : "text-gray-300"
                  }
                />
                <ChevronDown
                  size={14}
                  className={
                    sortField === "endDate" && sortOrder === "desc"
                      ? "text-black"
                      : "text-gray-300"
                  }
                />
              </span>
            </div>
          </th>
          <th
            className="p-4 text-center cursor-pointer"
            onClick={() => handleSort("expiryDate")}
          >
            <div className="flex items-center justify-center">
              구독만료일
              <span className="inline-flex flex-col ml-2">
                <ChevronUp
                  size={14}
                  className={
                    sortField === "expiryDate" && sortOrder === "asc"
                      ? "text-black"
                      : "text-gray-300"
                  }
                />
                <ChevronDown
                  size={14}
                  className={
                    sortField === "expiryDate" && sortOrder === "desc"
                      ? "text-black"
                      : "text-gray-300"
                  }
                />
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedSubscribers.map((subscriber, index) => (
          <tr key={index} className="border-b">
            <td className="p-4 text-center">{subscriber.name}</td>
            <td className="p-4 text-center">{subscriber.email}</td>
            <td className="p-4 text-center">{subscriber.phone}</td>
            <td className="p-4 text-center">{subscriber.status}</td>
            <td className="p-4 text-center">{subscriber.startDate}</td>
            <td className="p-4 text-center">{subscriber.endDate}</td>
            <td className="p-4 text-center">{subscriber.expiryDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
