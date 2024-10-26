'use client';

import { ChangeEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { GridLoader } from 'react-spinners';
import CustomModal from '@/_component/Modal/CustomModal';
import ProfileForm from './ProfileForm';

const UserInfo = () => {
  const { data: session, status } = useSession();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    image: '',
    experienceLevel: 'Lv.1 새싹 선생님',
    introduction: '교육의 가치를 믿습니다!',
  });

  const openModal = () => {
    if (session && session.user) {
      setProfileData({
        name: session.user.name || '',
        image: session.user.image || '/images/gappler.png',
        experienceLevel: profileData.experienceLevel,
        introduction: profileData.introduction,
      });
      setModalIsOpen(true);
    } else {
      console.error('Session data is not yet available.');
    }
  };

  const closeModal = () => setModalIsOpen(false);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (imageSrc: string) => {
    setProfileData((prev) => ({ ...prev, image: imageSrc }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalIsOpen(false);
  };

  if (status === 'loading') {
    return (
      <div className={'flex justify-center items-center mt-64'}>
        <GridLoader color={'#ED4264'} size={15} />
      </div>
    );
  }

  const isLoggedIn = status === 'authenticated';

  if (!isLoggedIn || !session?.user) {
    return null;
  }

  return (
    <div
      className={
        'flex laptop:flex-row laptop:justify-around laptop:h-48 flex-col items-center space-y-4 bg-white px-8 rounded-lg pb-4 shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out'
      }
    >
      <div
        style={{
          position: 'relative',
          width: '120px',
          height: '120px',
        }}
      >
        <Image
          src={session.user.image || '/images/gappler.png'}
          alt={'Profile'}
          width={'300'}
          height={'300'}
          style={{
            borderRadius: '50%',
            width: '120px',
            height: '120px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
          }}
          className={'absolute inset-0 object-cover'}
        />
      </div>
      <div className={'flex flex-col laptop:ml-8'}>
        <div className={'flex laptop:flex-row flex-col items-center mb-1'}>
          <div className={'flex flex-col'}>
            <div className={'flex mb-1'}>
              <Image
                src={'/icons/email.png'}
                width={15}
                height={15}
                alt={'email'}
                className={'opacity-70'}
              />
              <p className={'text-xs text-slate-400 ml-1'}>
                {session.user.email}
              </p>
            </div>
            <h1 className={'text-xl font-semibold text-slate-800'}>
              {session.user.name}
            </h1>
          </div>
        </div>
        <div className={'text-sm text-slate-500'}>
          {profileData.experienceLevel}
        </div>
        <div className={'text-sm text-slate-600 mt-2'}>
          {profileData.introduction}
        </div>
        <button
          type={'button'}
          className={
            'mt-2 w-20 py-1 bg-slate-700 hover:bg-slate-500 text-white font-medium rounded-md text-xs text-nowrap'
          }
          onClick={openModal}
        >
          {'프로필 수정'}
        </button>
      </div>
      <CustomModal isOpen={modalIsOpen} onClose={closeModal}>
        <ProfileForm
          profileData={profileData}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
        />
      </CustomModal>
    </div>
  );
};

export default UserInfo;
