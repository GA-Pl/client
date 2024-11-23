'use client';

import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

interface PlanCardProps {
  result: {
    id: number;
    title: string;
    content: string;
  };
}

export default function PlanCard({ result }: PlanCardProps) {
  const router = useRouter();

  let parsedContent: { content: string; subtitle: string }[] = [];
  try {
    parsedContent = JSON.parse(result.content);
  } catch (error) {
    console.error('Error parsing content:', error);
  }

  const handleNavigation = () => {
    router.push(`/lessonDetail/${result.id}`);
  };

  return (
    <div
      className="p-4 bg-white shadow rounded-lg hover:shadow-xl transition-shadow border border-slate-200 cursor-pointer"
      onClick={handleNavigation}
    >
      <h3 className="text-xl font-semibold text-slate-800 mb-2">
        {`${result.title}`}
      </h3>

      {parsedContent.length > 0 ? (
        <ul className="space-y-2">
          {parsedContent.map((item) => (
            <li
              key={uuidv4()}
              className="bg-slate-50 p-3 rounded-md shadow-sm hover:bg-slate-100 transition-colors"
            >
              <h4 className="text-slate-700 font-medium">{`${item.subtitle}`}</h4>
              <p className="text-slate-600 text-sm mt-1">{`${item.content}`}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-600 text-sm">{`내용이 없습니다.`}</p>
      )}
    </div>
  );
}
