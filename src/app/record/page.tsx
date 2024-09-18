import CreateRecord from './_component/CreateRecord';

const RecordPage = () => {
  return (
    <div>
      <h1 className={'text-xl px-4 font-maple text-gray700'}>
        {'수업 기록지 페이지'}
      </h1>
      <CreateRecord />
    </div>
  );
};

export default RecordPage;
