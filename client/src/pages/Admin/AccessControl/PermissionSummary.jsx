const ACTION_LABEL = { create: "Create", read: "View", update: "Update", delete: "Delete" };
const ACTION_STYLE = {
  create: "bg-green-50 text-green-700 ring-green-600/20",
  read: "bg-blue-50 text-blue-700 ring-blue-600/20",
  update: "bg-amber-50 text-amber-700 ring-amber-600/20",
  delete: "bg-red-50 text-red-700 ring-red-600/20",
};

/**
 * Read-only list of what a role can do.
 *   modules      -> from GET /api/rbac/meta
 *   permissions  -> role.permissions
 */
export default function PermissionSummary({ modules = [], permissions = {} }) {
  const rows = modules
    .map((mod) => ({
      ...mod,
      granted: mod.actions.filter((action) => permissions?.[mod.key]?.[action]),
    }))
    .filter((mod) => mod.granted.length > 0);

  if (rows.length === 0) {
    return <p className="text-sm text-gray-500">No permissions assigned.</p>;
  }

  return (
    <div className="space-y-2">
      {rows.map((mod) => (
        <div key={mod.key} className="flex flex-wrap items-center gap-2">
          <span className="w-40 shrink-0 text-sm font-medium text-gray-700">
            {mod.label}
          </span>
          {mod.granted.map((action) => (
            <span
              key={action}
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${ACTION_STYLE[action]}`}
            >
              {ACTION_LABEL[action]}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export { ACTION_LABEL };
