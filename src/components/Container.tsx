import { PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
  children?: JSX.Element | JSX.Element[] | ReactNode | string;
}

const Container = ({ children }: Props) => {
  return (
    <div className="flex flex-col gap-no-relation bg-background px-body-padding pt-header-padding leading-tight text-text-dark antialiased">
      {children}
    </div>
  );
};

export default Container;
