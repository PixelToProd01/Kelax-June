import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  User,
  Mail,
  ShieldCheck,
  Save,
  Pencil,
  Phone,
  Lock,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { serverUrl } from "../../../App";

const AdminProfile = () => {
  const { adminData } = useSelector((state) => state.admin);
  // const token = localStorage.getItem("adminToken");

  const [editMode, setEditMode] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  /* ================= PROFILE FORM ================= */
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    phone: "",
  });

  /* ================= PASSWORD FORM ================= */
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  /* ================= INIT DATA ================= */
  useEffect(() => {
    if (adminData) {
      setProfileForm({
        fullName: adminData.fullName || "",
        phone: adminData.phone || "",
      });
    }
  }, [adminData]);

  /* ================= HANDLERS ================= */
  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  /* ================= UPDATE PROFILE ================= */
  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    if (!profileForm.fullName || !profileForm.phone) {
      return toast.error("Name and phone are required");
    }

    try {
      setLoadingProfile(true);

      await axios.put(`${serverUrl}/api/admin/update-profile`, profileForm, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        withCredentials: true, //Must
      });

      toast.success("Profile updated successfully");
      setEditMode(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed");
    } finally {
      setLoadingProfile(false);
    }
  };

  /* ================= CHANGE PASSWORD ================= */
  const handlePasswordSubmit = async (e) => {
    
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = passwordForm;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error("All password fields are required");
    }

    if (newPassword.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("New passwords do not match");
    }

    try {
      setLoadingPassword(true);

      await axios.put(
        `${serverUrl}/api/admin/change-password`,
        { oldPassword, newPassword },
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
          withCredentials: true,  // Must
        },
      );

      toast.success("Password changed successfully");

      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Password change failed");
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Profile</h1>

        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            <Pencil size={16} />
            Edit Profile
          </button>
        )}
      </div>

      {/* ================= PROFILE CARD ================= */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          {/* FULL NAME */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                name="fullName"
                value={profileForm.fullName}
                disabled={!editMode}
                onChange={handleProfileChange}
                className={`w-full pl-10 pr-4 py-2 border rounded ${
                  editMode ? "bg-white" : "bg-gray-100"
                }`}
              />
            </div>
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Mobile Number
            </label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <input
                type="text"
                name="phone"
                value={profileForm.phone}
                disabled={!editMode}
                onChange={handleProfileChange}
                className={`w-full pl-10 pr-4 py-2 border rounded ${
                  editMode ? "bg-white" : "bg-gray-100"
                }`}
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                disabled
                value={adminData?.email || ""}
                className="w-full pl-10 pr-4 py-2 border rounded bg-gray-100"
              />
            </div>
          </div>

          {/* ROLE */}
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <div className="relative">
              <ShieldCheck
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <input
                disabled
                value={adminData?.role?.toUpperCase()}
                className="w-full pl-10 pr-4 py-2 border rounded bg-gray-100"
              />
            </div>
          </div>

          {/* ACTION BUTTONS */}
          {editMode && (
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="px-4 cursor-pointer py-2 border rounded"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loadingProfile}
                className="flex cursor-pointer items-center gap-2 px-6 py-2 bg-green-600 text-white rounded"
              >
                <Save size={18} />
                {loadingProfile ? "Saving..." : "Save"}
              </button>
            </div>
          )}
        </form>
      </div>

      {/* ================= CHANGE PASSWORD ================= */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Lock size={20} />
          Change Password
        </h2>

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={passwordForm.oldPassword}
            onChange={handlePasswordChange}
            className="w-full px-4 py-2 border rounded"
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={passwordForm.newPassword}
            onChange={handlePasswordChange}
            className="w-full px-4 py-2 border rounded"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={passwordForm.confirmPassword}
            onChange={handlePasswordChange}
            className="w-full px-4 py-2 border rounded"
          />

          <button
            type="submit"
            disabled={loadingPassword}
            className="w-full cursor-pointer py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-semibold"
          >
            {loadingPassword ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
