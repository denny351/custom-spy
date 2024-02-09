import { ChevronRight } from "react-feather";

interface Props {
  icon: string;
  label: string;
  infoText: string;
  onClick: () => void;
}

function GameOptionRow(props: Props) {
  return (
    <div
      className="flex items-center justify-between my-3.5 py-4 px-2.5 text-sm tracking-tight border-2 cursor-pointer"
      onClick={props.onClick}
    >
      <div className="flex items-center">
        <img src={props.icon} alt="Player icon" className="mr-2 h-8 w-8" />
        <span>{props.label}</span>
      </div>
      <div className="flex items-center -mr-1">
        <span>{props.infoText}</span>
        <ChevronRight color="#4b5563" size={26} />
      </div>
    </div>
  );
}

export default GameOptionRow;
