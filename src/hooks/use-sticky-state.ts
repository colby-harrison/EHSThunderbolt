// based on https://www.joshwcomeau.com/snippets/react-hooks/use-sticky-state/ with some modifications made by Gemini 2.5 Flash 

import React from 'react';

type SetValue<T> = React.Dispatch<React.SetStateAction<T>>;

export function useStickyState<T>(defaultValue: T, key: string): [T, SetValue<T>] {
  const [value, setValue] = React.useState<T>(() => {
    const stickyValue = window.localStorage.getItem(key);

    return stickyValue !== null ? (JSON.parse(stickyValue) as T) : defaultValue;
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}