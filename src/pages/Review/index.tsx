import { useEffect, useState } from "react";
import ChooseCar from "./ChooseCar";
import WriteReview from "./WriteReview";
import ReviewHeader from "./ReviewHeader";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { postReview } from "../../services/api/reviewsApi";
import { toast } from "react-toastify";

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

export type Rating = {
  maintenance: number;
  drivability: number;
  comfort: number;
  consumption: number;
  general: number;
};

export type Tag = {
  id: string;
  color: string;
  name: string;
};

const Review = () => {
  const navigate = useNavigate();

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
  const [rating, setRating] = useState<Rating | undefined>(undefined);
  const [tags, setTags] = useState<Tag[]>([]);

  function toggleReview() {
    setSelectCarPage(false);
    setShowReviewPage(true);
  }

  async function fetchReview() {
    try {
      await postReview({
        carId: car.model.id,
        text: review.review,
        title: review.title,
        rating,
        tags: tags.map((tag) => tag.id),
      });

      toast.success("Avaliação criada com sucesso!", {
        onClose: () => navigate("/"),
      });
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response);
    }
  }

  const { credentials } = useAuth();
  useEffect(() => {
    if (!credentials) navigate("/sign-in");
  }, []);

  return (
    <div className="flex flex-col gap-no-relation bg-background px-body-padding pb-14 pt-10 leading-tight text-text-dark antialiased">
      {showSelectCarPage && (
        <div>
          <ReviewHeader
            onClickHandler={toggleReview}
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
            ready={
              review.review && review.title && (rating || tags.length > 0)
                ? true
                : false
            }
            final={true}
            onClickHandler={fetchReview}
          />
          <WriteReview
            setRating={setRating}
            setReview={setReview}
            review={review}
            rating={rating}
            car={car}
            tags={tags}
            setTags={setTags}
            toggleState={setShowReviewPage}
          />
        </div>
      )}
    </div>
  );
};

export default Review;
