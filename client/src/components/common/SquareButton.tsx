import { ButtonHTMLAttributes } from "react";

function SquareButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { children, ...rest } = props;
  return (
    <button className="flex items-center justify-center w-8 h-8 text-white bg-spy-gray p-3 rounded-lg" {...rest}>
      {children}
    </button>
  );
}

export default SquareButton;
