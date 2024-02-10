import { Eye } from "react-feather";

interface Props {
  name: string;
  cardsQuantity: number;
}

function SetRow(props: Props) {
  return (
    <div className="flex items-center justify-between w-full my-2 p-2 border-2">
      <p>{props.name}</p>
      <div className="flex items-center">
        <p className="mr-1 text-gray-400 text-xs">{props.cardsQuantity} cards</p>
        <Eye color="gray" size={18} />
      </div>
    </div>
  );
}

export default SetRow;
