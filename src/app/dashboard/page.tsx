import Image from 'next/image';
import { Heading } from '../components/ui/Heading';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen pl-[36rem] pt-[11.9rem]">
      <div className="h-[84.5rem] overflow-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[2.2rem] w-fit">
          <div className="w-[33.9rem] h-[26.7rem] px-[2.9rem] py-[1.6rem]">
            <div className="flex items-center justify-between pb-[3rem]">
              <Heading tag="h1">작업요청현황</Heading>
              <Image
                src="icons/plus-circle.svg"
                alt="plus"
                width={24}
                height={24}
              />
            </div>
            <div className="space-y-[2.6rem]">
              <div className="flex justify-between items-center">
                <Heading tag="h2">오늘 신규 요청</Heading>
                <span className="font-bold text-[1.8rem] text-[#e90000]">
                  3
                </span>
              </div>
              <div className="flex justify-between items-center">
                <Heading tag="h2">미완료</Heading>
                <span className="font-bold text-[1.8rem] text-[#e90000]">
                  0
                </span>
              </div>
              <div className="flex justify-between items-center">
                <Heading tag="h2">완료</Heading>
                <span className="font-bold text-[1.8rem]">8</span>
              </div>
            </div>
          </div>

          <div className="w-[33.9rem] h-[26.7rem] px-[2.9rem] py-[1.6rem]">
            <div className="flex items-center justify-between pb-[3rem]">
              <Heading tag="h1">상담예약현황</Heading>
              <Image
                src="icons/plus-circle.svg"
                alt="plus"
                width={24}
                height={24}
              />
            </div>
            <div className="space-y-[2.6rem]">
              <div className="flex justify-between items-center">
                <Heading tag="h2">신규 상담 예약</Heading>
                <span className="font-bold text-[1.8rem] text-[#e90000]">
                  0
                </span>
              </div>
              <div className="flex justify-between items-center">
                <Heading tag="h2">오늘 상담</Heading>
                <span className="font-bold text-[1.8rem] text-[#e90000]">
                  0
                </span>
              </div>
            </div>
          </div>

          <div className="w-[33.9rem] h-[26.7rem] px-[2.9rem] py-[1.6rem]">
            <div className="flex items-center justify-between pb-[3rem]">
              <Heading tag="h1">온라인미팅현황</Heading>
              <Image
                src="icons/plus-circle.svg"
                alt="plus"
                width={24}
                height={24}
              />
            </div>
            <div className="space-y-[2.6rem]">
              <div className="flex justify-between items-center">
                <Heading tag="h2">신규 미팅 요청</Heading>
                <span className="font-bold text-[1.8rem] text-[#e90000]">
                  0
                </span>
              </div>
              <div className="flex justify-between items-center">
                <Heading tag="h2">오늘 미팅</Heading>
                <span className="font-bold text-[1.8rem] text-[#e90000]">
                  0
                </span>
              </div>
            </div>
          </div>

          <div className="w-[33.9rem] h-[26.7rem] px-[2.9rem] py-[1.6rem]">
            <div className="flex items-center justify-between pb-[3rem]">
              <Heading tag="h1">구독현황</Heading>
              <Image
                src="icons/plus-circle.svg"
                alt="plus"
                width={24}
                height={24}
              />
            </div>
            <div className="space-y-[2.6rem]">
              <div className="flex justify-between items-center">
                <Heading tag="h2">전체 구독</Heading>
                <span className="font-bold text-[1.8rem]">0</span>
              </div>
              <div className="flex justify-between items-center">
                <Heading tag="h2">신규 구독</Heading>
                <span className="font-bold text-[1.8rem]">0</span>
              </div>
              <div className="flex justify-between items-center">
                <Heading tag="h2">오늘 구독 결사정지</Heading>
                <span className="font-bold text-[1.8rem]">3</span>
              </div>
            </div>
          </div>

          <div className="w-[33.9rem] h-[26.7rem] px-[2.9rem] py-[1.6rem]">
            <div className="flex items-center justify-between pb-[3rem]">
              <Heading tag="h1">구독취소현황</Heading>
              <Image
                src="icons/plus-circle.svg"
                alt="plus"
                width={24}
                height={24}
              />
            </div>
            <div className="space-y-[2.6rem]">
              <div className="flex justify-between items-center">
                <Heading tag="h2">전체 취소</Heading>
                <span className="font-bold text-[1.8rem]">0</span>
              </div>
              <div className="flex justify-between items-center">
                <Heading tag="h2">오늘 취소</Heading>
                <span className="font-bold text-[1.8rem]">0</span>
              </div>
            </div>
          </div>

          <div className="w-[33.9rem] h-[26.7rem] px-[2.9rem] py-[1.6rem]">
            <div className="flex items-center justify-between pb-[3rem]">
              <Heading tag="h1">리뷰현황</Heading>
              <Image
                src="icons/plus-circle.svg"
                alt="plus"
                width={24}
                height={24}
              />
            </div>
            <div className="space-y-[2.6rem]">
              <div className="flex justify-between items-center">
                <Heading tag="h2">전체 리뷰</Heading>
                <span className="font-bold text-[1.8rem]">0</span>
              </div>
              <div className="flex justify-between items-center">
                <Heading tag="h2">신규 리뷰</Heading>
                <span className="font-bold text-[1.8rem]">0</span>
              </div>
            </div>
          </div>

          <div className="w-[33.9rem] h-[26.7rem] px-[2.9rem] py-[1.6rem]">
            <div className="flex items-center justify-between pb-[3rem]">
              <Heading tag="h1">고객현황</Heading>
              <Image
                src="icons/plus-circle.svg"
                alt="plus"
                width={24}
                height={24}
              />
            </div>
            <div className="space-y-[2.6rem]">
              <div className="flex justify-between items-center">
                <Heading tag="h2">전체 고객 수</Heading>
                <span className="font-bold text-[1.8rem] text-[#e90000]">
                  0
                </span>
              </div>
              <div className="flex justify-between items-center">
                <Heading tag="h2">오늘 가입</Heading>
                <span className="font-bold text-[1.8rem] text-[#e90000]">
                  0
                </span>
              </div>
              <div className="flex justify-between items-center">
                <Heading tag="h2">오늘 탈퇴</Heading>
                <span className="font-bold text-[1.8rem]">3</span>
              </div>
            </div>
          </div>

          <div className="px-[2.9rem] py-[1.6rem] col-span-full lg:col-span-2">
            <div className="flex items-center justify-between pb-[3rem]">
              <Heading tag="h1">매출현황</Heading>
              <Image
                src="icons/plus-circle.svg"
                alt="plus"
                width={24}
                height={24}
              />
            </div>
            <div className="space-y-[2.6rem]">
              <div className="flex justify-between items-center">
                <Heading tag="h2">당월 매출</Heading>
                <span className="font-bold text-[1.8rem]">80,000,000원</span>
              </div>
              <div className="flex justify-between items-center">
                <Heading tag="h2">당월 취소 매출</Heading>
                <span className="font-bold text-[1.8rem]">-2,590,000원</span>
              </div>
              <div className="flex justify-between items-center">
                <Heading tag="h2">당월 총매출</Heading>
                <span className="font-bold text-[1.8rem]">1,250,000,000원</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
