import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import * as TablerIcons from "@tabler/icons-react";

type Props = {
  rating: number | undefined;
  setState: Dispatch<SetStateAction<number>>;
};

const StarRating = ({ rating = 0, setState }: Props) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={clsx(
              "cursor-pointer border-none bg-transparent outline-none transition-colors",
              { "text-accent-yellow": index <= (hover || rating) },
              { "text-gray-400": index > (hover || rating) }
            )}
            onClick={() => setState(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <TablerIcons.IconStarFilled />
          </button>
        );
      })}
    </div>
  );
};

// className={index <= (hover || rating) ? "on" : "off"}

export default StarRating;
