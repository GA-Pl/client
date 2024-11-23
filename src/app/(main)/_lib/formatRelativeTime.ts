export default function formatRelativeTime(timestamp: string) {
  const createdAt = new Date(timestamp);
  const now = new Date();
  const differenceInSeconds = Math.floor(
    (now.getTime() - createdAt.getTime()) / 1000,
  );
  const differenceInMinutes = Math.floor(differenceInSeconds / 60);
  const differenceInHours = Math.floor(differenceInSeconds / 3600);
  const differenceInDays = Math.floor(differenceInSeconds / 86400);

  if (differenceInSeconds < 60) {
    return `${differenceInSeconds} 초 전`;
  }
  if (differenceInMinutes < 60) {
    return `${differenceInMinutes} 분 전`;
  }
  if (differenceInHours < 24) {
    return `${differenceInHours} 시간 전`;
  }
  if (differenceInDays < 2) {
    return `1일 전`;
  }
  return createdAt.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
}
