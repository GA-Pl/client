import { BeatLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className={'flex justify-center mt-[15dvh] mb-[5dvh]'}>
      <BeatLoader color={'rgb(71 85 105)'} />
    </div>
  );
};

export default Loader;
