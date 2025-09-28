import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FormElementValueProps, TextInputType } from "../types";
import { useState, useEffect } from "react";

export function TextInput({
  name,
  title,
  placeholder,
  value,
  onChange,
}: TextInputType & FormElementValueProps<TextInputType>) {
  const [localValue, setLocalValue] = useState(value || "");
  useEffect(() => {
    if (value !== undefined) {
      setLocalValue(value);
    }
  }, [value]);
  function handleChange(e: string) {
    onChange?.(e);
    setLocalValue(e);
  }
  return (
    <div className='flex flex-col gap-2'>
      <Label htmlFor={`${name}-${title}`}>{title}</Label>
      <Input
        id={`${name}-${title}`}
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}