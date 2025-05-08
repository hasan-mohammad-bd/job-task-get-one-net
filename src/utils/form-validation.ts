import type { FormData, FormErrors } from "../types/form-types";


export const validatePersonalInfo = (data: Pick<FormData, "name" | "email">): FormErrors => {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  return errors;
};

export const validateContactInfo = (data: Pick<FormData, "address" | "phone">): FormErrors => {
  const errors: FormErrors = {};

  if (!data.address.trim()) {
    errors.address = "Address is required";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^[0-9\-\+\s()]*$/.test(data.phone)) {
    errors.phone = "Phone number should contain only digits, spaces, and +()- characters";
  }

  return errors;
};

export const validateCategories = (data: Pick<FormData, "categories">): FormErrors => {
  const errors: FormErrors = {};

  if (!data.categories.length) {
    errors.categories = "Please select at least one category";
  }

  return errors;
};