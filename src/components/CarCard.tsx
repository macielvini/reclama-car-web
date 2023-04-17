import * as TablerIcons from "@tabler/icons-react";
import { GenerateStarsFromNumber } from "../utils/GenerateStarsFromNumber";

type Rating = {
  name: string;
  stars: JSX.Element;
};

const starsTranslation = {
  maintenance: "Manutenção",
  drivability: "Direção",
  comfort: "Conforto",
  consumption: "Consumo",
  general: "Geral",
};

type Props = {
  id: string;
  image: string;
  year: number;
  model: string;
  fuelType: string;
  engineSize: string;
  rating: {
    general: number;
    maintenance: number;
    drivability: number;
    comfort: number;
    consumption: number;
  };
  manufacture: {
    id: string;
    name: string;
    image: string;
  };
};

const CarCard = ({
  image,
  model,
  engineSize,
  year,
  fuelType,
  rating,
  manufacture,
}: Props) => {
  const { Manufacture, _avg } = {
    Manufacture: {
      name: "GM - Chevrolet",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Chevrolet-logo.png/2560px-Chevrolet-logo.png",
    },
    _avg: {
      maintenance: "4700",
      drivability: "4230",
      comfort: "4199",
      consumption: "3250",
      general: "4000",
    },
  };
  type ObjectKey = keyof typeof _avg | keyof typeof starsTranslation;

  function starsAsRating(): Rating[] {
    let elements: Rating[] = [];

    for (const key in _avg) {
      const rating = parseFloat(_avg[key as ObjectKey]);
      const stars = GenerateStarsFromNumber(rating / 1000);

      elements.push({ name: key, stars: stars! });
    }

    return elements;
  }

  return (
    <div className="flex min-w-[224px] snap-center flex-col gap-close-relation overflow-hidden rounded-xl bg-layer object-contain shadow-sm">
      <img
        src={image}
        alt="foto do carro"
        className="h-[90px] w-full object-cover"
      />
      <div className="flex flex-col gap-close-relation px-4 pb-4">
        <section className="flex flex-col gap-super-relation">
          <p className="font-bold text-accent-green">
            {`${model} ${parseFloat(engineSize).toFixed(1)}
            ${fuelType} - ${year}`}
          </p>
          <span className="flex items-center gap-close-relation text-sm font-bold text-text-light">
            <img
              src={manufacture.image}
              alt={manufacture.name}
              className="h-[18px]"
            />
            {" - "}
            <p>{manufacture.name}</p>
          </span>
        </section>
        <section>
          {starsAsRating().map((item, index) => (
            <div
              className="grid grid-cols-2 gap-close-relation text-text-light"
              key={index + item.name}
            >
              <p>{starsTranslation[item.name as ObjectKey]}</p>
              <div className="flex gap-super-relation text-accent-yellow">
                {item.stars}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default CarCard;
