import { useEffect, useState } from "react";
import { Trash2 } from "react-feather";
import Modal from "../common/Modal";
import ActionButton from "../common/ActionButton";
import { EditableLocation, Set } from "../../interfaces/Set";
import TextInputWithButton from "../common/TextInputWithButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { updateLocations } from "../../store/set/setsSlice";

interface Props {
  set: Set | null;
  isOpen: boolean;
  onClose: () => void;
}

function EditSetModal(props: Props) {
  const [editableLocations, setEditableLocations] = useState<EditableLocation[]>([{ id: null, name: "" }]);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!props.set?.locations) {
      return;
    }
    const editableLocations: EditableLocation[] = props.set?.locations.map((location) => ({
      id: location.id,
      name: location.name,
    }));
    editableLocations.push({ id: null, name: "" });

    setEditableLocations(editableLocations);
  }, [props.isOpen, props.set?.locations]);

  const handleClose = () => {
    setEditableLocations([{ id: null, name: "" }]);
    props.onClose();
  };

  const handleInputChange = (index: number, value: string) => {
    setEditableLocations((prevLocations) => {
      const newLocations = [...prevLocations];
      newLocations[index].name = value;
      if (index === prevLocations.length - 1) {
        // Add a new input if the last item is being modified
        return [...newLocations, { id: null, name: "" }];
      }
      if (index === prevLocations.length - 2 && value === "") {
        // Remove input if the 2nd last item is empty
        newLocations.pop();
      }
      return newLocations;
    });
  };

  const removeLocation = (indexToRemove: number) => {
    if (indexToRemove !== editableLocations.length - 1) {
      setEditableLocations(editableLocations.filter((_, index) => index !== indexToRemove));
    }
  };

  const handleSave = () => {
    if (!props.set) {
      return;
    }
    editableLocations.pop();
    dispatch(updateLocations({ setId: props.set.id, locations: editableLocations }));
    handleClose();
  };

  return (
    <Modal isOpen={props.isOpen} onRequestClose={handleClose} contentLabel="Edit Set Modal">
      <div className="flex flex-col items-center">
        <h2 className="mb-4">Locations</h2>

        {editableLocations.map((location, index) => (
          <TextInputWithButton
            key={index}
            placeholder={`Enter location`}
            value={location.name}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onButtonClick={() => removeLocation(index)}
            buttonIcon={<Trash2 color="gray" size={18} />}
          />
        ))}

        <ActionButton onClick={handleSave}>Save</ActionButton>
      </div>
    </Modal>
  );
}

export default EditSetModal;
