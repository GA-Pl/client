'use client';

import React, { useState, useEffect } from 'react';
import Start from './first/Start';
import BasicQuestion from './first/BasicQuestion';
import GeneratingSubject from './loader/GeneratingSubject';
import DetailQuestion from './second/DetailQuestion';
import GeneratingDocument from './loader/GeneratingDocument';
import AiPlan from './second/AiPlan';
import { useSubjectStore } from '../_store/useSubjectStore';

const AiManager = () => {
  const [currentStep, setCurrentStep] = useState(-1);
  const { subjectData, documentData } = useSubjectStore();
  useEffect(() => {
    if (subjectData && currentStep === 4) {
      setCurrentStep(5);
    }
  }, [subjectData, currentStep, setCurrentStep]);

  useEffect(() => {
    if (documentData && currentStep === 6) {
      setCurrentStep(7);
    }
  }, [documentData, currentStep, setCurrentStep]);

  const handleProceed = () => setCurrentStep(0);

  return (
    <div className={'flex flex-col justify-center items-center mt-16'}>
      {currentStep === -1 && <Start onProceed={handleProceed} />}
      {currentStep >= 0 && currentStep <= 3 && (
        <BasicQuestion
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep === 4 && <GeneratingSubject />}
      {currentStep === 5 && <DetailQuestion setCurrentStep={setCurrentStep} />}
      {currentStep === 6 && <GeneratingDocument />}
      {currentStep === 7 && <AiPlan />}
    </div>
  );
};

export default AiManager;
