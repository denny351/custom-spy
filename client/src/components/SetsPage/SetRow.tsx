import { ReactNode } from "react";

interface Props {
  name: string;
  cardsQuantity: number;
  icon: ReactNode;
  onRowClick: () => void;
  onIconClick: () => void;
}

function SetRow(props: Props) {
  const handleViewSet = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    props.onIconClick();
  };

  return (
    <div className="flex items-center justify-between w-full my-2 p-2 border-2 clickable" onClick={props.onRowClick}>
      <h3>{props.name}</h3>
      <div className="flex items-center pl-4" onClick={handleViewSet}>
        <p className="mr-1 text-gray-400 text-xs">{props.cardsQuantity} cards</p>
        {props.icon}
      </div>
    </div>
  );
}

export default SetRow;
