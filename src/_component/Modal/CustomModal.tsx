import { useCallback, ReactNode } from 'react';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const CustomModal = ({ isOpen, onClose, children }: CustomModalProps) => {
  const handleOverlayClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  if (!isOpen) return null;

  return (
    <div
      className={
        'fixed inset-0 bg-slate-700 bg-opacity-50 flex justify-center items-center z-10'
      }
      onClick={handleOverlayClick}
    >
      <div
        className={
          'bg-white p-5 rounded-lg relative mx-4 laptop:w-6/12 overflow-y-auto max-h-full'
        }
        style={{ maxHeight: '90vh' }}
      >
        <button
          type={'button'}
          className={
            'absolute top-3 right-3 text-xl bg-transparent border-none cursor-pointer rounded-full hover:bg-slate-200 w-8 h-8'
          }
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
