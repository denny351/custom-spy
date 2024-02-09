import { InputHTMLAttributes } from "react";

export default function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="text"
      className="w-full my-2 py-3 px-2.5 text-white bg-spy-gray outline-none font-mono text-sm rounded-lg"
      {...props}
    />
  );
}
