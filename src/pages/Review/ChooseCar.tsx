import { Dispatch, SetStateAction, useState } from "react";
import { AxiosError } from "axios";
import DropDownInput from "./DropDownInput";
import { Car, Manufacture, Model, Year } from ".";
import { getAllManufactures } from "../../services/api/manufacturesApi";
import {
  getCarsByManufactureIdAndYear,
  getCarsYearsByManufactureId,
} from "../../services/api/carsApi";

interface Props {
  car: Car;
  manufacture: string;
  setCar: Dispatch<SetStateAction<Car>>;
}

const ChooseCar = ({ setCar, car }: Props) => {
  const [manufactures, setManufactures] = useState<Manufacture[]>([]);
  const [years, setYears] = useState<Year[]>([]);
  const [models, setModels] = useState<Model[]>([]);

  async function fetchManufactures() {
    try {
      const res = await getAllManufactures();
      setManufactures(res);
      setCar({
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
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchYears() {
    try {
      const res = await getCarsYearsByManufactureId(car.manufacture.id);
      setYears(res);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response!.data as AxiosError);
    }
  }

  async function fetchModels() {
    try {
      const res = await getCarsByManufactureIdAndYear(
        car.manufacture.id,
        car.year.year
      );
      setModels(res);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response!.data as AxiosError);
    }
  }

  return (
    <>
      <div className="flex flex-col">
        <p className="mb-no-relation text-title font-bold">Escolha um carro:</p>
        <div className="flex flex-col gap-no-relation">
          <DropDownInput
            items={manufactures}
            placeholder="Escolha um fabricante"
            chosen={car!.manufacture.name}
            setState={(value: Manufacture) =>
              setCar({ ...car, manufacture: value })
            }
            fetcher={fetchManufactures}
          />
          <DropDownInput
            items={years}
            placeholder="Escolha um ano"
            chosen={car!.year.year}
            setState={(value: Year) => setCar({ ...car, year: value })}
            fetcher={fetchYears}
          />
          <DropDownInput
            items={models}
            placeholder="Escolha um modelo"
            chosen={car!.model.model}
            setState={(value: Model) => setCar({ ...car, model: value })}
            fetcher={fetchModels}
          />
          <div className="flex justify-center">
            {car.model.image && (
              <img
                src={car.model.image}
                alt={car.model.model}
                className="aspect-auto w-full max-w-[500px] rounded-md shadow-md"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseCar;
