'use client';

import { useRouter } from 'next/navigation';

interface LogCardProps {
  result: {
    id: number;
    content: string;
  };
}

export default function LogCard({ result }: LogCardProps) {
  const router = useRouter();

  const handleNavigation = () => {
    router.back();
    setTimeout(() => {
      router.push(`/log/${result.id}`);
    }, 100);
  };

  return (
    <div
      className="p-4 bg-white shadow rounded-md hover:shadow-lg transition-shadow border border-slate-200 cursor-pointer"
      onClick={handleNavigation}
    >
      <p className="text-slate-600">{result.content}</p>
    </div>
  );
}
