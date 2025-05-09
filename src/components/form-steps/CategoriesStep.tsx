import { useForm, Controller } from "react-hook-form";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import type { FormData } from "../../types/form-types";
import { Checkbox } from "../ui/Checkbox";
import { Button } from "../ui/button";

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
  const form = useForm<Pick<FormData, "categories">>({
    defaultValues: {
      categories: formData.categories,
    },
  });

  const handleSubmit = (data: Pick<FormData, "categories">) => {
    updateFormData(data);
    onNext();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Categories</h2>
          <p className="text-gray-600">Select interests that apply to you (select at least one)</p>
        </div>

        <div className="space-y-6">
          <FormField
            control={form.control}
            name="categories"
            rules={{ 
              validate: value => value.length > 0 || "Please select at least one category" 
            }}
            render={() => (
              <FormItem>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CATEGORIES.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Controller
                        name="categories"
                        control={form.control}
                        render={({ field }) => {
                          return (
                            <Checkbox
                              id={category.id}
                              checked={field.value?.includes(category.id)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const updatedCategories = checked
                                  ? [...field.value, category.id]
                                  : field.value.filter((val) => val !== category.id);
                                field.onChange(updatedCategories);
                              }}
                            />
                          );
                        }}
                      />
                      <FormLabel htmlFor={category.id} className="text-base">
                        {category.label}
                      </FormLabel>
                    </div>
                  ))}
                </div>
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
              Review
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CategoriesStep;