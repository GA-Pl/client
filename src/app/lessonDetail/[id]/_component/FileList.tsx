import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';

interface FileListProps {
  files: {
    url: string;
    type: string;
  }[];
}

const FileList = ({ files }: FileListProps) => {
  return (
    <div className={'my-4'}>
      <h2 className={'text-lg font-semibold'}>{'자료 파일'}</h2>
      {files.map((file) => (
        <div key={uuidv4()} className={'my-2'}>
          {file.type === 'jpg' ? (
            <Image
              width={100}
              height={100}
              src={file.url}
              alt={'자료 이미지'}
              className={'w-40 h-auto'}
            />
          ) : (
            <a href={file.url} className={'text-blue-500 underline'} download>
              {'파일 다운로드'}
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default FileList;
