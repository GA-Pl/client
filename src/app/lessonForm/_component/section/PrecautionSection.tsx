import ItemSection from './ItemSection';

interface Precaution {
  id: string;
  text: string;
}

interface PrecautionsSectionProps {
  precautions: Precaution[];
  setPrecautions: React.Dispatch<React.SetStateAction<Precaution[]>>;
}

const PrecautionsSection = ({
  precautions,
  setPrecautions,
}: PrecautionsSectionProps) => {
  return (
    <ItemSection
      title={'유의사항'}
      items={precautions}
      setItems={setPrecautions}
      maxItems={3}
    />
  );
};

export default PrecautionsSection;
