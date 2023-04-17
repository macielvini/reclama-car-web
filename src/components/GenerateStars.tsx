import React, { useState } from "react";
import * as TablerIcons from "@tabler/icons-react";
import clsx from "clsx";

type Props = {
  rating: number;
  size?: number;
};

const GenerateStars = ({ rating, size = 20 }: Props) => {
  const [stars, setStars] = useState(0);
  const parsedRating = Math.floor(rating);
  const halfRating = (1 - (rating - parsedRating)) * 100;

  return (
    <div className="star-rating flex">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <div
            key={index}
            className={clsx(
              "transition-color cursor-pointer border-none",
              {
                "text-accent-yellow":
                  index === parsedRating + 1 && halfRating > 0,
              },
              {
                "text-gray-400":
                  index > parsedRating &&
                  index !== parsedRating + 1 &&
                  halfRating > 0,
              },
              { "text-accent-yellow ": index <= parsedRating }
            )}
          >
            {halfRating > 0 && index === parsedRating + 1 ? (
              <div className="relative">
                <TablerIcons.IconStarFilled
                  style={{
                    clipPath: `inset(0 ${halfRating}% 0 0)`,
                  }}
                  size={size}
                />
                <TablerIcons.IconStarFilled
                  style={{
                    clipPath: `inset(0 0 0 ${100 - halfRating}%)`,
                  }}
                  className="absolute left-0 top-0 text-gray-400"
                  size={size}
                />
              </div>
            ) : (
              <TablerIcons.IconStarFilled className="" size={size} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GenerateStars;
