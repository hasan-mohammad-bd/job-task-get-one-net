import { useState } from "react";
import type { FormData, FormErrors } from "../../types/form-types";
import { validateContactInfo } from "../../utils/form-validation";
import { Button } from "../ui/button";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";

interface ContactInfoStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onBack: () => void;
  onNext: () => void;
}

const ContactInfoStep = ({
  formData,
  updateFormData,
  onBack,
  onNext,
}: ContactInfoStepProps) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState({
    address: false,
    phone: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    
    if (touched[name as keyof typeof touched]) {
      const validationResult = validateContactInfo({
        ...formData,
        [name]: value,
      });
      setErrors((prev) => ({ ...prev, [name]: validationResult[name as keyof FormErrors] }));
    }
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validationResult = validateContactInfo(formData);
    setErrors((prev) => ({ ...prev, [field]: validationResult[field] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationResult = validateContactInfo(formData);
    setErrors(validationResult);
    setTouched({ address: true, phone: true });
    
    if (Object.keys(validationResult).length === 0) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
        <p className="text-gray-600">Let us know how to reach you</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="address" className="text-base">
            Address
          </Label>
          <Input
            id="address"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleInputChange}
            onBlur={() => handleBlur("address")}
            className={errors.address ? "border-red-500" : ""}
          />
          {errors.address && touched.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-base">
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleInputChange}
            onBlur={() => handleBlur("phone")}
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && touched.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

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
            Continue
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ContactInfoStep;