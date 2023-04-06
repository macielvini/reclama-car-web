import CarCard from "../../components/CarCard";
import Container from "../../components/Container";
import Header from "../../components/Header";
import OutlineSquareButton from "./OutlineSquareButton";
import * as TablerIcons from "@tabler/icons-react";

const Home = () => {
  return (
    <Container>
      <Header />
      <section className="flex flex-col gap-close-relation text-center">
        <p className="text-title font-bold">
          O Reclama Car te aproxima de quem vive o carro!
        </p>
        <p className="text-sm ">
          Compartilhe suas experiências e avaliações para ajudar outros
          usuários. Ajude-nos a tornar mais transparente o processo de escolha
          de um carro
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
      <section className="flex flex-col gap-relation">
        <p className="text-subtitle font-bold">Carros mais avaliados:</p>
        <div className="flex touch-pan-x snap-x gap-relation overflow-x-auto scroll-smooth">
          <CarCard />
          <CarCard />
          <CarCard />
        </div>
      </section>
    </Container>
  );
};

export default Home;
