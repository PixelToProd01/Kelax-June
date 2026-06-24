import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminData: null,   // logged in admin ka data
  loading: true,    // API check chal raha hai ya nahi
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // ✅ when admin session is valid
    setAdminData: (state, action) => {
      state.adminData = action.payload;
      state.loading = false;
    },

    // ✅ when admin is not logged in / logout
    clearAdminData: (state) => {
      state.adminData = null;
      state.loading = false;
    },

    // ✅ profile update (name etc.)
    updateAdminProfile: (state, action) => {
      state.adminData = {
        ...state.adminData,
        ...action.payload,
      };
    },

    // 🚨 VERY IMPORTANT (browser issue fix)
    resetAdminState: () => initialState,
  },
});

export const {
  setAdminData,
  clearAdminData,
  updateAdminProfile,
  resetAdminState,
} = adminSlice.actions;

export default adminSlice.reducer;
