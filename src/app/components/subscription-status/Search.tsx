import { SearchOption } from '@/types/subscriber';
import { useEffect, useState } from 'react';

interface SearchProps<T> {
  onSearch: (field: keyof T, value: string) => void;
  searchOptions: SearchOption<T>[];
}

export default function Search<T>({ onSearch, searchOptions }: SearchProps<T>) {
  const [selectedSearchOption, setSelectedSearchOption] = useState<SearchOption<T>>(
    searchOptions[0],
  );
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    onSearch(selectedSearchOption.value, searchValue);
  }, [searchValue, selectedSearchOption.value]);

  const renderSearchInput = () => {
    switch (selectedSearchOption.inputType) {
      case 'date':
        return (
          <input
            type="date"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className="border p-2 w-[17rem] text-[1.5rem]"
          />
        );
      case 'select':
        return (
          <select
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className="border p-2 w-[17rem] text-[1.5rem]"
          >
            <option value="">선택</option>
            {selectedSearchOption.options?.map(option => (
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
            onChange={e => setSearchValue(e.target.value)}
            className="border p-2 w-[17rem] text-[1.5rem]"
            placeholder={selectedSearchOption.label}
          />
        );
    }
  };

  return (
    <div className="space-x-7">
      <select
        className="border border-black p-2 w-[17rem] text-[1.5rem]"
        value={selectedSearchOption.value as string}
        onChange={e => {
          const option = searchOptions.find(opt => opt.value === e.target.value);
          if (option) {
            setSelectedSearchOption(option);
            setSearchValue('');
          }
        }}
      >
        {searchOptions.map(option => (
          <option key={option.value as string} value={option.value as string}>
            {option.label}
          </option>
        ))}
      </select>
      {renderSearchInput()}
    </div>
  );
}
