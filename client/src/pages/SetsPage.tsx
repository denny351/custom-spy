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
import ViewSetModal from "../components/SetsPage/ViewSetModal";
import { Set } from "../interfaces/Set";

function SetsPage() {
  const { premadeSets, customSets } = useSelector((state: RootState) => state.game);
  const [setsType, setSetsType] = useState<"premade" | "custom">("premade");
  const [isViewSetModalOpen, setIsViewSetModalOpen] = useState(false);
  const [selectedSetForModal, setSelectedSetForModal] = useState<Set | null>(premadeSets[0]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRowClick = (selectedSet: SelectedSet) => {
    dispatch(setSelectedSet(selectedSet));
    navigate("/");
  };

  const handleViewClick = (id: number) => {
    const selected = premadeSets.find((set) => set.id === id)!;
    setSelectedSetForModal(selected);
    setIsViewSetModalOpen(true);
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
              onRowClick={() => handleRowClick({ type: "premade", id: set.id })}
              onViewClick={() => handleViewClick(set.id)}
            />
          ))}
        {setsType === "custom" &&
          customSets.map((set) => (
            <SetRow
              key={set.id}
              name={set.name}
              cardsQuantity={set.locations.length}
              onRowClick={() => handleRowClick({ type: "custom", id: set.id })}
              onViewClick={() => handleViewClick(set.id)}
            />
          ))}

        <ViewSetModal
          isOpen={isViewSetModalOpen}
          onClose={() => setIsViewSetModalOpen(false)}
          set={selectedSetForModal}
        />
      </div>
    </Layout>
  );
}

export default SetsPage;
