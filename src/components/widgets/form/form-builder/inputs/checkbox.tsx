import { useState, useEffect } from "react";
import type { CheckboxInputType, FormElementValueProps } from "../types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function CheckboxInput({
  name,
  title,
  options,
  defaultValues,
  value,
  onChange,
}: CheckboxInputType & FormElementValueProps<CheckboxInputType>) {
  const [localValue, setLocalValue] = useState<
    CheckboxInputType["options"][number]["value"][]
  >(value ?? defaultValues ?? []);
  useEffect(() => {
    if (value !== undefined) {
      setLocalValue(value);
    }
  }, [value]);
  function handleChange(e: string[]) {
    onChange?.(e);
    setLocalValue(e);
  }
  return (
    <div className='flex flex-col gap-2'>
      <h2 className='text-xl font-semibold'>{title}</h2>
      {options.map((option) => (
        <div
          className='flex items-center space-x-2'
          key={`${name}-${option.value}`}
        >
          <Checkbox
            checked={localValue.includes(option.value)}
            onCheckedChange={(e) =>
              handleChange(
                e
                  ? Array.from(new Set([...localValue, option.value]))
                  : localValue.filter((v) => v !== option.value)
              )
            }
            id={`${name}-${option.value}`}
          />
          <Label htmlFor={`${name}-${option.value}`}>{option.label}</Label>
        </div>
      ))}
    </div>
  );
}