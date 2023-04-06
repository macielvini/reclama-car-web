import { FC, FormEventHandler, FormHTMLAttributes } from "react";
import { Link } from "react-router-dom";

type Props = {
  children: JSX.Element | JSX.Element[];
  title?: string;
  button: string;
  onSubmit: FormEventHandler;
  redirect?: { text: string; path: string };
  imagePath?: string;
};

const SignForm: FC<Props> = ({
  title,
  children,
  button,
  redirect,
  imagePath,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="m-auto flex w-full max-w-lg flex-col items-center rounded-md p-4 px-6"
    >
      {imagePath && (
        <img src={imagePath} alt="ilustração" className="h-[200px]" />
      )}
      <p className="mb-relation w-full text-left text-xl font-bold ">{title}</p>
      <div className="flex w-full flex-col gap-relation">{children}</div>

      <button
        type="submit"
        className="mt-10 w-full rounded-md bg-accent-green p-4 text-center text-base font-bold text-background hover:brightness-90 hover:transition-all"
      >
        {button}
      </button>
      {redirect && (
        <Link
          to={redirect.path}
          className="mt-5 w-full text-left text-base text-blue-700 underline underline-offset-4"
        >
          {redirect.text}
        </Link>
      )}
    </form>
  );
};

export default SignForm;
