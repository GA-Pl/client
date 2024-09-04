import type { Metadata } from 'next';
import '../styles/globals.css';
import Topbar from './(main)/_component/Topbar';
import AuthSession from '@/_component/AuthSession';

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
    <html lang="ko">
      <body style={{ fontFamily: 'Pretendard' }}>
        <AuthSession>
          <Topbar />
          {children}
        </AuthSession>
      </body>
    </html>
  );
}
