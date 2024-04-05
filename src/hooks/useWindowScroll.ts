import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function useWindowScroll() {
  const location = useLocation();

  const [isScrollDown, setIsScrollDown] = useState(false);
  const prevPosition = useRef(0);

  const handleScroll = () => {
    const currentPosition = window.scrollY;
    const isScrollDownMax = currentPosition + window.innerHeight >= document.documentElement.scrollHeight;

    // 모바일에서 스크롤이 최대 범위 이상으로 넘어가는 경우
    if (currentPosition < 0 || isScrollDownMax) return;

    if (currentPosition > prevPosition.current) setIsScrollDown(true);
    else setIsScrollDown(false);

    prevPosition.current = currentPosition;
  };

  // 화면을 이동하는 경우 nav가 보이도록 설정
  useEffect(() => {
    setIsScrollDown(false);
  }, [location]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { isScrollDown };
}
