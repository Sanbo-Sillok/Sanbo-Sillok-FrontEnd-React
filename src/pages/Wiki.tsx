import { useParams } from 'react-router-dom';

export default function Wiki() {
  const { id } = useParams();

  return <h1 className="text-3xl text-sanbo-blue">{id}</h1>;
}
