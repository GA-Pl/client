import FeedList from './(main)/_component/Feed/FeedList';

export default async function Home() {
  return (
    <main>
      <div
        className={
          ' flex flex-col justify-center items-center z-10 w-full max-w-5xl text-sm lg:flex'
        }
      >
        {/* <FeedList feeds={response.data ?? []} /> */}
        <FeedList />
      </div>
    </main>
  );
}
