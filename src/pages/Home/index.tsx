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

type TopRatedManufacture = {
  image: string;
  name: string;
  averageRating: number;
};

const Home = () => {
  const { credentials } = useAuth();
  const [manufactures, setManufactures] = useState<TopRatedManufacture[]>([]);

  async function fetchTopRatedManufactures() {
    try {
      const res = (await getTopRatedManufactures()) as TopRatedManufacture[];
      console.log(res);
      setManufactures(res.sort((a, b) => b.averageRating - a.averageRating));
    } catch (err) {
      toast.error("Erro inesperado");
      const error = err as AxiosError;
      console.log(error.response!.data as AxiosError);
    }
  }

  useEffect(() => {
    fetchTopRatedManufactures();
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
          <CarCard />
          <CarCard />
          <CarCard />
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
