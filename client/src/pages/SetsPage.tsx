import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "react-feather";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../components/common/Layout";
import ActionButton from "../components/common/ActionButton";
import SetRow from "../components/SetsPage/SetRow";
import { setSelectedSet } from "../store/game/gameSlice";
import { RootState } from "../store/store";
import { SelectedSet } from "../interfaces/Set";

function SetsPage() {
  const [setsType, setSetsType] = useState<"premade" | "custom">("premade");
  const { premadeSets, customSets } = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRowClick = (selectedSet: SelectedSet) => {
    dispatch(setSelectedSet(selectedSet));
    navigate("/");
  };

  return (
    <Layout>
      <Link to="/" className="flex items-center absolute top-6">
        <ChevronLeft />
        Back
      </Link>

      <div className="flex flex-col items-center">
        <h2 className="text-xl my-6">Sets</h2>

        <div className="flex mb-6">
          <ActionButton
            onClick={() => setSetsType("premade")}
            className={`mr-2.5 my-0 text-sm w-40 ${setsType === "premade" && "bg-spy-gray"}`}
          >
            Premade
          </ActionButton>

          <ActionButton
            onClick={() => setSetsType("custom")}
            className={`my-0 text-sm w-40 ${setsType === "custom" && "bg-spy-gray"}`}
          >
            Custom
          </ActionButton>
        </div>

        {setsType === "premade" &&
          premadeSets.map((set) => (
            <SetRow
              key={set.id}
              name={set.name}
              cardsQuantity={set.locations.length}
              onClick={() => handleRowClick({ type: "premade", id: set.id })}
            />
          ))}
        {setsType === "custom" &&
          customSets.map((set) => (
            <SetRow
              key={set.id}
              name={set.name}
              cardsQuantity={set.locations.length}
              onClick={() => handleRowClick({ type: "custom", id: set.id })}
            />
          ))}
      </div>
    </Layout>
  );
}

export default SetsPage;
