import React from "react";
import { GenerateStarsFromNumber } from "../utils/GenerateStarsFromNumber";
import GenerateStars from "../pages/Home/GenerateStars";
import clsx from "clsx";

type Props = {
  position: number;
  rating: number;
  image: string;
  name: string;
};

const TopManufactureCard = ({ position, rating = 0, image, name }: Props) => {
  return (
    <div
      className={clsx(
        "relative flex h-[148px] w-[156px] flex-col items-center justify-center gap-close-relation rounded-md p-close-relation text-text-dark drop-shadow",
        { " bg-accent-green text-white": position === 1 },
        { "bg-layer": position > 1 || position === undefined }
      )}
    >
      <img src={image} alt="logo" className="max-h-8" />
      <p className="font-bold">{name}</p>
      <GenerateStars rating={rating} />
      <p className="font-bold">{rating.toFixed(1)} / 5.0</p>
      <p
        className={clsx(
          "absolute left-close-relation top-close-relation font-bold",
          {
            "flex aspect-square h-6 w-6 items-center justify-center rounded-full bg-accent-yellow text-accent-green drop-shadow-md":
              position === 1,
          }
        )}
      >
        {position}
      </p>
    </div>
  );
};

export default TopManufactureCard;
