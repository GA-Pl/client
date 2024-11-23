export interface Option {
  name: string;
  value: string;
  image?: string;
}

export interface Options {
  age: Option[];
  groupSize: Option[];
  theme: Option[];
  category: Option[];
  recommendation: Option[];
}

export interface BasicQuestionProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  questions: { [key: string]: string };
  questionKeys: string[];
  inputValue: string;
  answers: { [key: string]: string };
  showInput: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNextStep: () => void;
  handleOptionSelect: (option: Option) => void;
  handleEditAnswer: (index: number) => void;
  handleGenerateAI: () => void;
}
