import React from 'react';

export default function usePersistedState<T>(name: string, defaultValue: T) {
  const [value, setValue] = React.useState<T>(defaultValue);

  React.useEffect(() => {
    try {
      const storedValue = localStorage.getItem(name);
      if (storedValue !== null) {
        setValue(JSON.parse(storedValue) as T);
      } else {
        localStorage.setItem(name, JSON.stringify(defaultValue));
      }
    } catch {
      setValue(defaultValue);
    }
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem(name, JSON.stringify(value));
    } catch {}
  }, [value]);

  return [value, setValue];
}
