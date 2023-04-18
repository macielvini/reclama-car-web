import dayjs from "dayjs";
import * as TablerIcons from "@tabler/icons-react";
import HorizontalSeparator from "./HorizontalSeparator";
import GenerateStars from "./GenerateStars";
import { useState } from "react";

export type ReviewProps = {
  id: string;
  user: {
    id: string;
    image: string;
    name: string;
  };
  car: {
    id: string;
    year: number;
    model: string;
    manufacture: {
      name: string;
    };
  };
  tags: {
    tag: {
      id: string;
      name: string;
      color: string;
    };
  }[];
  reactions: {
    count: number;
    reacted: boolean;
  };
  createdAt: string;
  title: string;
  text: string;
  Rating?: {
    general: number;
    maintenance: number;
    drivability: number;
    comfort: number;
    consumption: number;
  };
};

const ReviewCard = ({
  user,
  car,
  createdAt,
  tags,
  title,
  text,
  Rating,
  reactions,
}: ReviewProps) => {
  const [reacted, setReacted] = useState(reactions.reacted);
  const numberFormatter = new Intl.NumberFormat("en", { notation: "compact" });

  const avg =
    Rating &&
    (Rating.comfort +
      Rating.consumption +
      Rating.drivability +
      Rating.general +
      Rating.maintenance) /
      5;

  return (
    <div className="min-h-[100px] w-full rounded-lg bg-layer p-4">
      <div className="flex items-center gap-close-relation">
        <img
          src={user.image}
          className="h-10 w-10 rounded-full object-cover"
          alt="foto do usuário"
        />
        <div className="flex flex-col">
          <span className="font-bold">{`${car.model} - ${car.year} - ${car.manufacture.name}`}</span>
          <span className="text-sm text-text-light">{user.name}</span>
        </div>
      </div>
      <p className="mt-2 text-sm font-light text-text-light">
        {dayjs(createdAt).format(" D [de] MMMM [de] YYYY")}
      </p>
      <HorizontalSeparator />
      {Rating ? (
        <div className="flex gap-close-relation text-text-light">
          Média de avaliação: <GenerateStars rating={avg!} size={16} />
        </div>
      ) : (
        <div className="flex gap-x-close-relation">
          {tags.map(({ tag }) => (
            <p
              key={tag.id}
              style={{ background: tag.color }}
              className="rounded-md px-1.5 py-0.5 text-sm text-white"
            >
              {tag.name}
            </p>
          ))}
        </div>
      )}

      <HorizontalSeparator />
      <p className="mb-close-relation font-bold">{title}</p>
      <p
        className="min-h-10 max-h-[100px] w-full overflow-hidden"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
        }}
      >
        {text}
      </p>
      <HorizontalSeparator />
      <div className="flex items-center gap-2 text-lg font-bold">
        <span className="cursor-pointer" onClick={() => setReacted(!reacted)}>
          {reacted ? (
            <TablerIcons.IconThumbUpFilled size={24} />
          ) : (
            <TablerIcons.IconThumbUp size={24} />
          )}
        </span>
        <span>{numberFormatter.format(reactions.count)}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
