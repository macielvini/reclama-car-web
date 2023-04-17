import { AxiosError } from "axios";
import CarCard from "../../components/CarCard";
import Container from "../../components/Container";
import Header from "../../components/Header";
import TopManufactureCard from "../../components/TopManufactureCard";
import WriteReviewButton from "../../components/WriteReviewButton";
import { useAuth } from "../../hooks/useAuth";
import OutlineSquareButton from "./OutlineSquareButton";
import * as TablerIcons from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { getTopRatedManufactures } from "../../services/api/manufacturesApi";
import { toast } from "react-toastify";
import { getTopRatedCars } from "../../services/api/carsApi";

type TopRatedManufacture = {
  id: string;
  image: string;
  name: string;
  averageRating: number;
};

type Car = {
  id: string;
  image: string;
  year: number;
  model: string;
  manufacture: {
    id: string;
    name: string;
    image: string;
  };
  fuelType: string;
  engineSize: string;
  rating: {
    general: number;
    maintenance: number;
    drivability: number;
    comfort: number;
    consumption: number;
  };
};

const Home = () => {
  const { credentials } = useAuth();
  const [manufactures, setManufactures] = useState<TopRatedManufacture[]>([]);
  const [cars, setCars] = useState<Car[]>([]);

  async function fetchTopRatedManufactures() {
    try {
      const res = (await getTopRatedManufactures()) as TopRatedManufacture[];
      setManufactures(res.sort((a, b) => b.averageRating - a.averageRating));
    } catch (err) {
      toast.error("Erro inesperado");
      const error = err as AxiosError;
      console.log(error.response!.data as AxiosError);
    }
  }

  async function fetchTopRatedCars() {
    try {
      const res = (await getTopRatedCars()) as Car[];
      const avg = ({ rating, ...rest }: Car) => ({
        ...rest,
        avg:
          (rating.comfort +
            rating.consumption +
            rating.drivability +
            rating.general +
            rating.maintenance) /
          5,
      });

      console.log(res);
      setCars(res.sort((a, b) => avg(b).avg - avg(a).avg));
    } catch (err) {
      toast.error("Erro inesperado");
      const error = err as AxiosError;
      console.log(error.response!.data as AxiosError);
    }
  }

  useEffect(() => {
    fetchTopRatedManufactures();
    fetchTopRatedCars();
  }, []);

  return (
    <Container>
      <Header />
      {!credentials && (
        <>
          <section className="flex flex-col gap-close-relation text-center">
            <p className="text-title font-bold">
              O Reclama Car te aproxima de quem vive o carro!
            </p>
            <p className="text-sm ">
              Compartilhe suas experiências e avaliações para ajudar outros
              usuários. Ajude-nos a tornar mais transparente o processo de
              escolha de um carro
            </p>
          </section>
          <section className="flex justify-center gap-5">
            <OutlineSquareButton path="/" icon={<TablerIcons.IconSearch />}>
              Pesquisar carro ou fabricante
            </OutlineSquareButton>
            <OutlineSquareButton
              path="/reviews/new"
              icon={<TablerIcons.IconMessage />}
            >
              Deixar uma avaliação
            </OutlineSquareButton>
          </section>
        </>
      )}
      {credentials && <WriteReviewButton />}
      <section className="flex flex-col gap-relation">
        <p className="text-subtitle font-bold">Carros mais avaliados:</p>
        <div className="flex touch-pan-x snap-x gap-relation overflow-x-auto scroll-smooth">
          {cars
            ? cars.map((car) => (
                <CarCard
                  key={car.id}
                  engineSize={car.engineSize}
                  fuelType={car.fuelType}
                  id={car.id}
                  image={car.image}
                  manufacture={car.manufacture}
                  model={car.model}
                  rating={car.rating}
                  year={car.year}
                />
              ))
            : "Carregando..."}
        </div>
      </section>
      <section className="flex flex-col gap-relation">
        <p className="text-subtitle font-bold">Top 5 Marcas:</p>
        <div className="flex touch-pan-x snap-x gap-relation overflow-x-auto scroll-smooth">
          {manufactures.map((m, i) => (
            <TopManufactureCard
              position={i + 1}
              image={m.image}
              name={m.name}
              rating={m.averageRating}
              key={m.id}
            />
          ))}
        </div>
      </section>
      {credentials && (
        <span className="fixed bottom-body-padding right-body-padding rounded-full bg-accent-green p-relation shadow-md">
          <TablerIcons.IconMessage2Plus color="white" size={32} />
        </span>
      )}
    </Container>
  );
};

export default Home;
