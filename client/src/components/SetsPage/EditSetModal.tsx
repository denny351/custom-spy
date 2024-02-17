import { useEffect, useState } from "react";
import { Trash2 } from "react-feather";
import Modal from "../common/Modal";
import ActionButton from "../common/ActionButton";
import { Set } from "../../interfaces/Set";
import TextInputWithButton from "../common/TextInputWithButton";

interface Props {
  set: Set | null;
  isOpen: boolean;
  onClose: () => void;
}

interface EditableLocation {
  id: number | null;
  name: string;
}

function EditSetModal(props: Props) {
  const [editableLocations, setEditableLocations] = useState<EditableLocation[]>([{ id: null, name: "" }]);

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
  }, []);

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
    setEditableLocations(editableLocations.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Modal isOpen={props.isOpen} onRequestClose={props.onClose} contentLabel="Edit Set Modal">
      <div className="flex flex-col items-center">
        <h2 className="mb-4">Locations</h2>
        <div className="relative w-full">
          {editableLocations.map((location, index) => (
            <TextInputWithButton
              key={location.id}
              placeholder={`Enter location`}
              value={location.name}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onButtonClick={() => removeLocation(index)}
              buttonIcon={<Trash2 color="gray" size={18} />}
            />
          ))}
        </div>

        <ActionButton onClick={props.onClose}>Save</ActionButton>
      </div>
    </Modal>
  );
}

export default EditSetModal;
