import * as XLSX from 'xlsx';

type DotNotation<T> = {
  [K in keyof T]: T[K] extends Record<string, any> ? `${string & K}.${keyof T[K] & string}` | K : K;
}[keyof T];

interface ExportExcelButtonProps<T> {
  data: T[];
  fileName?: string;
  headers: {
    [K in DotNotation<T>]?: string;
  };
}

interface WithUser {
  user: Record<string, any>;
}
export default function ExportExcelButton<T extends WithUser>({
  data,
  fileName = 'export',
  headers,
}: ExportExcelButtonProps<T>) {
  const handleExport = () => {
    const excelData = data.map(item => {
      const row: Record<string, any> = {};
      (Object.keys(headers) as Array<keyof T>).forEach(key => {
        if (headers[key]) {
          if (key.toString().startsWith('user.')) {
            const userKey = key.toString().split('.')[1];
            row[headers[key]!] = item.user[userKey];
          } else {
            row[headers[key]!] = item[key];
          }
        }
      });
      return row;
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
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
