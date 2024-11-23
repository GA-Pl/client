interface IAttachment {
  fileName: string;
  url: string;
}

interface AttachmentsProps {
  attachments: IAttachment[];
}

const Attachments = ({ attachments }: AttachmentsProps) => {
  return (
    <div className={'my-4'}>
      <h2 className={'text-lg font-semibold'}>{'첨부파일'}</h2>
      <div className={'flex flex-wrap gap-2'}>
        {attachments.map((attachment) => (
          <a
            key={attachment.fileName}
            href={attachment.url}
            target={'_blank'}
            rel={'noopener noreferrer'}
            className={
              'bg-blue-100 hover:bg-blue-200 rounded p-2 text-blue-800'
            }
          >
            {attachment.fileName}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Attachments;
