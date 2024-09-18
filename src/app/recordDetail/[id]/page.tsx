import Image from 'next/image';
import ImageCarousel from '@/app/(main)/_component/Feed/ImageCarousel';
import { DUMMY_RECORD } from '../../../../public/data/dummy_record';
import FileDownloadSquare from './_component/FileDownloadSquare';

const RecordPage = () => {
  return (
    <div
      className={
        'bg-white border border-gray-200 rounded-lg p-4 max-w-sm mx-auto'
      }
    >
      <div className={'flex items-center space-x-3 mb-4'}>
        <Image
          src={'/images/치이카와.webp'}
          width={50}
          height={50}
          alt={'User profile'}
          className={'rounded-full'}
        />
        <div className={'font-bold'}>{'미키오'}</div>
      </div>
      <ImageCarousel images={DUMMY_RECORD.image} />
      <div className={'font-semibold'}>
        {'주제: '}
        {DUMMY_RECORD.subject}
      </div>
      <div className={'text-gray-600'}>
        {'유형: '}
        {DUMMY_RECORD.type}
      </div>
      <p className={'my-2'}>{DUMMY_RECORD.memo}</p>
      <FileDownloadSquare files={DUMMY_RECORD.file} />
    </div>
  );
};
export default RecordPage;
