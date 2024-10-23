interface TitleInputProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const TitleInput = ({ title, setTitle }: TitleInputProps) => {
  return (
    <input
      type={'text'}
      name={'title'}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className={'text-xl laptop:text-3xl focus:outline-none w-full p-4'}
      placeholder={'활동명을 입력하세요'}
    />
  );
};

export default TitleInput;
