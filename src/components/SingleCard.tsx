import { FC, useEffect, useState } from 'react';

import showSingleCard from '../api/showSingleCard';
import Loader from './loader/Loader';

interface ICharacterState {
  name: string;
  status: string;
  gender: string;
  image: string;
  created: string;
}

const defaultCard: ICharacterState = {
  name: '',
  status: '',
  gender: '',
  image: '',
  created: '',
};

export interface SingleCardProps {
  id: string;
  handleCloseCard: () => void;
}

const SingleCard: FC<SingleCardProps> = ({ id, handleCloseCard }) => {
  const [card, setCard] = useState(defaultCard);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const data: ICharacterState = await showSingleCard(Number(id));
        setCard(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (id) {
      fetchCard();
    }
  }, [id]);

  return !card || !card.image ? (
    <Loader />
  ) : (
    <div className="relative flex flex-col self-start w-64 p-4 gap-2 border rounded-sm border-gray-300 border-solid">
      <div className="flex items-center justify-center">
        <button
          onClick={handleCloseCard}
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

export default SingleCard;
