'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

interface RecordSwiperProps {
  images: string[];
}

const RecordSwiper = ({ images }: RecordSwiperProps) => {
  const enableLoop = images.length > 1;

  return (
    <Swiper
      cssMode
      navigation
      pagination={{
        clickable: true,
        renderBullet: (className) =>
          `<span class="${className}" style="background-color: #ED4264;"></span>`,
      }}
      mousewheel
      keyboard
      loop={enableLoop}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      className={'mySwiper'}
      style={{ objectFit: 'contain' }}
    >
      {images?.map((img: string) => (
        <SwiperSlide key={uuidv4()}>
          <div
            className={
              'flex justify-center items-center h-72 w-72 laptop:w-[30rem] laptop:h-[30rem] mr-auto ml-auto shadow-md bg-white'
            }
          >
            <Image src={img} width={640} height={360} alt={'Record image'} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RecordSwiper;
