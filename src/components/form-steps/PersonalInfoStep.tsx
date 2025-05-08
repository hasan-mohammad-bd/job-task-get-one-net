import { useState } from "react";
import type { FormData, FormErrors } from "../../types/form-types";
import { validatePersonalInfo } from "../../utils/form-validation";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { Button } from "../ui/button";
// import { FormData, FormErrors } from "@/types/form-types";
// import { validatePersonalInfo } from "@/utils/form-validation";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/custom/Label";
// import { Button } from "@/components/ui/custom/Button";

interface PersonalInfoStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
}

const PersonalInfoStep = ({
  formData,
  updateFormData,
  onNext,
}: PersonalInfoStepProps) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState({
    name: false,
    email: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    
    if (touched[name as keyof typeof touched]) {
      const validationResult = validatePersonalInfo({
        ...formData,
        [name]: value,
      });
      setErrors((prev) => ({ ...prev, [name]: validationResult[name as keyof FormErrors] }));
    }
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validationResult = validatePersonalInfo(formData);
    setErrors((prev) => ({ ...prev, [field]: validationResult[field] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationResult = validatePersonalInfo(formData);
    setErrors(validationResult);
    setTouched({ name: true, email: true });
    
    if (Object.keys(validationResult).length === 0) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Personal Information</h2>
        <p className="text-gray-600">Please provide your personal details</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-base">
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={() => handleBlur("name")}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && touched.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-base">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={() => handleBlur("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="pt-6">
          <Button type="submit">
            Continue
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PersonalInfoStep;