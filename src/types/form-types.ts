export type FormData = {
  name: string;
  email: string;
  address: string;
  phone: string;
  categories: string[];
};

export type FormErrors = {
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
  categories?: string;
};

export type SubmittedEntry = FormData & {
  id: string;
  submittedAt: string;
};
