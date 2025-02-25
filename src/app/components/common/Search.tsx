'use client';

import type { SearchOption } from '@/types/search';
import { useEffect, useState } from 'react';

interface SearchProps<T> {
  onSearch: (
    field: keyof T | `user.${string}`,
    value: string | { start: string | undefined; end: string | undefined },
  ) => void;
  searchOptions: SearchOption<T>[];
}

export default function Search<T>({ onSearch, searchOptions }: SearchProps<T>) {
  const [selectedSearchOption, setSelectedSearchOption] = useState<SearchOption<T>>(
    searchOptions[0],
  );
  const [searchValue, setSearchValue] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    if (selectedSearchOption.inputType === 'date') {
      onSearch(selectedSearchOption.value, {
        start: startDate || undefined,
        end: endDate || undefined,
      });
    } else {
      onSearch(selectedSearchOption.value, searchValue);
    }
  }, [selectedSearchOption, searchValue, startDate, endDate, onSearch]);

  const renderSearchInput = () => {
    switch (selectedSearchOption.inputType) {
      case 'date':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="border p-2 w-[12rem] text-[1.5rem]"
              placeholder="시작일"
            />
            <span className="text-[1.5rem]">~</span>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="border p-2 w-[12rem] text-[1.5rem]"
              placeholder="종료일"
            />
          </div>
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
    <div className="flex gap-4">
      <select
        className="border border-black p-2 w-[17rem] text-[1.5rem]"
        value={selectedSearchOption.value as string}
        onChange={e => {
          const option = searchOptions.find(opt => opt.value === (e.target.value as keyof T));
          if (option) {
            setSelectedSearchOption(option);
            setSearchValue('');
            setStartDate('');
            setEndDate('');
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
