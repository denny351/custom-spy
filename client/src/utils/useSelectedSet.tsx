import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function useSelectedSet() {
  const {
    sets: { premadeSets, customSets },
    game: { selectedSet },
  } = useSelector((state: RootState) => state);

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
