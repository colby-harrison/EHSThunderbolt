"use client";

import { cn } from "@/lib/utils";
import type { FormBuilderProps, FormElement, FormValues } from "./types";
import {
  TextInput,
  SelectInput,
  CheckboxInput,
  DateInput,
  FileInput,
} from "./inputs";
import { useState, useEffect } from "react";

export default function FormBuilder<T extends readonly FormElement[]>({
  formElements,
  flexDirection = "column",
  value,
  onChange,
}: FormBuilderProps<T>) {
  const [localValue, setLocalValue] = useState<FormValues<T>>(value);

  // keep local state in sync if parent supplies new value
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  function handleFieldChange<K extends keyof FormValues<T>>(
    key: K,
    val: FormValues<T>[K]
  ) {
    const newValue = { ...localValue, [key]: val };
    setLocalValue(newValue);
    onChange(newValue);
  }

  return (
    <div
      className={cn(
        "flex gap-2",
        flexDirection === "row" ? "flex-row" : "flex-col"
      )}
    >
      {formElements.map((element) => {
        switch (element.type) {
          case "text": {
            const key = element.name as keyof FormValues<T>;
            return (
              <TextInput
                {...element}
                key={element.name}
                value={localValue[key] as string | undefined}
                onChange={(val: string) => handleFieldChange(key, val as FormValues<T>[typeof key])}
              />
            );
          }
          case "select": {
            const key = element.name as keyof FormValues<T>;
            return (
              <SelectInput
                {...element}
                key={element.name}
                value={localValue[key] as string | undefined}
                onChange={(val: string) => handleFieldChange(key, val as FormValues<T>[typeof key])}
              />
            );
          }
          case "checkbox": {
            const key = element.name as keyof FormValues<T>;
            return (
              <CheckboxInput
                {...element}
                key={element.name}
                value={localValue[key] as string[] | undefined}
                onChange={(val: string[]) => handleFieldChange(key, val as FormValues<T>[typeof key])}
              />
            );
          }
          case "date": {
            const key = element.name as keyof FormValues<T>;
            return (
              <DateInput
                {...element}
                key={element.name}
                value={localValue[key] as Date | undefined}
                onChange={(val: Date | undefined) => handleFieldChange(key, val as FormValues<T>[typeof key])}
              />
            );
          }
          case "file": {
            const key = element.name as keyof FormValues<T>;
            return (
              <FileInput
                {...element}
                key={element.name}
                value={localValue[key] as string | undefined}
                onChange={(val: string) => handleFieldChange(key, val as FormValues<T>[typeof key])}
              />
            );
          }
          default:
            return (
              <p key={crypto.randomUUID()}>Invalid element type</p>
            );
        }
      })}
    </div>
  );
}