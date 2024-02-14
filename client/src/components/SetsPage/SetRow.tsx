import { Eye } from "react-feather";

interface Props {
  name: string;
  cardsQuantity: number;
  onRowClick: () => void;
  onViewClick: () => void;
}

function SetRow(props: Props) {
  const handleViewSet = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    props.onViewClick();
  };

  return (
    <div className="flex items-center justify-between w-full my-2 p-2 border-2 clickable" onClick={props.onRowClick}>
      <h3>{props.name}</h3>
      <div className="flex items-center pl-4" onClick={handleViewSet}>
        <p className="mr-1 text-gray-400 text-xs">{props.cardsQuantity} cards</p>
        <Eye color="gray" size={18} />
      </div>
    </div>
  );
}

export default SetRow;
