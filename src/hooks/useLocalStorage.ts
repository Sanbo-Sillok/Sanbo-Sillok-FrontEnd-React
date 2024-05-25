import { useEffect, useState } from 'react';
import { isServer } from '@/utils/isServer';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface WindowEventMap {
    'local-storage': CustomEvent;
  }
}

interface LocalStorageDataWithExpire<T> {
  value: T;
  expire: number | null;
}

interface UseLocalStorageOptions {
  expire?: number;
}

export default function useLocalStorage<T>(
  key: string,
  initialValue: T | null,
  options?: UseLocalStorageOptions,
): [T | null, (value: T) => void, () => void] {
  const serializer = (plainValue: LocalStorageDataWithExpire<T>) => {
    return JSON.stringify(plainValue);
  };

  const deserializer = (serializedValue: string): LocalStorageDataWithExpire<T> => {
    return JSON.parse(serializedValue) as LocalStorageDataWithExpire<T>;
  };

  const getStoredValue = () => {
    if (isServer()) return initialValue;

    const storedObj = window.localStorage.getItem(key);

    if (!storedObj) return initialValue;

    const { value: storedValue, expire } = deserializer(storedObj);

    if (expire && Date.now() > expire) {
      window.localStorage.removeItem(key);
      return initialValue;
    }

    return storedValue;
  };

  const [value, setValue] = useState<T | null>(() => getStoredValue());

  const saveValue = (newValue: T) => {
    const expire = options?.expire ? Date.now() + options.expire : null;
    const newData = { value: newValue, expire };

    window.localStorage.setItem(key, serializer(newData));
    setValue(newValue);
    window.dispatchEvent(new StorageEvent('local-storage', { key }));
  };

  const removeValue = () => {
    window.localStorage.removeItem(key);
    setValue(initialValue);
    window.dispatchEvent(new StorageEvent('local-storage', { key }));
  };

  const handleStorageChange = (event: StorageEvent | CustomEvent) => {
    if ((event as StorageEvent).key && (event as StorageEvent).key !== key) return;
    setValue(getStoredValue());
  };

  useEffect(() => {
    window.addEventListener('local-storage', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('local-storage', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  });

  return [value, saveValue, removeValue];
}
