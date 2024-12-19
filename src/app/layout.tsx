import type { Metadata } from 'next';
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import AuthSession from '@/_component/AuthSession';
import RQProvider from '@/providers/RQProvider';
import { auth } from '@/auth';
import SideBar from './(main)/_component/NavBar/SideBar';
import Logo from './(main)/_component/NavBar/Logo';

export const metadata: Metadata = {
  title: 'Gapple',
  description: 'Generate Ai Planner',
  icons: {
    icon: '/dog.png',
  },
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang={'ko'}>
      <body
        className={'flex justify-center items-center mb-16 bg-slate-50'}
        style={{ fontFamily: 'Pretendard' }}
      >
        <AuthSession>
          <RQProvider>
            {/* OneSignal 초기화 및 권한 요청 */}

            {!session?.user && (
              <div className={'flex flex-col'}>
                <Logo />
                <main>{children}</main>
              </div>
            )}
            {session?.user && (
              <>
                <SideBar />
                <main
                  className={
                    'flex justify-center tablet:ml-0 laptop:ml-20 desktop:ml-36 flex-grow p-4 bg-slate-50 w-dvw'
                  }
                >
                  {children}
                </main>
              </>
            )}
            {modal && <div>{modal}</div>}
            <ToastContainer position={'bottom-right'} />
          </RQProvider>
        </AuthSession>
      </body>
    </html>
  );
}
