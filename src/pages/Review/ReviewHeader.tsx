import * as TablerIcons from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

type Props = {
  ready: boolean;
  final?: boolean;
  toggleState: () => void;
  submitHandler?: () => void;
};

const ReviewHeader = ({ toggleState, ready, final, submitHandler }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="mb-no-relation flex w-full items-center justify-between">
      <TablerIcons.IconArrowLeft onClick={() => navigate(-1)} className="" />
      <button
        className={clsx(
          "rounded-md bg-gray-300 px-4 py-2 text-sm font-bold text-gray-400 active:bg-accent-blue active:text-white",
          {
            "bg-accent-blue text-white": ready,
          }
        )}
        onClick={final ? () => submitHandler!() : () => toggleState()}
      >
        {final ? "ENVIAR" : "PRÓXIMO"}
      </button>
    </div>
  );
};

export default ReviewHeader;
