import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import type { FormData } from "../../types/form-types";
import { Input } from "../ui/Input";
import { Button } from "../ui/button";

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
  const form = useForm<Pick<FormData, "address" | "phone">>({
    defaultValues: {
      address: formData.address,
      phone: formData.phone,
    },
  });

  const handleSubmit = (data: Pick<FormData, "address" | "phone">) => {
    updateFormData(data);
    onNext();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
          <p className="text-gray-600">Let us know how to reach you</p>
        </div>

        <div className="space-y-6">
          <FormField
            control={form.control}
            name="address"
            rules={{ required: "Address is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            rules={{ 
              required: "Phone number is required",
              pattern: {
                value: /^[0-9\-\+\s()]*$/,
                message: "Phone number should contain only digits, spaces, and +()- characters"
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
              className="w-full"
            >
              Continue
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ContactInfoStep;