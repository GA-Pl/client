export interface SecondStepDetails {
  analyzeRecommendation: string;
  finalStep: string;
}

export interface SecondStepProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  secondStep: SecondStepDetails;
  secondKeys: Array<keyof SecondStepDetails>;
}
