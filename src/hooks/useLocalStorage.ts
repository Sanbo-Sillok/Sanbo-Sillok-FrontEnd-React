import { useEffect, useState } from 'react';

interface LocalStorageDataWithExpire<T> {
  value: T;
  expire: number | null;
}

interface UseLocalStorageOptions {
  expire?: number;
}

export default function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: UseLocalStorageOptions,
): [T, (value: T) => void, () => void] {
  const [value, setValue] = useState<T>(initialValue);

  const serializer = (plainValue: LocalStorageDataWithExpire<T>) => {
    return JSON.stringify(plainValue);
  };

  const deserializer = (serializedValue: string): LocalStorageDataWithExpire<T> => {
    return JSON.parse(serializedValue) as LocalStorageDataWithExpire<T>;
  };

  const getStoredValue = () => {
    const storedObj = window.localStorage.getItem(key);

    if (!storedObj) return initialValue;

    const { value: storedValue, expire } = deserializer(storedObj);

    if (expire && Date.now() > expire) {
      window.localStorage.removeItem(key);
      return initialValue;
    }

    return storedValue;
  };

  const saveValue = (newValue: T) => {
    const expire = options?.expire ? Date.now() + options.expire : null;
    const newData = { value: newValue, expire };

    window.localStorage.setItem(key, serializer(newData));
    setValue(newValue);
  };

  const removeValue = () => {
    window.localStorage.removeItem(key);
    setValue(initialValue);
  };

  useEffect(() => {
    setValue(getStoredValue());
  }, [key, initialValue]);

  return [value, saveValue, removeValue];
}
