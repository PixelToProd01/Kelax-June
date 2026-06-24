// src/hooks/useUserAuth.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserData, clearUserData } from "../redux/slices/userSlice";
import { serverUrl } from "../App";

const useUserAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/auth/me`, {
          withCredentials: true,
        });

        // ✅ Redux me userData store
        dispatch(setUserData(result.data.user));

        // optional: localStorage me role sync
        localStorage.setItem("role", result.data.user.role);
      } catch (error) {
        console.log(error);
        dispatch(clearUserData());
        localStorage.removeItem("role");
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useUserAuth;
