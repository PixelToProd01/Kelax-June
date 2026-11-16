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
        localStorage.setItem("role", result.data.user?.role || "admin");
      } catch (error) {
        console.log(error);
        dispatch(clearAdminData()); // ❌ not logged in
        localStorage.removeItem("role");
      }
    };

    fetchAdmin();
  }, [dispatch]);

  // RBAC: if admin deactivates an employee / their role while they are logged in,
  // the server answers with code STAFF_ACCESS_REVOKED -> log them out of the panel.
  useEffect(() => {
    const interceptorId = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.data?.code === "STAFF_ACCESS_REVOKED") {
          dispatch(clearAdminData());
          localStorage.removeItem("role");
        }
        return Promise.reject(error);
      },
    );

    return () => axios.interceptors.response.eject(interceptorId);
  }, [dispatch]);
};

export default useAdminAuth;
