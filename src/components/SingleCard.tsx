import { FC, useEffect, useState } from 'react';

import { showSingleCard } from '../api/showSingleCard';
import { useNavigate, useParams, useSearchParams } from 'react-router';

interface ICharacterState {
  name: string;
  status: string;
  gender: string;
  image: string | undefined;
  created: string;
}

const defaultCard: ICharacterState = {
  name: '',
  status: '',
  gender: '',
  image: undefined,
  created: '',
};

export const SingleCard: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState(defaultCard);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const data: ICharacterState = await showSingleCard(Number(id));
        setCard(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (id) {
      fetchCard();
    }
  }, [id]);

  const closeSingleCard = () => {
    navigate(`/?page=${currentPage}`);
  };

  return (
    <div className="relative flex flex-col self-start w-64 p-4 gap-2 border rounded-sm border-gray-300 border-solid">
      <div className="flex items-center justify-center">
        <button
          onClick={closeSingleCard}
          className="absolute top-0 right-1 text-gray-300 hover:text-gray-500 font-bold text-lg cursor-pointer"
        >
          x
        </button>
        <img className="rounded-sm" src={card.image} alt={card.name} />
      </div>
      <div className="flex flex-col">
        <h3 className="capitalize">{card.name}</h3>
        <p className="text-sm text-gray-500 italic">
          <span>status: </span>
          {card.status}
        </p>
        <p className="text-sm text-gray-500 italic">
          <span>gender: </span>
          {card.gender}
        </p>
        <p className="text-xs text-gray-700 italic">{card.created}</p>
      </div>
    </div>
  );
};
