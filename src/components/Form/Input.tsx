import { Dispatch, FC, InputHTMLAttributes, SetStateAction } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  setState: Dispatch<SetStateAction<string>>;
  value: string;
  error?: string | null | undefined;
}

const Input: FC<Props> = ({ setState, error = undefined, ...rest }) => {
  return (
    <div className="flex w-full flex-col">
      <input
        className="h-12 rounded-md border-1 border-text-dark pl-4"
        maxLength={100}
        onChange={(e) => setState(e.target.value)}
        {...rest}
      />
      {error && <p className="mt-2 text-sm text-red-900">{error}</p>}
    </div>
  );
};

export default Input;
