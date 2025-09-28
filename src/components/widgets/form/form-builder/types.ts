import type { OurFileRouter } from "@/app/api/uploadthing/core";
import type { Doc } from "convex@/_generated/dataModel";
import type { EndpointArg } from "uploadthing/types";

export interface TextInputType {
  type: "text";
  name: string;
  title: string;
  placeholder?: string;
}

export interface SelectInputType<T extends string = string> {
  type: "select";
  name: string;
  title: string;
  options: { value: T; label: string; groupName?: string }[];
  style?: "select" | "radio" | "combobox";
  defaultValue?: T;
  selectOptions?: { placeholder: string };
  comboboxOptions?: {
    placeholder: string;
    searchPlaceholder: string;
    emptyNotice: string;
  };
}

export interface CheckboxInputType {
  type: "checkbox";
  name: string;
  title: string;
  options: { value: string; label: string }[];
  defaultValues?: string[];
}

export interface DateInputType {
  type: "date";
  name: string;
  title: string;
  placeholder?: string;
}

export interface FileInputType {
  type: "file";
  name: string;
  title: string;
  uploadEndpoint: EndpointArg<OurFileRouter, keyof OurFileRouter>;
  imagePreview?: boolean;
  user: Doc<"users">;
}

export type FormElement =
  | TextInputType
  | SelectInputType
  | CheckboxInputType
  | DateInputType
  | FileInputType;

/** Turn array of form elements into a KV type object mapping name -> value type */
export type FormValues<F extends readonly FormElement[]> = {
  [E in F[number] as E["name"]]: E extends TextInputType
    ? string
    : E extends SelectInputType
      ? E["options"][number]["value"]
      : E extends CheckboxInputType
        ? E["options"][number]["value"][]
        : E extends DateInputType
          ? Date
          : E extends FileInputType
            ? string
            : never;
};

export interface FormBuilderProps<F extends readonly FormElement[]> {
  formElements: F;
  flexDirection?: "row" | "column";
  /** full object of form values */
  value: FormValues<F>;
  /** will be called with the entire updated object */
  onChange: (value: FormValues<F>) => void;
}

/** For individual field inputs */
export interface FormElementValueProps<F extends FormElement> {
  value?: FormValues<[F]>[F["name"]];
  onChange?: (val: FormValues<[F]>[F["name"]]) => void;
}

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
  groupName?: string;
}
export type GroupedOptions<T extends string> = Record<string, SelectOption<T>[]>;