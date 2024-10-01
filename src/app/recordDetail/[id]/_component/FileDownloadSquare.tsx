import { v4 as uuidv4 } from 'uuid';

interface FileDownloadSquareProps {
  files: { url: string; type: string }[];
}

const FileDownloadSquare = ({ files }: FileDownloadSquareProps) => {
  const extractAndFormatFileName = (url: string) => {
    const fileName = url.substring(url.lastIndexOf('/') + 1);
    return fileName.length > 10 ? `${fileName.substring(0, 10)}...` : fileName; // 10자 이상이면 절단
  };

  return (
    <div className={'flex'}>
      {files.map((file) => (
        <div key={uuidv4()} className={'mb-2 mr-2'}>
          <a
            href={file.url}
            className={
              'flex flex-col justify-center items-center bg-primary text-white rounded px-4 py-2 w-20 h-20 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-primary700'
            }
            download
          >
            <div className={'flex justify-center text-sm truncate w-full'}>
              {extractAndFormatFileName(file.url)}
            </div>
            <span
              className={
                'flex justify-center text-xs text-gray-200 font-thin mt-1'
              }
            >
              {file.type}
            </span>
          </a>
        </div>
      ))}
    </div>
  );
};

export default FileDownloadSquare;
