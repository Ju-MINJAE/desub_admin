import { Cancellation } from "@/types/cancellation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";

interface CancellationTableProps {
  cancellations: Cancellation[];
  onRefund: (cancellation: Cancellation) => void;
}

export default function CancellationTable({
  cancellations,
  onRefund,
}: CancellationTableProps) {
  const [sortField, setSortField] = useState<keyof Cancellation | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof Cancellation) => {
    if (field === "cancelReason" || field === "refundStatus") return;

    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedCancellations = useMemo(() => {
    if (!sortField) return cancellations;

    return [...cancellations].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });
  }, [cancellations, sortField, sortOrder]);

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
          <th
            className="p-4 text-center cursor-pointer"
            onClick={() => handleSort("cancelDate")}
          >
            <div className="flex items-center justify-center">
              취소일자
              <span className="inline-flex flex-col ml-2">
                <ChevronUp
                  size={14}
                  className={
                    sortField === "cancelDate" && sortOrder === "asc"
                      ? "text-black"
                      : "text-gray-300"
                  }
                />
                <ChevronDown
                  size={14}
                  className={
                    sortField === "cancelDate" && sortOrder === "desc"
                      ? "text-black"
                      : "text-gray-300"
                  }
                />
              </span>
            </div>
          </th>
          <th className="p-4 text-center">취소사유</th>
          <th className="p-4 text-center">환불처리</th>
        </tr>
      </thead>
      <tbody>
        {sortedCancellations.map((cancellation, index) => (
          <tr key={index} className="border-b">
            <td className="p-4 text-center">{cancellation.name}</td>
            <td className="p-4 text-center">{cancellation.email}</td>
            <td className="p-4 text-center">{cancellation.phone}</td>
            <td className="p-4 text-center">{cancellation.cancelDate}</td>
            <td className="p-4 text-center">{cancellation.cancelReason}</td>
            <td className="p-4 text-center">
              <button
                onClick={() => onRefund(cancellation)}
                className="w-[7rem] px-4 py-2 border border-black rounded-[1.2rem]"
              >
                환불
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
