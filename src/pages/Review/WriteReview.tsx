import * as TablerIcons from "@tabler/icons-react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { Car, CreateReview } from ".";
import { Dispatch, SetStateAction } from "react";

type Props = {
  car: Car;
  review: CreateReview;
  setState: Dispatch<SetStateAction<CreateReview>>;
  toggleState: Dispatch<SetStateAction<boolean>>;
};

const WriteReview = ({ car, review, setState }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center gap-relation border-b-1 pb-no-relation">
        <img
          src={car.model.image}
          alt={car.model.model}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div className="flex flex-col text-base font-bold text-text-dark">
          <span>{`${car.model.model} ${car.model.engineSize} ${car.model.fuelType} - ${car.year.year}`}</span>
          <span>{car.manufacture.name}</span>
        </div>
      </div>
      <div className="mt-no-relation flex flex-col gap-relation">
        <input
          type="text"
          placeholder="Insira um titulo"
          className="text-title font-bold text-text-dark outline-none placeholder:text-text-light"
          value={review.title}
          onChange={(e) => setState({ ...review, title: e.target.value })}
        />
        <textarea
          placeholder="Escreva aqui..."
          className="h-full min-h-[150px] w-full text-lg text-text-dark outline-none placeholder:text-text-light"
          value={review.review}
          onChange={(e) => setState({ ...review, review: e.target.value })}
        />
      </div>
    </>
  );
};

export default WriteReview;
