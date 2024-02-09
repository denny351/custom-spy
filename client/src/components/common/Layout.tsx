import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  return <div className="container mx-auto	max-w-2xl p-4 border-2">{props.children}</div>;
}
