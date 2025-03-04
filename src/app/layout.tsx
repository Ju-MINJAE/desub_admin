import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import ConditionalSidebar from './components/common/ConditionalSidebar';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'desub admin',
  description: 'desub admin',
  robots: 'noindex, nofollow',
  openGraph: {
    images: [
      {
        url: 'https://www.admin.desub.kr/images/desub_thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'desub 썸네일 이미지',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <ConditionalSidebar />
        <main>{children}</main>
      </body>
    </html>
  );
}
