import ChooseCategory from './ChooseCategory';
import PhotoUpload from './PhotoUpload';

const CreateRecord = () => {
  return (
    <div className={'container mx-auto px-4 py-4'}>
      <PhotoUpload />
      <form>
        <div className={'mb-3'}>
          <ChooseCategory />
        </div>
        <div className={'mb-3'}>
          <label
            htmlFor={'topic'}
            className={'block text-gray-700 text-sm font-bold mb-2'}
          >
            {'주제'}
          </label>
          <input
            type={'text'}
            name={'topic'}
            className={
              'shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            }
            placeholder={'주제를 입력하세요...'}
          />
        </div>
        <div className={'mb-3'}>
          <label
            htmlFor={'explanation'}
            className={'block text-gray-700 text-sm font-bold mb-2'}
          >
            {'설명'}
          </label>
          <textarea
            name={'description'}
            className={
              'shadow border rounded w-full h-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            }
            placeholder={'수업의 소중한 순간을 기록해주세요...'}
          />
        </div>
        <button
          type={'submit'}
          className={
            'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          }
        >
          {'제출'}
        </button>
      </form>
    </div>
  );
};

export default CreateRecord;
