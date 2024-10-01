'use client';

import Image from 'next/image';

interface CreateBtnProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

function CreateBtn({ onClick }: CreateBtnProps) {
  return (
    <div
      onClick={onClick}
      className={
        'flex items-center justify-center bg-white border-primary border-2 w-10 h-10 rounded-3xl hover:shadow-sm hover:shadow-primary button-effect'
      }
    >
      <div className={'text-3xl text-primary'}>
        <Image
          src={'/icons/plusIconPink.png'}
          alt={'만들기'}
          width={20}
          height={20}
        />
      </div>
    </div>
  );
}
export default CreateBtn;
