import type { Metadata } from 'next';
import '../styles/globals.css';
import AuthSession from '@/_component/AuthSession';
import SideBar from './(main)/_component/NavBar/SideBar';

export const metadata: Metadata = {
  title: 'GA:Pl',
  description: 'Generate Ai Planner',
  icons: {
    icon: '/icons/gappler.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={'ko'}>
      <body
        className={'flex justify-center items-center'}
        style={{ fontFamily: 'Pretendard' }}
      >
        <AuthSession>
          <SideBar />
          <main
            className={
              'mt-20 tablet:mt-0 tablet:ml-0 laptop:ml-20 desktop:ml-52 flex-grow p-4'
            }
          >
            {children}
          </main>
        </AuthSession>
      </body>
    </html>
  );
}
