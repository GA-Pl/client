import CreatePlan from './_component/CreatePlan';

const formPage = () => {
  return (
    <div>
      <h1 className={'text-xl px-4 font-maple text-gray700'}>
        {'직접 계획안 글쓰기'}
      </h1>
      <CreatePlan />
    </div>
  );
};

export default formPage;
