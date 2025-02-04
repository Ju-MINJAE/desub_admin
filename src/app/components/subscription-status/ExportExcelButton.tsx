import * as XLSX from "xlsx";

interface ExportExcelButtonProps<T> {
  data: T[];
  fileName?: string;
  headers: {
    [K in keyof Required<T>]?: string;
  };
}

export default function ExportExcelButton<T>({
  data,
  fileName = "export",
  headers,
}: ExportExcelButtonProps<T>) {
  const handleExport = () => {
    const excelData = data.map((item) => {
      const row: Record<string, any> = {};
      (Object.keys(headers) as Array<keyof T>).forEach((key) => {
        if (headers[key]) {
          row[headers[key]!] = item[key];
        }
      });
      return row;
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
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
