import { useEffect, useState } from "react";
import PersonalInfoStep from "./form-steps/PersonalInfoStep";
import ContactInfoStep from "./form-steps/ContactInfoStep";

import ReviewStep from "./form-steps/ReviewStep";


import {
  saveFormData,
  getFormData,
  clearFormData,
  saveSubmittedEntry,
  getSubmittedEntries,
  clearSubmittedEntries,
} from "../services/storage-service.ts";
import CategoriesStep from "./form-steps/CategoriesStep.tsx";
import StepIndicator from "./form-steps/StepIndicator.tsx";
import SubmittedEntries from "./SubmittedEntries.tsx";
import type { FormData, SubmittedEntry } from "../types/form-types.ts";
import { toast } from "sonner";



const initialFormData: FormData = {
  name: "",
  email: "",
  address: "",
  phone: "",
  categories: [],
};

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submittedEntries, setSubmittedEntries] = useState<SubmittedEntry[]>([]);
  

  useEffect(() => {
    const savedFormData = getFormData();
    if (savedFormData) {
      setFormData(savedFormData);
    }

    const savedEntries = getSubmittedEntries();
    setSubmittedEntries(savedEntries);
  }, []);

  const updateFormData = (data: Partial<FormData>) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);
    saveFormData(updatedData);
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo(0, 0);
  };

  const handleSubmit = () => {
    const newEntry: SubmittedEntry = {
      ...formData,
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
    };

    const updatedEntries = [newEntry, ...submittedEntries];
    setSubmittedEntries(updatedEntries);
    saveSubmittedEntry(newEntry);

    setFormData(initialFormData);
    clearFormData();
    setCurrentStep(1);

    toast.success("Form submitted successfully!" )

    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    setFormData(initialFormData);
    clearFormData();
    setCurrentStep(1);

    
  };

  const handleClearEntries = () => {
    setSubmittedEntries([]);
    clearSubmittedEntries();

    toast.warning("All submitted entries have been removed.")
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <ContactInfoStep
            formData={formData}
            updateFormData={updateFormData}
            onBack={prevStep}
            onNext={nextStep}
          />
        );
      case 3:
        return (
          <CategoriesStep
            formData={formData}
            updateFormData={updateFormData}
            onBack={prevStep}
            onNext={nextStep}
          />
        );
      case 4:
        return (
          <ReviewStep
            formData={formData}
            onBack={prevStep}
            onSubmit={handleSubmit}
            editStep={goToStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-10 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Multi-Step Form</h1>
        <button
          onClick={handleReset}
          className="text-red-600 hover:text-red-800 transition-colors flex items-center space-x-1"
        >
          Reset Form
        </button>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <StepIndicator currentStep={currentStep} totalSteps={4} />
        {renderStep()}
      </div>

      <SubmittedEntries entries={submittedEntries} clearEntries={handleClearEntries} />
    </div>
  );
};

export default MultiStepForm;
