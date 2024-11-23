import CustomItem from '@/_component/Item/CustomItem';

interface ScrapItemProps {
  title: string;
  description: string;
  likedBy: number;
}

const ScrapItem = ({ title, description, likedBy }: ScrapItemProps) => {
  return (
    <CustomItem>
      <h2 className={'text-lg font-bold mb-2'}>{title}</h2>
      <p className={'text-sm text-slate-700 mb-2'}>{description}</p>
      <span className={'text-xs text-slate-500'}>
        {likedBy} {'people liked this'}
      </span>
    </CustomItem>
  );
};

export default ScrapItem;
