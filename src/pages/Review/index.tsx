import { useState } from "react";
import ChooseCar from "./ChooseCar";
import WriteReview from "./WriteReview";
import ReviewHeader from "./ReviewHeader";

export type Car = {
  year: Year;
  model: Model;
  manufacture: Manufacture;
};

export type Manufacture = {
  id: string;
  image: string;
  name: string;
};

export type Year = {
  id: string;
  year: number;
};

export type Model = {
  id: string;
  engineSize: string;
  fuelType: string;
  image: string;
  year: number;
  model: string;
};

export type CreateReview = {
  title: string;
  review: string;
};

export type CreateReviewPages = {
  car: boolean;
  review: boolean;
  tags: boolean;
  rating: boolean;
};

const Review = () => {
  const [showSelectCarPage, setSelectCarPage] = useState(true);
  const [showReviewPage, setShowReviewPage] = useState(false);

  const [car, setCar] = useState<Car>({
    manufacture: { id: "", image: "", name: "" },
    model: {
      engineSize: "",
      fuelType: "",
      id: "",
      image: "",
      year: 0,
      model: "",
    },
    year: { id: "", year: 0 },
  });
  const [review, setReview] = useState<CreateReview>({ review: "", title: "" });

  function toggleReview() {
    setSelectCarPage(false);
    setShowReviewPage(true);
  }

  return (
    <div className="flex flex-col gap-no-relation bg-background px-body-padding pb-14 pt-10 leading-tight text-text-dark antialiased">
      {showSelectCarPage && (
        <div>
          <ReviewHeader
            toggleState={toggleReview}
            ready={
              car.model.id && car.manufacture.id && car.year.year ? true : false
            }
          />
          <ChooseCar manufacture={"GM"} setCar={setCar} car={car} />
        </div>
      )}
      {showReviewPage && (
        <div>
          <ReviewHeader
            toggleState={toggleReview}
            ready={review.review && review.title ? true : false}
          />
          <WriteReview
            setState={setReview}
            review={review}
            car={car}
            toggleState={setShowReviewPage}
          />
        </div>
      )}
    </div>
  );
};

export default Review;
