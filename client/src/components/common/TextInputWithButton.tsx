import TextInput from "./TextInput";
import { InputHTMLAttributes, ReactNode } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onButtonClick: () => void;
  buttonIcon: ReactNode;
}

export default function TextInputWithButton(props: Props) {
  const { onButtonClick, buttonIcon, ...rest } = props;

  return (
    <div className="relative w-full">
      <TextInput {...rest} />
      <span className="absolute right-2.5 top-5 z-10" onClick={onButtonClick}>
        {buttonIcon}
      </span>
    </div>
  );
}
