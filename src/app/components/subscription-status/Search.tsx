import { SearchOption, Subscriber } from "@/types/subscriber";
import { useEffect, useState } from "react";

interface SearchProps {
  onSearch: (field: keyof Subscriber, value: string) => void;
}

const searchOptions: SearchOption[] = [
  { value: "name", label: "이름", inputType: "text" },
  { value: "email", label: "이메일", inputType: "text" },
  { value: "phone", label: "전화번호", inputType: "text" },
  {
    value: "status",
    label: "구독현황",
    inputType: "select",
    options: [
      { value: "진행중", label: "진행중" },
      { value: "일시정지", label: "일시정지" },
    ],
  },
  { value: "startDate", label: "최초결제일", inputType: "date" },
  { value: "endDate", label: "최근결제일", inputType: "date" },
  { value: "expiryDate", label: "구독만료일", inputType: "date" },
];

export default function Search({ onSearch }: SearchProps) {
  const [selectedSearchOption, setSelectedSearchOption] =
    useState<SearchOption>(searchOptions[0]);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    onSearch(selectedSearchOption.value, searchValue);
  }, [searchValue, selectedSearchOption.value, onSearch]);

  const renderSearchInput = () => {
    switch (selectedSearchOption.inputType) {
      case "date":
        return (
          <input
            type="date"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="border p-2 w-[17rem]"
          />
        );
      case "select":
        return (
          <select
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="border p-2 w-[17rem]"
          >
            <option value="">선택</option>
            {selectedSearchOption.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="border p-2 w-[17rem]"
            placeholder={selectedSearchOption.label}
          />
        );
    }
  };

  return (
    <div className="space-x-7">
      <select
        className="border border-black p-2 w-[17rem]"
        value={selectedSearchOption.value}
        onChange={(e) => {
          const option = searchOptions.find(
            (opt) => opt.value === e.target.value
          );
          if (option) {
            setSelectedSearchOption(option);
            setSearchValue("");
          }
        }}
      >
        {searchOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {renderSearchInput()}
    </div>
  );
}
