import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function useSelectedSet() {
  const { selectedSet } = useSelector((state: RootState) => state.game);
  const { premadeSets, customSets } = useSelector((state: RootState) => state.sets);

  const selectedSetObj = (() => {
    const setList = selectedSet.type === "premade" ? premadeSets : customSets;
    return setList.find((set) => set.id === selectedSet.id)!;
  })();

  return {
    selectedSetName: selectedSetObj.name,
    selectedSetId: selectedSetObj.id,
    selectedSetLocations: selectedSetObj.locations,
  };
}

export default useSelectedSet;
