import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Plus, Pencil, Trash2, X, ShieldCheck, RefreshCw } from "lucide-react";
import { serverUrl } from "../../../App";
import PermissionSummary, { ACTION_LABEL } from "./PermissionSummary";

// NOTE: evaluated lazily – serverUrl lives in App.jsx (circular import), so never read it at module top-level
const apiBase = () => `${serverUrl}/api/rbac`;
const cfg = { withCredentials: true };
const errMsg = (error, fallback) => error?.response?.data?.message || fallback;

const EMPTY_FORM = { name: "", description: "", isActive: true, permissions: {} };

/* ======================= small switch ======================= */
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

/* ======================= permission matrix ======================= */
const PermissionMatrix = ({ meta, permissions, onChange }) => {
  const get = (moduleKey, action) => permissions?.[moduleKey]?.[action] === true;

  const setCell = (mod, action, value) => {
    const current = { ...(permissions?.[mod.key] || {}) };
    current[action] = value;

    // update / delete need "view" (their buttons live on the view screens)
    if (mod.actions.includes("read")) {
      if (value && (action === "update" || action === "delete")) current.read = true;
      if (!value && action === "read") {
        current.update = false;
        current.delete = false;
      }
    }
    onChange({ ...permissions, [mod.key]: current });
  };

  const setRow = (mod, value) => {
    const row = {};
    mod.actions.forEach((action) => (row[action] = value));
    onChange({ ...permissions, [mod.key]: row });
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[560px] text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">Module</th>
            {meta.actions.map((action) => (
              <th key={action} className="px-3 py-3 text-center font-semibold">
                {ACTION_LABEL[action]}
              </th>
            ))}
            <th className="px-3 py-3 text-center font-semibold">All</th>
          </tr>
        </thead>
        <tbody>
          {meta.modules.map((mod) => {
            const allChecked = mod.actions.every((action) => get(mod.key, action));
            return (
              <tr key={mod.key} className="border-t border-gray-100">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-800">{mod.label}</p>
                  <p className="text-xs text-gray-500">{mod.description}</p>
                </td>
                {meta.actions.map((action) => (
                  <td key={action} className="px-3 py-3 text-center">
                    {mod.actions.includes(action) ? (
                      <input
                        type="checkbox"
                        className="h-4 w-4 cursor-pointer accent-indigo-600"
                        checked={get(mod.key, action)}
                        onChange={(e) => setCell(mod, action, e.target.checked)}
                        aria-label={`${mod.label} ${ACTION_LABEL[action]}`}
                      />
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                ))}
                <td className="px-3 py-3 text-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer accent-indigo-600"
                    checked={allChecked}
                    onChange={(e) => setRow(mod, e.target.checked)}
                    aria-label={`${mod.label} all`}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

/* ======================= create / edit modal ======================= */
const RoleModal = ({ meta, role, onClose, onSaved }) => {
  const isEdit = Boolean(role);
  const [form, setForm] = useState(
    isEdit
      ? {
          name: role.name,
          description: role.description || "",
          isActive: role.isActive,
          permissions: role.permissions,
        }
      : EMPTY_FORM,
  );
  const [saving, setSaving] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (!form.name.trim()) return toast.error("Role name is required");

    setSaving(true);
    try {
      const res = isEdit
        ? await axios.put(`${apiBase()}/roles/${role._id}`, form, cfg)
        : await axios.post(`${apiBase()}/roles`, form, cfg);
      toast.success(res.data.message);
      onSaved();
    } catch (error) {
      toast.error(errMsg(error, "Failed to save role"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/50 p-4">
      <form
        onSubmit={submit}
        className="my-6 w-full max-w-3xl rounded-2xl bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-bold text-gray-800">
            {isEdit ? "Edit Role" : "Create Role"}
          </h2>
          <button type="button" onClick={onClose} className="cursor-pointer text-gray-500 hover:text-gray-800">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5 px-6 py-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Role name *
              </label>
              <input
                value={form.name}
                maxLength={50}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Sales, Support, Content Manager"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Status
              </label>
              <div className="flex h-[38px] items-center gap-3">
                <Switch
                  checked={form.isActive}
                  onChange={(value) => setForm({ ...form, isActive: value })}
                  label="Role active"
                />
                <span className="text-sm text-gray-600">
                  {form.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows={2}
              maxLength={250}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="What is this role for? (optional)"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">Permissions *</p>
            <PermissionMatrix
              meta={meta}
              permissions={form.permissions}
              onChange={(permissions) => setForm({ ...form, permissions })}
            />
            <p className="mt-2 text-xs text-gray-500">
              Update / Delete automatically include View, because those buttons
              are on the view screens. Employees will only see the sections you
              tick here.
            </p>
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
            {saving ? "Saving..." : isEdit ? "Update Role" : "Create Role"}
          </button>
        </div>
      </form>
    </div>
  );
};

/* ======================= page ======================= */
export default function ManageRoles() {
  const [meta, setMeta] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalRole, setModalRole] = useState(undefined); // undefined=closed, null=create, object=edit
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [metaRes, rolesRes] = await Promise.all([
        axios.get(`${apiBase()}/meta`, cfg),
        axios.get(`${apiBase()}/roles`, cfg),
      ]);
      setMeta({ actions: metaRes.data.actions, modules: metaRes.data.modules });
      setRoles(rolesRes.data.roles);
    } catch (error) {
      toast.error(errMsg(error, "Failed to load roles"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggleStatus = async (role, isActive) => {
    setBusyId(role._id);
    try {
      const res = await axios.patch(`${apiBase()}/roles/${role._id}/status`, { isActive }, cfg);
      toast.success(res.data.message);
      setRoles((list) => list.map((r) => (r._id === role._id ? { ...r, isActive } : r)));
    } catch (error) {
      toast.error(errMsg(error, "Failed to update status"));
    } finally {
      setBusyId(null);
    }
  };

  const deleteRole = async (role) => {
    if (!window.confirm(`Delete role "${role.name}" permanently?`)) return;
    setBusyId(role._id);
    try {
      const res = await axios.delete(`${apiBase()}/roles/${role._id}`, cfg);
      toast.success(res.data.message);
      setRoles((list) => list.filter((r) => r._id !== role._id));
    } catch (error) {
      toast.error(errMsg(error, "Failed to delete role"));
    } finally {
      setBusyId(null);
    }
  };

  const closeModal = () => setModalRole(undefined);
  const saved = () => {
    closeModal();
    load();
  };

  return (
    <div className="mx-auto max-w-5xl p-2 md:p-4">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Roles</h1>
          <p className="text-sm text-gray-500">
            Create roles and choose exactly what each role can create, view,
            update or delete.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={load}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
          <button
            onClick={() => setModalRole(null)}
            disabled={!meta}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            <Plus size={16} /> Create Role
          </button>
        </div>
      </div>

      {loading && roles.length === 0 ? (
        <p className="py-12 text-center text-gray-500">Loading roles...</p>
      ) : roles.length === 0 ? (
        <div className="rounded-xl bg-white py-16 text-center shadow">
          <ShieldCheck className="mx-auto mb-3 text-gray-300" size={44} />
          <p className="font-medium text-gray-700">No roles yet</p>
          <p className="text-sm text-gray-500">
            Click “Create Role” to make your first role (e.g. Sales).
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {roles.map((role) => (
            <article key={role._id} className="rounded-xl bg-white p-5 shadow">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold text-gray-900">{role.name}</h2>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        role.isActive ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {role.isActive ? "Active" : "Inactive"}
                    </span>
                    <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                      {role.employeeCount} employee{role.employeeCount === 1 ? "" : "s"}
                    </span>
                  </div>
                  {role.description && (
                    <p className="mt-1 text-sm text-gray-500">{role.description}</p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={role.isActive}
                      disabled={busyId === role._id}
                      onChange={(value) => toggleStatus(role, value)}
                      label={`Toggle ${role.name}`}
                    />
                  </div>
                  <button
                    onClick={() => setModalRole(role)}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() => deleteRole(role)}
                    disabled={busyId === role._id}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700 disabled:opacity-60"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>

              <div className="mt-4 border-t pt-4">
                <PermissionSummary modules={meta?.modules || []} permissions={role.permissions} />
              </div>
            </article>
          ))}
        </div>
      )}

      {modalRole !== undefined && meta && (
        <RoleModal meta={meta} role={modalRole} onClose={closeModal} onSaved={saved} />
      )}
    </div>
  );
}
