import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { types } from '@/lib';

interface FormProps {
  method: string;
  formFor: string;
  inputs: types.FormInput[];
  flexDirection?: "col" | "row" | "col-reverse" | "row-reverse";
}

export default function Form({ method, formFor, inputs, flexDirection }: FormProps) {
  const formClass = flexDirection ? `flex flex-${flexDirection} gap-4` : "flex flex-col gap-4";
  return (
    <form method={method} className={formClass}>
      <Input type="hidden" name="formFor" value={formFor} />
      {inputs.map((input) => (
        <div>
          <Label htmlFor={input.name}>{input.name}</Label>
          <Input
            type={input.type}
            name={input.name.toLowerCase().replace(' ', '')}
            placeholder={input.placeholder}
            required={input.required}
          />
        </div>
      ))}
      <Button type="submit">Submit</Button>
    </form>
  );
}
