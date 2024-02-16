import { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../common/Modal";
import TextInput from "../common/TextInput";
import ActionButton from "../common/ActionButton";
import { AppDispatch } from "../../store/store";
import { createSet } from "../../store/set/setsSlice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function NewSetModal(props: Props) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError("");
    }
    setName(e.target.value);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      return setError("Set name is empty");
    }
    try {
      await dispatch(createSet(name)).unwrap();
    } catch (error) {
      return setError("Error creating a new set");
    }
    setName("");
    props.onClose();
  };

  return (
    <Modal isOpen={props.isOpen} onRequestClose={props.onClose} contentLabel="New Set Modal">
      <div className="flex flex-col items-center">
        <h2 className="mb-3">New Set</h2>

        <TextInput placeholder={"Enter set name"} value={name} onChange={handleInputChange} />
        {error && <p className="text-red-400">{error}</p>}

        <ActionButton onClick={handleSave}>Save</ActionButton>
      </div>
    </Modal>
  );
}

export default NewSetModal;
