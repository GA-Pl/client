import { MoonLoader } from 'react-spinners';

const ButtonSpinner = () => {
  return (
    <div className={'flex justify-center items-center'}>
      <MoonLoader color={'white'} size={20} />
    </div>
  );
};

export default ButtonSpinner;
