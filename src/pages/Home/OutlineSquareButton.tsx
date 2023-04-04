import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
type Props = PropsWithChildren & {
  path: string;
  icon: JSX.Element;
};

const OutlineSquareButton = ({ icon, path, children }: Props) => {
  return (
    <Link to={path}>
      <button className="flex w-[152px] flex-col items-center justify-center gap-close-relation rounded-xl border border-accent-green p-4 text-accent-green hover:bg-accent-green hover:text-white active:bg-accent-green active:text-white active:brightness-90">
        {icon}
        <p className="">{children}</p>
      </button>
    </Link>
  );
};

export default OutlineSquareButton;
