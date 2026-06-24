// src/hooks/useAdminAuth.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAdminData, clearAdminData } from "../redux/slices/adminSlice";
import { serverUrl } from "../App";

const useAdminAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/admin/me`, {
          withCredentials: true,
        });

        dispatch(setAdminData(result.data.user));
        localStorage.setItem("role", "admin");
      } catch (error) {
        console.log(error);
        dispatch(clearAdminData()); // ❌ not logged in
        localStorage.removeItem("role");
      }
    };

    fetchAdmin();
  }, [dispatch]);

};

export default useAdminAuth;