'use client';

import { useState } from 'react';
import CustomerList from '../components/customer/CustomerList';
import { Heading } from '../components/ui/Heading';
import WithdrawalList from '../components/customer/WithdrawalList';

type TabType = 'customerList' | 'withdrawalList';

export default function CustomerManagement() {
  const [activeTab, setActiveTab] = useState<TabType>('customerList');

  return (
    <div className="pl-[28.5rem]">
      <div className="p-[3.1rem]">
        <Heading tag="h1" className="mt-[2.1rem]">
          고객관리
        </Heading>
        <div className="flex mt-[2rem] border-black border-b">
          <button
            className={`px-[4rem] py-[1rem] ${
              activeTab === 'customerList' ? 'bg-black text-white' : 'bg-[#F3F3F3] text-[#818181]'
            }`}
            onClick={() => setActiveTab('customerList')}
          >
            고객목록
          </button>
          <button
            className={`px-[4rem] py-[1rem] ${
              activeTab === 'withdrawalList' ? 'bg-black text-white' : 'bg-[#F3F3F3] text-[#818181]'
            }`}
            onClick={() => setActiveTab('withdrawalList')}
          >
            탈퇴관리
          </button>
        </div>

        {activeTab === 'customerList' ? <CustomerList /> : <WithdrawalList />}
      </div>
    </div>
  );
}
