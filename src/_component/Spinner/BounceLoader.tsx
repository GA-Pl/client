import { BounceLoader } from 'react-spinners';

const ButtonSpinner = () => {
  return (
    <div className={'flex justify-center items-center'}>
      <BounceLoader color={'#F43F5E'} size={30} />
    </div>
  );
};

export default ButtonSpinner;
