import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  return (
    <div className="container h-screen mx-auto max-w-2xl p-4 border-2 flex flex-col justify-between">
      {props.children}
    </div>
  );
}
