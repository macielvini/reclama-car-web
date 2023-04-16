import * as TablerIcons from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

type Props = {
  ready: boolean;
  final?: boolean;
  onClickHandler: () => void;
};

const ReviewHeader = ({ ready, final, onClickHandler }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="mb-no-relation flex w-full items-center justify-between">
      <TablerIcons.IconArrowLeft onClick={() => navigate(-1)} className="" />
      <button
        disabled={!ready}
        className={clsx(
          "select-none rounded-md px-4 py-2 text-sm font-bold text-gray-400 hover:brightness-95 active:bg-accent-blue active:text-white disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-300",
          {
            "bg-accent-blue text-white": ready,
          }
        )}
        onClick={onClickHandler}
      >
        {final ? "ENVIAR" : "PRÓXIMO"}
      </button>
    </div>
  );
};

export default ReviewHeader;
