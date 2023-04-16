import CarCard from "../../components/CarCard";
import Container from "../../components/Container";
import Header from "../../components/Header";
import WriteReviewButton from "../../components/WriteReviewButton";
import { useAuth } from "../../hooks/useAuth";
import OutlineSquareButton from "./OutlineSquareButton";
import * as TablerIcons from "@tabler/icons-react";

const Home = () => {
  const { credentials } = useAuth();
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
            <OutlineSquareButton path="/" icon={<TablerIcons.IconMessage />}>
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
      <span className="fixed bottom-body-padding right-body-padding rounded-full bg-accent-green p-relation shadow-md">
        <TablerIcons.IconMessage2Plus color="white" size={32} />
      </span>
    </Container>
  );
};

export default Home;
