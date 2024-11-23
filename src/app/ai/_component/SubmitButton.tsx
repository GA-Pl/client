interface SubmitButtonProps {
  onClick: () => void;
  label: string;
}

function SubmitButton({ onClick, label }: SubmitButtonProps) {
  return (
    <button
      type={'button'}
      onClick={onClick}
      className={
        'ml-2 px-4 py-2 bg-primary hover:bg-primary700 focus:outline-none focus:ring-2 focus:ring-primary500 focus:ring-opacity-50 text-white font-medium rounded-md transition ease-in-out duration-150 text-sm text-nowrap'
      }
    >
      {label}
    </button>
  );
}

export default SubmitButton;
