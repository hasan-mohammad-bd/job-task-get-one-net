import type { FormData } from "../../types/form-types";
import { Button } from "../ui/button";
import { Card } from "../ui/card";


interface ReviewStepProps {
  formData: FormData;
  onBack: () => void;
  onSubmit: () => void;
  editStep: (step: number) => void;
}

const CATEGORIES = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  react: "React",
  nextjs: "Next.js",
  nodejs: "Node.js",
  vuejs: "Vue.js",
  angular: "Angular",
  svelte: "Svelte",
  graphql: "GraphQL",
  webdev: "Web Development",
};

const ReviewStep = ({ formData, onBack, onSubmit, editStep }: ReviewStepProps) => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Review Your Information</h2>
        <p className="text-gray-600">Please review your information before submitting</p>
      </div>

      <div className="space-y-6">
        <Card className="p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">Personal Information</h3>
              <Button variant="link" onClick={() => editStep(1)} className="text-blue-600 h-auto p-0">
                Edit
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-start">
                <span className="text-gray-500 w-24">Name:</span>
                <span className="font-medium">{formData.name}</span>
              </div>
              <div className="flex items-start">
                <span className="text-gray-500 w-24">Email:</span>
                <span className="font-medium">{formData.email}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">Contact Information</h3>
              <Button variant="link" onClick={() => editStep(2)} className="text-blue-600 h-auto p-0">
                Edit
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-start">
                <span className="text-gray-500 w-24">Address:</span>
                <span className="font-medium">{formData.address}</span>
              </div>
              <div className="flex items-start">
                <span className="text-gray-500 w-24">Phone:</span>
                <span className="font-medium">{formData.phone}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">Selected Categories</h3>
              <Button variant="link" onClick={() => editStep(3)} className="text-blue-600 h-auto p-0">
                Edit
              </Button>
            </div>
            <div>
              <div className="flex flex-wrap gap-2">
                {formData.categories.map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                  >
                    {CATEGORIES[category as keyof typeof CATEGORIES]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <div className="pt-6 flex gap-4">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="w-full"
          >
            Back
          </Button>
          <Button
            type="button"
            onClick={onSubmit}
            variant="default"
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;