import { useEffect, useRef, useState } from 'react';

export default function useWindowScroll() {
  const [isScrollDown, setIsScrollDown] = useState(false);
  const prevPosition = useRef(0);

  const handleScroll = () => {
    const currentPosition = window.scrollY;
    const isScrollDownMax = currentPosition + window.innerHeight >= document.documentElement.scrollHeight;

    if (currentPosition < 0 || isScrollDownMax) return;

    if (currentPosition > prevPosition.current) setIsScrollDown(true);
    else setIsScrollDown(false);

    prevPosition.current = currentPosition;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { isScrollDown };
}
