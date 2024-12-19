import DraftList from './_component/DraftList';

function Page() {
  return (
    <div className={'max-w-3xl mx-auto py-8'}>
      <h1 className={'text-2xl font-bold mb-4 text-slate-800'}>
        {'임시 글 목록'}
      </h1>
      <DraftList />
    </div>
  );
}

export default Page;
