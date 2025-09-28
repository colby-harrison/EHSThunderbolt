import { useEffect, useState } from "react";
import type { FormElementValueProps, GroupedOptions, SelectInputType, SelectOption } from "../types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn, toSnakeCase } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

function groupOptions<T extends string>(
  options: SelectOption<T>[]
): GroupedOptions<T> {
  return options.reduce<GroupedOptions<T>>(
    (acc, option) => {
      const group = option.groupName ?? "ungrouped";
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(option);
      return acc;
    },
    { ungrouped: [] }
  );
}

export function SelectInput({
  name,
  title,
  options,
  defaultValue,
  style = "radio",
  selectOptions = { placeholder: "Select..." },
  comboboxOptions = {
    placeholder: "Select...",
    searchPlaceholder: "Search...",
    emptyNotice: "No options found.",
  },
  value,
  onChange,
}: SelectInputType & FormElementValueProps<SelectInputType>) {
  const [localValue, setLocalValue] = useState<
    SelectInputType["options"][number]["value"] | undefined
  >(value ?? defaultValue ?? undefined);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (value !== undefined) {
      setLocalValue(value);
    }
  }, [value]);
  function handleChange(e: SelectInputType["options"][number]["value"]) {
    onChange?.(e);
    setLocalValue(e);
    setOpen(false);
  }
  if (style === "radio") {
    return (
      <div className='flex flex-col gap-2'>
        <h2 className='text-xl font-semibold'>{title}</h2>
        <RadioGroup
          defaultValue={defaultValue}
          value={localValue}
          onValueChange={(e) => handleChange(e)}
        >
          {options.map((option) => (
            <div
              className='flex items-center space-x-2'
              key={`${name}-${option.value}`}
            >
              <RadioGroupItem
                value={option.value}
                id={`${name}-${option.value}`}
              />
              <Label htmlFor={`${name}-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  } else if (style === "select") {
    const groupedOptions = groupOptions(options);
    const ungroupedOptions = groupedOptions.ungrouped;
    const groupedOptionsKeys = Object.keys(groupedOptions).filter(
      (key) => key !== "ungrouped"
    );
    return (
      <div className='flex flex-col gap-2'>
        <h2 className='text-xl font-semibold'>{title}</h2>
        <Select
          value={localValue}
          onValueChange={(e) => handleChange(e)}
          open={open}
          onOpenChange={setOpen}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder={selectOptions.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {ungroupedOptions &&
              ungroupedOptions.map((option) => (
                <SelectItem
                  value={option.value}
                  key={`${name}-${option.value}`}
                >
                  {option.label}
                </SelectItem>
              ))}
            {groupedOptionsKeys.map((groupName) => (
              <SelectGroup key={toSnakeCase(groupName)}>
                <SelectLabel>{groupName}</SelectLabel>
                {groupedOptions[groupName]?.map((option) => (
                  <SelectItem
                    value={option.value}
                    key={`${name}-${toSnakeCase(groupName)}-${option.value}`}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  } else if (style === "combobox") {
    const groupedOptions = groupOptions(options);
    const ungroupedOptions = groupedOptions.ungrouped;
    const groupedOptionsKeys = Object.keys(groupedOptions).filter(
      (key) => key !== "ungrouped"
    );
    return (
      <div className='flex flex-col gap-2'>
        <h2 className='text-xl font-semibold'>{title}</h2>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={open}
              className='w-[200px] justify-between'
            >
              {value
                ? options.find((option) => option.value === value)?.label
                : comboboxOptions.placeholder}
              <ChevronsUpDown className='opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0'>
            <Command>
              <CommandInput
                placeholder={comboboxOptions.searchPlaceholder}
                className='h-9'
              />
              <CommandList>
                <CommandEmpty>{comboboxOptions.emptyNotice}</CommandEmpty>
                {ungroupedOptions && (
                  <CommandGroup>
                    {ungroupedOptions.map((option) => (
                      <CommandItem
                        key={`${name}-${option.value}`}
                        value={option.value}
                        onSelect={(currentValue) => handleChange(currentValue)}
                      >
                        {option.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === option.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                {groupedOptionsKeys.map((groupName) => (
                  <CommandGroup
                    key={toSnakeCase(groupName)}
                    heading={groupName}
                  >
                    {groupedOptions[groupName]?.map((option) => (
                      <CommandItem
                        key={`${name}-${toSnakeCase(groupName)}-${option.value}`}
                        value={option.value}
                        onSelect={(currentValue) => handleChange(currentValue)}
                      >
                        {option.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === option.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
  } else return <p>Invalid style</p>;
}