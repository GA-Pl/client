'use client';

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ImageCarouselProps {
  images: string[];
}

function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className={'relative w-full overflow-hidden'}>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className={'w-full h-auto'}
      />
      <div
        className={
          'absolute inset-y-0 flex items-center justify-between w-full px-4'
        }
      >
        <button
          type={'button'}
          onClick={prevImage}
          className={
            'bg-white bg-opacity-50 p-2 rounded-full text-lg cursor-pointer hover:bg-opacity-75'
          }
        >
          &lt;
        </button>
        <button
          type={'button'}
          onClick={nextImage}
          className={
            'bg-white bg-opacity-50 p-2 rounded-full text-lg cursor-pointer hover:bg-opacity-75'
          }
        >
          &gt;
        </button>
      </div>
      <div
        className={
          'absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2'
        }
      >
        {images.map((_, index) => (
          <span
            key={uuidv4()}
            className={`block h-2 w-2 rounded-full cursor-pointer ${
              index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;
