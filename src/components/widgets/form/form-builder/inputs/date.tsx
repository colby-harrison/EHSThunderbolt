
import { CalendarIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import type { DateInputType, FormElementValueProps } from "../types";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export function DateInput({
  name,
  title,
  placeholder = "Select a date",
  value,
  onChange,
}: DateInputType & FormElementValueProps<DateInputType>) {
  const [localValue, setLocalValue] = useState<Date | undefined>(value);
  useEffect(() => {
    if (value !== undefined) {
      setLocalValue(value);
    }
  }, [value]);
  function handleChange(e?: Date) {
    if (e) {
      onChange?.(e);
      setLocalValue(e);
    }
  }
  return (
    <div className='flex flex-col gap-2'>
      <Label htmlFor={`${name}-${title}`}>{title}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            data-empty={!localValue}
            className='data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal'
          >
            <CalendarIcon />
            {localValue ? (
              format(localValue, "PPP")
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Calendar
            mode='single'
            selected={localValue}
            onSelect={(e) => handleChange(e)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}