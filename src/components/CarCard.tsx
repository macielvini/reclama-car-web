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

const CarCard = () => {
  const { image, model, engine_size, year, fuel_type, Manufacture, _avg } = {
    image:
      "https://s2.glbimg.com/IYSuJ9WtejYJttUUgbuYv0ygT08=/0x0:940x628/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/m/D/dAnnjJR4attGD3dcdUzg/2013-04-15-1.jpg",
    model: "Celta",
    engine_size: "1000",
    year: "2012",
    fuel_type: "FLEX",
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
            {`${model} ${(parseFloat(engine_size) / 1000).toFixed(
              1
            )} ${fuel_type} - ${year}`}
          </p>
          <span className="flex items-center gap-close-relation text-sm font-bold text-text-light">
            <img
              src={Manufacture.image}
              alt={Manufacture.name}
              className="h-[18px]"
            />
            <p>{Manufacture.name}</p>
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
