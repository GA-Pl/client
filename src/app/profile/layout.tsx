import ProfileTop from './[id]/_component/ProfileTop';
import TabComponent from './[id]/_component/TabComponent';

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ProfileLayoutProps) {
  return (
    <div>
      <div className={'mb-6'}>
        <ProfileTop />
      </div>
      <TabComponent />
      <main className={'mt-6'}>{children}</main>
    </div>
  );
}
