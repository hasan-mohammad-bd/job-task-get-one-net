import type { FormData, SubmittedEntry } from "../types/form-types";


const FORM_DATA_KEY = "multi_step_form_data";
const SUBMITTED_ENTRIES_KEY = "multi_step_form_submitted_entries";

export const saveFormData = (data: FormData): void => {
  localStorage.setItem(FORM_DATA_KEY, JSON.stringify(data));
};

export const getFormData = (): FormData | null => {
  const data = localStorage.getItem(FORM_DATA_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearFormData = (): void => {
  localStorage.removeItem(FORM_DATA_KEY);
};

export const saveSubmittedEntry = (entry: SubmittedEntry): void => {
  const entries = getSubmittedEntries();
  localStorage.setItem(SUBMITTED_ENTRIES_KEY, JSON.stringify([entry, ...entries]));
};

export const getSubmittedEntries = (): SubmittedEntry[] => {
  const data = localStorage.getItem(SUBMITTED_ENTRIES_KEY);
  return data ? JSON.parse(data) : [];
};

export const clearSubmittedEntries = (): void => {
  localStorage.removeItem(SUBMITTED_ENTRIES_KEY);
};
