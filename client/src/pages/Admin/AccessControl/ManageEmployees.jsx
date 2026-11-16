import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Plus, Pencil, Trash2, X, Eye, Search, RefreshCw, Users } from "lucide-react";
import { serverUrl } from "../../../App";
import PermissionSummary from "./PermissionSummary";

// NOTE: evaluated lazily – serverUrl lives in App.jsx (circular import), so never read it at module top-level
const apiBase = () => `${serverUrl}/api/rbac`;
const cfg = { withCredentials: true };
const errMsg = (error, fallback) => error?.response?.data?.message || fallback;
const LIMIT = 10;

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    : "-";

const Switch = ({ checked, onChange, disabled, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    disabled={disabled}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition disabled:cursor-not-allowed disabled:opacity-50 ${
      checked ? "bg-green-500" : "bg-gray-300"
    }`}
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
        checked ? "translate-x-5" : "translate-x-0.5"
      }`}
    />
  </button>
);

const Field = ({ label, children }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
    {children}
  </div>
);

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500";

/* ======================= create / edit modal ======================= */
const EmployeeModal = ({ employee, roles, onClose, onSaved }) => {
  const isEdit = Boolean(employee);
  const [form, setForm] = useState({
    fullName: employee?.fullName || "",
    email: employee?.email || "",
    phone: employee?.phone || "",
    jobTitle: employee?.jobTitle || "",
    password: "",
    assignedRole: employee?.assignedRole?._id || "",
    userStatus: employee?.userStatus || "active",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  // active roles + the employee's current role (even if it has since been deactivated)
  const roleOptions = roles.filter(
    (role) => role.isActive || role._id === employee?.assignedRole?._id,
  );

  const submit = async (event) => {
    event.preventDefault();

    if (!form.fullName.trim()) return toast.error("Name is required");
    if (!isEdit && !form.email.trim()) return toast.error("Email is required");
    if (!/^\+?[0-9]{10,15}$/.test(form.phone.trim()))
      return toast.error("Phone must be 10-15 digits");
    if (!form.assignedRole) return toast.error("Please select a role");
    if (!isEdit && form.password.length < 8)
      return toast.error("Password must be at least 8 characters");
    if (isEdit && form.password && form.password.length < 8)
      return toast.error("Password must be at least 8 characters");

    setSaving(true);
    try {
      let res;
      if (isEdit) {
        const payload = {
          fullName: form.fullName,
          phone: form.phone,
          jobTitle: form.jobTitle,
          assignedRole: form.assignedRole,
        };
        if (form.password) payload.password = form.password;
        res = await axios.put(`${apiBase()}/employees/${employee._id}`, payload, cfg);
      } else {
        res = await axios.post(`${apiBase()}/employees`, form, cfg);
      }
      toast.success(res.data.message);
      onSaved();
    } catch (error) {
      toast.error(errMsg(error, "Failed to save employee"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/50 p-4">
      <form onSubmit={submit} className="my-6 w-full max-w-2xl rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-bold text-gray-800">
            {isEdit ? "Edit Employee" : "Create Employee"}
          </h2>
          <button type="button" onClick={onClose} className="cursor-pointer text-gray-500 hover:text-gray-800">
            <X size={20} />
          </button>
        </div>

        <div className="grid gap-4 px-6 py-5 sm:grid-cols-2">
          <Field label="Full name *">
            <input className={inputClass} value={form.fullName} onChange={set("fullName")} />
          </Field>

          <Field label="Email *">
            <input
              type="email"
              className={inputClass}
              value={form.email}
              onChange={set("email")}
              disabled={isEdit}
              title={isEdit ? "Email cannot be changed" : ""}
            />
          </Field>

          <Field label="Phone *">
            <input
              className={inputClass}
              value={form.phone}
              onChange={set("phone")}
              placeholder="10-15 digits"
            />
          </Field>

          <Field label="Job title">
            <input className={inputClass} value={form.jobTitle} onChange={set("jobTitle")} />
          </Field>

          <Field label="Role *">
            <select className={inputClass} value={form.assignedRole} onChange={set("assignedRole")}>
              <option value="">Select role</option>
              {roleOptions.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.name}
                  {!role.isActive ? " (inactive)" : ""}
                </option>
              ))}
            </select>
            {roles.filter((r) => r.isActive).length === 0 && (
              <p className="mt-1 text-xs text-amber-600">
                No active roles. Create / activate a role first.
              </p>
            )}
          </Field>

          {!isEdit && (
            <Field label="Status">
              <select className={inputClass} value={form.userStatus} onChange={set("userStatus")}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </Field>
          )}

          <div className={isEdit ? "sm:col-span-2" : "sm:col-span-2"}>
            <Field label={isEdit ? "New password (leave blank to keep current)" : "Password * (min 8 characters)"}>
              <div className="flex gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  className={inputClass}
                  value={form.password}
                  onChange={set("password")}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="cursor-pointer rounded-lg border border-gray-300 px-3 text-sm text-gray-600 hover:bg-gray-50"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </Field>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="cursor-pointer rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : isEdit ? "Update Employee" : "Create Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

/* ======================= view modal ======================= */
const ViewEmployeeModal = ({ employee, meta, onClose }) => {
  const rows = [
    ["Name", employee.fullName],
    ["Email", employee.email],
    ["Phone", employee.phone],
    ["Job title", employee.jobTitle || "-"],
    ["Role", employee.assignedRole?.name || "—"],
    ["Status", employee.userStatus],
    ["Created", formatDate(employee.createdAt)],
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/50 p-4">
      <div className="my-6 w-full max-w-2xl rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-bold text-gray-800">Employee Details</h2>
          <button onClick={onClose} className="cursor-pointer text-gray-500 hover:text-gray-800">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-5">
          <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {rows.map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs uppercase tracking-wide text-gray-400">{label}</dt>
                <dd className="break-all text-sm font-medium text-gray-800">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <h3 className="mb-3 mt-6 text-sm font-semibold text-gray-700">
            Access (from role “{employee.assignedRole?.name || "none"}”)
            {employee.assignedRole && !employee.assignedRole.isActive && (
              <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700">
                Role inactive – employee cannot log in
              </span>
            )}
          </h3>
          <PermissionSummary
            modules={meta?.modules || []}
            permissions={employee.assignedRole?.permissions || {}}
          />
        </div>
      </div>
    </div>
  );
};

/* ======================= page ======================= */
export default function ManageEmployees() {
  const [meta, setMeta] = useState(null);
  const [roles, setRoles] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [editing, setEditing] = useState(undefined); // undefined=closed, null=create, object=edit
  const [viewing, setViewing] = useState(null);

  // debounce search
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 350);
    return () => clearTimeout(id);
  }, [search]);

  const loadRoles = useCallback(async () => {
    try {
      const [metaRes, rolesRes] = await Promise.all([
        axios.get(`${apiBase()}/meta`, cfg),
        axios.get(`${apiBase()}/roles`, cfg),
      ]);
      setMeta({ actions: metaRes.data.actions, modules: metaRes.data.modules });
      setRoles(rolesRes.data.roles);
    } catch (error) {
      toast.error(errMsg(error, "Failed to load roles"));
    }
  }, []);

  const loadEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiBase()}/employees`, {
        ...cfg,
        params: { page, limit: LIMIT, search: debouncedSearch, status: statusFilter },
      });
      setEmployees(res.data.employees);
      setPages(res.data.pages);
      setTotal(res.data.total);
    } catch (error) {
      toast.error(errMsg(error, "Failed to load employees"));
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, statusFilter]);

  useEffect(() => {
    loadRoles();
  }, [loadRoles]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const toggleStatus = async (employee, active) => {
    setBusyId(employee._id);
    try {
      const res = await axios.patch(
        `${apiBase()}/employees/${employee._id}/status`,
        { status: active ? "active" : "inactive" },
        cfg,
      );
      toast.success(res.data.message);
      setEmployees((list) => list.map((e) => (e._id === employee._id ? res.data.employee : e)));
    } catch (error) {
      toast.error(errMsg(error, "Failed to update status"));
    } finally {
      setBusyId(null);
    }
  };

  const deleteEmployee = async (employee) => {
    if (!window.confirm(`Delete ${employee.fullName} permanently?`)) return;
    setBusyId(employee._id);
    try {
      const res = await axios.delete(`${apiBase()}/employees/${employee._id}`, cfg);
      toast.success(res.data.message);
      if (employees.length === 1 && page > 1) setPage(page - 1);
      else loadEmployees();
      loadRoles();
    } catch (error) {
      toast.error(errMsg(error, "Failed to delete employee"));
    } finally {
      setBusyId(null);
    }
  };

  const saved = () => {
    setEditing(undefined);
    loadEmployees();
    loadRoles();
  };

  return (
    <div className="mx-auto max-w-6xl p-2 md:p-4">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <p className="text-sm text-gray-500">
            Create employees, assign a role and activate / deactivate their login.
          </p>
        </div>
        <button
          onClick={() => setEditing(null)}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Plus size={16} /> Create Employee
        </button>
      </div>

      {/* filters */}
      <div className="mb-4 flex flex-wrap gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or phone"
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
        >
          <option value="">All status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button
          onClick={() => {
            loadEmployees();
            loadRoles();
          }}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead className="bg-[#006db8] text-left text-white">
              <tr>
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3 text-center">Active</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id} className="border-t border-gray-100">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-800">{employee.fullName}</p>
                    <p className="break-all text-xs text-gray-500">{employee.email}</p>
                    {employee.jobTitle && (
                      <p className="text-xs text-gray-400">{employee.jobTitle}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{employee.phone}</td>
                  <td className="px-4 py-3">
                    {employee.assignedRole ? (
                      <div className="flex flex-col items-start gap-1">
                        <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                          {employee.assignedRole.name}
                        </span>
                        {!employee.assignedRole.isActive && (
                          <span className="text-xs text-red-600">role inactive</span>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-red-600">No role</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(employee.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col items-center gap-1">
                      <Switch
                        checked={employee.userStatus === "active"}
                        disabled={busyId === employee._id}
                        onChange={(value) => toggleStatus(employee, value)}
                        label={`Toggle ${employee.fullName}`}
                      />
                      <span className="text-xs capitalize text-gray-500">{employee.userStatus}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setViewing(employee)}
                        title="View"
                        className="cursor-pointer rounded-lg bg-gray-100 p-2 text-gray-700 hover:bg-gray-200"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => setEditing(employee)}
                        title="Edit"
                        className="cursor-pointer rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => deleteEmployee(employee)}
                        disabled={busyId === employee._id}
                        title="Delete"
                        className="cursor-pointer rounded-lg bg-red-600 p-2 text-white hover:bg-red-700 disabled:opacity-60"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!loading && employees.length === 0 && (
          <div className="py-14 text-center">
            <Users className="mx-auto mb-3 text-gray-300" size={42} />
            <p className="font-medium text-gray-700">No employees found</p>
            <p className="text-sm text-gray-500">
              {search || statusFilter
                ? "Try a different search or filter."
                : "Click “Create Employee” to add your first employee."}
            </p>
          </div>
        )}
        {loading && employees.length === 0 && (
          <p className="py-14 text-center text-gray-500">Loading employees...</p>
        )}

        {/* pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3 text-sm text-gray-600">
          <span>
            {total} employee{total === 1 ? "" : "s"}
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="cursor-pointer rounded-lg border px-3 py-1.5 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {page} of {pages}
            </span>
            <button
              disabled={page >= pages}
              onClick={() => setPage((p) => p + 1)}
              className="cursor-pointer rounded-lg border px-3 py-1.5 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {editing !== undefined && (
        <EmployeeModal
          employee={editing}
          roles={roles}
          onClose={() => setEditing(undefined)}
          onSaved={saved}
        />
      )}

      {viewing && (
        <ViewEmployeeModal employee={viewing} meta={meta} onClose={() => setViewing(null)} />
      )}
    </div>
  );
}
