"use client";
import { useCallback, useMemo, useState } from "react";
import { Cancellation } from "@/types/cancellation";
import ExportExcelButton from "../components/subscription-status/ExportExcelButton";
import Search from "../components/subscription-status/Search";
import CancellationTable from "../components/subscription-cancel/CancellationTable";
import RefundModal from "../components/subscription-cancel/RefundModal";
import { cancellationSearchOptions } from "../constants/searchOptions";

export default function SubscriptionCancel() {
  const [cancellations, setCancellations] = useState<Cancellation[]>([
    {
      name: "홍길동",
      email: "gildong.hong@gmail.com",
      phone: "010-1234-5678",
      paymentDate: "2025-01-01",
      cancelDate: "2025-01-13",
      cancelReason: "가격이 비싸서",
      refundStatus: "환불 대기",
    },
    {
      name: "홍길똥",
      email: "gilddong.hong@gmail.com",
      phone: "010-1234-5679",
      paymentDate: "2025-01-02",
      cancelDate: "2025-01-14",
      cancelReason: "기타: 입력한 기타",
      refundStatus: "내용 노출",
    },
  ]);

  const [searchFilter, setSearchFilter] = useState({
    field: "" as keyof Cancellation,
    value: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCancellation, setSelectedCancellation] =
    useState<Cancellation | null>(null);

  const handleSearch = useCallback(
    (field: keyof Cancellation, value: string) => {
      setSearchFilter({ field, value });
    },
    []
  );

  const filteredCancellations = useMemo(() => {
    if (!searchFilter.value) return cancellations;

    return cancellations.filter((cancellation) => {
      const fieldValue = cancellation[searchFilter.field];

      if (String(searchFilter.field).includes("Date")) {
        return String(fieldValue).includes(searchFilter.value);
      }

      return String(fieldValue)
        .toLowerCase()
        .includes(searchFilter.value.toLowerCase());
    });
  }, [cancellations, searchFilter]);

  const handleRefund = (amount: number) => {
    if (!selectedCancellation) return;

    console.log(
      "Refund amount:",
      amount,
      "for user:",
      selectedCancellation.name
    );

    setIsModalOpen(false);
    setSelectedCancellation(null);
  };

  const handleRefundClick = (cancellation: Cancellation) => {
    setSelectedCancellation(cancellation);
    setIsModalOpen(true);
  };

  return (
    <div className="p-[3.1rem]">
      <h1 className="text-[3.5rem] mt-[2.1rem] font-bold">구독취소관리</h1>

      <div className="mt-[1.8rem]">
        <p className="text-[1.8rem]">
          전체 취소 수 : {cancellations.length}명 | 오늘 신규 취소 : 00명
        </p>
      </div>

      <div className="flex justify-between items-center mt-[4.9rem]">
        <ExportExcelButton
          data={filteredCancellations}
          fileName="구독취소_목록"
          headers={{
            name: "이름",
            email: "이메일",
            phone: "전화번호",
            cancelDate: "취소일자",
            cancelReason: "취소사유",
            refundStatus: "환불처리",
          }}
        />
        <Search<Cancellation>
          onSearch={handleSearch}
          searchOptions={cancellationSearchOptions}
        />
      </div>

      <p className="my-[1.5rem] text-[1.3rem] text-[#4D4D4D]">
        검색 결과 : {filteredCancellations.length}
      </p>

      <CancellationTable
        cancellations={filteredCancellations}
        onRefund={handleRefundClick}
      />

      {selectedCancellation && (
        <RefundModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCancellation(null);
          }}
          customerName={selectedCancellation.name}
          paymentDate={selectedCancellation.paymentDate}
          amount={1250000}
          onRefund={handleRefund}
        />
      )}
    </div>
  );
}
