import { useState } from "react";



import type { FormData, FormErrors } from "../../types/form-types";
import { validateCategories } from "../../utils/form-validation";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/Checkbox";
import { Label } from "../ui/Label";


interface CategoriesStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onBack: () => void;
  onNext: () => void;
}

const CATEGORIES = [
  { id: "javascript", label: "JavaScript" },
  { id: "typescript", label: "TypeScript" },
  { id: "react", label: "React" },
  { id: "nextjs", label: "Next.js" },
  { id: "nodejs", label: "Node.js" },
  { id: "vuejs", label: "Vue.js" },
  { id: "angular", label: "Angular" },
  { id: "svelte", label: "Svelte" },
  { id: "graphql", label: "GraphQL" },
  { id: "webdev", label: "Web Development" },
];


const CategoriesStep = ({
  formData,
  updateFormData,
  onBack,
  onNext,
}: CategoriesStepProps) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState(false);

  const handleCategoryChange = (category: string, checked: boolean) => {
    let updatedCategories: string[];
    
    if (checked) {
      updatedCategories = [...formData.categories, category];
    } else {
      updatedCategories = formData.categories.filter((c) => c !== category);
    }
    
    updateFormData({ categories: updatedCategories });
    
    if (touched) {
      const validationResult = validateCategories({ categories: updatedCategories });
      setErrors({ categories: validationResult.categories });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    
    const validationResult = validateCategories(formData);
    setErrors(validationResult);
    
    if (Object.keys(validationResult).length === 0) {
      onNext();
    }
  };

  return (
<form onSubmit={handleSubmit}>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Categories</h2>
        <p className="text-gray-600">Select interests that apply to you (select at least one)</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CATEGORIES.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={formData.categories.includes(category.id)}
                onChange={(e) => 
                  handleCategoryChange(category.id, e.target.checked)
                }
              />
              <Label htmlFor={category.id} className="text-base">
                {category.label}
              </Label>
            </div>
          ))}
        </div>
        
        {errors.categories && touched && (
          <p className="text-red-500 text-sm mt-1">{errors.categories}</p>
        )}

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
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Review
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CategoriesStep;