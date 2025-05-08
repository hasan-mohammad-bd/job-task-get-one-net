import { cn } from "../../lib/utils";


interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold",
                index + 1 < currentStep
                  ? "bg-purple-500"
                  : index + 1 === currentStep
                  ? "bg-purple-600"
                  : "bg-purple-300"
              )}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  "h-1 w-16 md:w-24 lg:w-32",
                  index + 1 < currentStep
                    ? "bg-purple-500"
                    : "bg-purple-300"
                )}
              ></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <div className="text-left">Personal Info</div>
        <div className="text-center">Contact Info</div>
        <div className="text-center">Categories</div>
        <div className="text-right">Review</div>
      </div>
    </div>
  );
};

export default StepIndicator;