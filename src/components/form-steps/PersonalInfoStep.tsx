import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useEffect } from "react";
import type { FormData } from "../../types/form-types";
import { Input } from "../ui/Input";
import { Button } from "../ui/button";

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
  const form = useForm<Pick<FormData, "name" | "email">>({
    defaultValues: {
      name: formData.name || "",
      email: formData.email || "",
    },
  });

  // Reset form values when formData changes (e.g. when loaded from localStorage)
  useEffect(() => {
    if (formData.name || formData.email) {
      form.reset({
        name: formData.name,
        email: formData.email,
      });
    }
  }, [formData, form]);

  const handleSubmit = (data: Pick<FormData, "name" | "email">) => {
    updateFormData(data);
    onNext();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Personal Information</h2>
          <p className="text-gray-600">Please provide your personal details</p>
        </div>

        <div className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            rules={{ 
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address"
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-6">
            <Button type="submit">
              Continue
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PersonalInfoStep;