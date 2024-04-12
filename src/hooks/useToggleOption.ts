import { useEffect, useRef, useState } from 'react';

export default function useToggleOption() {
  const [isOpen, setIsOpen] = useState(false);
  const optionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (optionRef.current && !optionRef.current.contains(event.target as Node)) setIsOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [optionRef]);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, toggle, optionRef };
}
