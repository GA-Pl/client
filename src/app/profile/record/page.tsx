import RecordItem from './_component/RecordItem';

export default function RecordPage() {
  const recordData = [
    {
      title: 'Record Title',
      date: '2024.10.24',
      details: 'Details about the record...',
      duration: '2 hours',
    },
  ];

  return (
    <div>
      {recordData.map((item, index) => (
        <RecordItem
          key={index}
          title={item.title}
          date={item.date}
          details={item.details}
          duration={item.duration}
        />
      ))}
    </div>
  );
}
