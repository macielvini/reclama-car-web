import { Car, CreateReview, Rating, Tag } from ".";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as TablerIcons from "@tabler/icons-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  getAllTags,
  getUserReviewByCarId,
} from "../../services/api/reviewsApi";
import { AxiosError } from "axios";
import StarRating from "./StarRating";

type Props = {
  rating: Rating | undefined;
  car: Car;
  review: CreateReview;
  tags: Tag[];
  setReview: Dispatch<SetStateAction<CreateReview>>;
  setRating: Dispatch<SetStateAction<Rating | undefined>>;
  setTags: Dispatch<SetStateAction<Tag[] | []>>;

  toggleState: Dispatch<SetStateAction<boolean>>;
};

const WriteReview = ({
  car,
  review,
  setReview,
  setRating,
  setTags,
  tags,
  rating,
}: Props) => {
  const [hasRating, setHasRating] = useState<boolean | undefined>(undefined);
  const [maintenance, setMaintenance] = useState(0);
  const [drivability, setDrivability] = useState(0);
  const [comfort, setComfort] = useState(0);
  const [consumption, setConsumption] = useState(0);
  const [general, setGeneral] = useState(0);
  const [fetchedTags, setFetchedTags] = useState<Tag[]>([]);

  async function fetchUserReviewByCarId() {
    try {
      const res = await getUserReviewByCarId(car.model.id);
      setHasRating(res.Rating !== null);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 404) {
        setHasRating(false);
      }
    }
  }

  async function fetchTags() {
    try {
      const res = await getAllTags();
      setFetchedTags(res);
      // console.log(res);
    } catch (err) {
      const error = err as AxiosError;
    }
  }

  function toggleTags(tag: Tag) {
    let isSelected = tags.includes(tag);
    if (isSelected) {
      return setTags(tags.filter((t) => t.id !== tag.id));
    }
    setTags([...tags, tag]);
  }

  useEffect(() => {
    fetchUserReviewByCarId();
  }, []);

  useEffect(() => {
    fetchTags();
  }, [hasRating]);

  useEffect(() => {
    if (
      maintenance > 0 &&
      drivability > 0 &&
      comfort > 0 &&
      consumption > 0 &&
      general > 0
    ) {
      setRating({ maintenance, drivability, comfort, consumption, general });
    }
  }, [maintenance, drivability, comfort, consumption, general]);

  return (
    <>
      <div className="flex items-center gap-relation border-b-1 pb-no-relation">
        <img
          src={car.model.image}
          alt={car.model.model}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div className="flex flex-col text-base font-bold text-text-dark">
          <span>{`${car.model.model} ${car.model.engineSize} ${car.model.fuelType} - ${car.year.year}`}</span>
          <span>{car.manufacture.name}</span>
        </div>
      </div>
      <div className="mt-no-relation flex flex-col gap-relation">
        <input
          type="text"
          placeholder="Insira um titulo"
          className="text-title font-bold text-text-dark outline-none placeholder:text-text-light"
          value={review.title}
          onChange={(e) => setReview({ ...review, title: e.target.value })}
        />
        <textarea
          placeholder="Escreva aqui..."
          className="h-full min-h-[150px] w-full text-lg text-text-dark outline-none placeholder:text-text-light"
          value={review.review}
          onChange={(e) => setReview({ ...review, review: e.target.value })}
        />
      </div>
      {!hasRating && (
        <div className="flex flex-col gap-no-relation">
          <p className="text-title font-bold text-text-dark">
            Como você avalia esse carro?
          </p>
          <div className="flex flex-col gap-normal-relation">
            <div className="grid max-w-sm grid-cols-2 gap-close-relation text-text-light">
              <p className="text-subtitle text-text-dark">Manutenção</p>
              <StarRating rating={maintenance} setState={setMaintenance} />
            </div>
            <div className="grid max-w-sm grid-cols-2 gap-close-relation text-text-light">
              <p className="text-subtitle text-text-dark">Direção</p>
              <StarRating rating={drivability} setState={setDrivability} />
            </div>
            <div className="grid max-w-sm grid-cols-2 gap-close-relation text-text-light">
              <p className="text-subtitle text-text-dark">Conforto</p>
              <StarRating rating={comfort} setState={setComfort} />
            </div>
            <div className="grid max-w-sm grid-cols-2 gap-close-relation text-text-light">
              <p className="text-subtitle text-text-dark">Consumo</p>
              <StarRating rating={consumption} setState={setConsumption} />
            </div>
            <div className="grid max-w-sm grid-cols-2 gap-close-relation text-text-light">
              <p className="text-subtitle text-text-dark">Geral</p>
              <StarRating rating={general} setState={setGeneral} />
            </div>
          </div>
        </div>
      )}
      {fetchedTags.length > 0 && hasRating && (
        <div>
          <p className="mb-no-relation text-title font-bold">
            Selecione uma ou mais categorias:
          </p>
          <div className="flex flex-wrap items-start gap-relation">
            {fetchedTags.map((tag) => (
              <Checkbox.Root
                key={tag.id}
                checked={tags.includes(tag)}
                className={`flex items-center gap-close-relation rounded-md p-2 text-xs font-bold uppercase text-white drop-shadow-md transition-all`}
                onCheckedChange={() => toggleTags(tag)}
                style={{ background: tag.color }}
              >
                <div>
                  {tags.includes(tag) ? (
                    <Checkbox.Indicator>
                      <TablerIcons.IconSquareRoundedCheckFilled />
                    </Checkbox.Indicator>
                  ) : (
                    <TablerIcons.IconSquareRounded />
                  )}
                </div>
                <p key={tag.id}>{tag.name}</p>
              </Checkbox.Root>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default WriteReview;
