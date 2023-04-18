import GenerateStars from "./GenerateStars";

const ratingItemsTranslation = {
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
  type ObjectKey = keyof typeof rating | keyof typeof ratingItemsTranslation;

  return (
    <div className="flex min-w-[224px] snap-center flex-col gap-close-relation overflow-hidden rounded-xl bg-white object-contain drop-shadow-md">
      <img
        src={image}
        alt="foto do carro"
        className="h-[90px] w-full object-cover"
      />
      <div className="flex flex-col gap-close-relation px-4 pb-4">
        <section className="flex flex-col gap-super-relation">
          <p className="font-bold text-accent-green">
            {`${model} ${parseFloat(engineSize).toFixed(1)}`}
            <br />
            {`${fuelType} - ${year}`}
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
          {Object.values(rating).map((value, index) => {
            const name: any = Object.keys(rating)[index];
            return (
              <div
                className="grid grid-cols-2 gap-close-relation text-text-light"
                key={index + name}
              >
                <p>{ratingItemsTranslation[name as ObjectKey]}</p>
                <GenerateStars rating={value} size={16} />
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default CarCard;
