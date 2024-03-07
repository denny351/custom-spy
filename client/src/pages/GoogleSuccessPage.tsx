import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setUserData } from "../store/user/userSlice";

function GoogleSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const userId = queryParams.get("userId");

    if (token && userId) {
      dispatch(setUserData({ token, userId }));
    }
    navigate("/");
  }, [location, navigate, dispatch]);

  return <p>Google login success</p>;
}

export default GoogleSuccessPage;
