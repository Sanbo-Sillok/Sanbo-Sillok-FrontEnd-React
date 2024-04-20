import { Navigate } from 'react-router-dom';
import { MAIN_PAGE_URL } from '@/constants/common';

export default function Home() {
  return <Navigate to={MAIN_PAGE_URL} replace />;
}
