import { useAllTitleQuery } from '@/apis/queries/useAllTitleQuery';

export default function AllTitle() {
  const { data } = useAllTitleQuery();

  return <div>{JSON.stringify(data)}</div>;
}
