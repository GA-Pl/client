import React from 'react';
import dynamic from 'next/dynamic';

const GridLoader = dynamic(() => import('react-spinners/GridLoader'), {
  ssr: false,
});

const Loader = () => {
  return (
    <div className={'flex justify-center items-center mt-32'}>
      <GridLoader color={'#ED4264'} size={15} />
    </div>
  );
};

export default Loader;
