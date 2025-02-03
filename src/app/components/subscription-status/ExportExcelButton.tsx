import * as XLSX from "xlsx";
import { Subscriber } from "@/types/subscriber";

interface ExportExcelButtonProps {
  data: Subscriber[];
  fileName?: string;
}

export default function ExportExcelButton({
  data,
  fileName = "subscribers",
}: ExportExcelButtonProps) {
  const handleExport = () => {
    const excelData = data.map((item) => ({
      이름: item.name,
      이메일: item.email,
      전화번호: item.phone,
      구독현황: item.status,
      최초결제일: item.startDate,
      최근결제일: item.endDate,
      구독만료일: item.expiryDate,
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    XLSX.utils.book_append_sheet(wb, ws, "구독현황");

    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <button
      onClick={handleExport}
      className="w-[14rem] h-[3.7rem] border border-black text-[1.4rem] rounded-[1.2rem]"
    >
      excel download
    </button>
  );
}
