import React, { useState } from "react";
import * as TablerIcons from "@tabler/icons-react";
import clsx from "clsx";

type Props = {
  rating: number;
};

const GenerateStars = ({ rating }: Props) => {
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
              "cursor-pointer border-none transition-colors before:text-green-500",
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
            <TablerIcons.IconStarFilled
              style={{
                clipPath:
                  halfRating > 0 && index === parsedRating + 1
                    ? `inset(0 ${halfRating}% 0 0)`
                    : "",
              }}
              className=""
            />
          </div>
        );
      })}
    </div>
  );
};

export default GenerateStars;
