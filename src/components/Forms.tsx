import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { types } from '@/lib';

interface FormProps {
  method: string;
  formFor: string;
  inputs: types.FormInput[];
  flexDirection?: 'col' | 'row' | 'col-reverse' | 'row-reverse';
  action?: string;
  redirectTo?: string;
}

export default function Form({
  method,
  formFor,
  inputs,
  flexDirection,
  action,
  redirectTo
}: FormProps) {
  const formClass = flexDirection
    ? `flex flex-${flexDirection} gap-4`
    : 'flex flex-col gap-4';
  return (
    <form method={method} className={formClass} action={action}>
      <Input type="hidden" name="formFor" value={formFor} />
      <Input type="hidden" name="redirectTo" value={redirectTo} />
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
