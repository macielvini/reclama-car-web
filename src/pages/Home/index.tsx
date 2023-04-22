import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import * as TablerIcons from "@tabler/icons-react";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import CarCard from "../../components/CarCard";
import Header from "../../components/Header";
import TopManufactureCard from "../../components/TopManufactureCard";
import WriteReviewButton from "../../components/WriteReviewButton";
import OutlineSquareButton from "./OutlineSquareButton";
import { useEffect, useState } from "react";
import { getTopRatedManufactures } from "../../services/api/manufacturesApi";
import { getTopRatedCars } from "../../services/api/carsApi";
import HorizontalSeparator from "../../components/HorizontalSeparator";
import Review from "../Review";
import ReviewCard, { ReviewProps } from "../../components/ReviewCard";
import { getTrendingReviews } from "../../services/api/reviewsApi";

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
  const [trendingReviews, setTrendingReviews] = useState<ReviewProps[]>([]);

  const numberFormatter = new Intl.NumberFormat("en", { notation: "compact" });

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

      setCars(res.sort((a, b) => avg(b).avg - avg(a).avg));
    } catch (err) {
      toast.error("Erro inesperado");
      const error = err as AxiosError;
      console.log(error.response!.data as AxiosError);
    }
  }

  async function fetchTrendingReviews() {
    try {
      const res = await getTrendingReviews();
      setTrendingReviews(res);
    } catch (err) {
      toast.error("Erro inesperado");
      const error = err as AxiosError;
      console.log(error.response!.data as AxiosError);
    }
  }

  useEffect(() => {
    fetchTopRatedManufactures();
    fetchTopRatedCars();
    fetchTrendingReviews();
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col gap-no-relation bg-background px-body-padding pb-14 pt-header-padding leading-tight text-text-dark antialiased">
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
          <div className="flex touch-pan-x snap-x gap-relation overflow-x-scroll scroll-smooth pb-6 pl-2">
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
          <div className="flex touch-pan-x snap-x gap-relation overflow-x-auto scroll-smooth pb-6 pl-2">
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
        <section className="m-auto flex w-full max-w-[500px] flex-col items-center">
          <p className="mb-relation w-full text-subtitle font-bold md:text-center">
            Avaliações mais relevantes:
          </p>
          <div className="flex w-full flex-col items-center gap-6">
            {trendingReviews.length > 0
              ? trendingReviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    car={review.car}
                    createdAt={review.createdAt}
                    id={review.id}
                    tags={review.tags}
                    reactions={review.reactions}
                    text={review.text}
                    title={review.title}
                    user={review.user}
                    Rating={review.Rating}
                  />
                ))
              : "Carregando..."}
          </div>
        </section>
        {credentials && (
          <Link to={"/reviews/new"}>
            <span className="fixed bottom-body-padding right-body-padding rounded-full bg-accent-green p-relation shadow-md">
              <TablerIcons.IconMessage2Plus color="white" size={32} />
            </span>
          </Link>
        )}
      </div>
    </>
  );
};

export default Home;
