import { Link } from "react-router-dom";

const WriteReviewButton = () => {
  return (
    <Link to={"/reviews/new"}>
      <div className="w-full gap-1 rounded-md border-1 border-accent-green p-5 text-text-light">
        <span className="inline-block h-4 w-[3px] animate-blink bg-text-dark" />
        <span className="">Escrever uma avaliação...</span>
      </div>
    </Link>
  );
};

export default WriteReviewButton;
