import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../common/Modal";
import TextInput from "../common/TextInput";
import ActionButton from "../common/ActionButton";
import { AppDispatch } from "../../store/store";
import { registerUser, loginUser } from "../../store/user/userSlice";
import { getSets } from "../../store/set/setsSlice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function AuthModal(props: Props) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (error) {
      setError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, password, password2]);

  const handleSwitchRegisterLogin = () => {
    setName("");
    setPassword("");
    setPassword2("");
    setIsRegistering((prev) => !prev);
  };

  const handleLogInOrSignUp = async () => {
    if (!name) {
      return setError("Username is empty");
    }
    if (!password) {
      return setError("Password is empty");
    }

    if (isRegistering) {
      if (password.length < 6) {
        return setError("Passwords must be at least 6 characters long");
      }
      if (password !== password2) {
        return setError("Passwords do not match");
      }
      try {
        await dispatch(registerUser({ name, password })).unwrap();
      } catch (error) {
        return setError("Error signing up");
      }
    } else {
      try {
        await dispatch(loginUser({ name, password })).unwrap();
      } catch (error) {
        return setError("Error logging in");
      }
    }

    dispatch(getSets());
    setName("");
    setPassword("");
    setPassword2("");
    setIsRegistering(false);
    props.onClose();
  };

  return (
    <Modal isOpen={props.isOpen} onRequestClose={props.onClose} contentLabel="Authentication Modal">
      <div className="flex flex-col items-center text-center">
        <h2 className="mb-4">{isRegistering ? "Sign up" : "Login"}</h2>

        <TextInput placeholder={`Enter username`} value={name} onChange={(e) => setName(e.target.value)} />
        <TextInput
          type="password"
          placeholder={`Enter password`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isRegistering && (
          <TextInput
            type="password"
            placeholder={`Confirm password`}
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        )}
        {error && <p className="text-red-400">{error}</p>}

        <ActionButton onClick={handleLogInOrSignUp}>{isRegistering ? "Sign up" : "Log in"}</ActionButton>
        <p className="text-base underline cursor-pointer" onClick={handleSwitchRegisterLogin}>
          {isRegistering ? "Login" : "Sign up"}
        </p>
      </div>
    </Modal>
  );
}

export default AuthModal;
