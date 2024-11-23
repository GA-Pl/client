import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className={'my-4'}>
      <h2 className={'text-lg font-semibold'}>{'이미지'}</h2>
      <div className={'grid grid-cols-3 gap-4'}>
        {images.map((image) => (
          <div key={uuidv4()} className={'w-full'}>
            <Image
              width={100}
              height={100}
              src={image}
              alt={'Activity Image'}
              className={'w-full h-full object-cover rounded'}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
