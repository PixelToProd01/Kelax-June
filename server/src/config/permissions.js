/* =====================================================================
   RBAC – single source of truth for modules + actions.

   To make a new admin-panel module delegable to employees:
     1. add it here (key + label + actions)
     2. protect its routes with checkPermission("<key>", "<action>")
     3. gate its sidebar link / buttons on the client with usePermission()
   ===================================================================== */

export const PERMISSION_ACTIONS = ["create", "read", "update", "delete"];

export const PERMISSION_MODULES = {
  products: {
    label: "Products",
    description: "Create, view, edit and delete products",
    actions: ["create", "read", "update", "delete"],
  },
  warranty: {
    label: "Warranty",
    description: "Add, view, edit and delete product warranties",
    actions: ["create", "read", "update", "delete"],
  },
  drivers: {
    label: "Drivers",
    description: "Upload, view, edit and delete drivers",
    actions: ["create", "read", "update", "delete"],
  },
  partners: {
    label: "Partners",
    description: "View partners, activate / deactivate them, delete them",
    actions: ["read", "update", "delete"],
  },
  customers: {
    label: "Customers",
    description: "View customers",
    actions: ["read"],
  },
  deals: {
    label: "Deal Registrations",
    description: "View partner deals, approve / reject them",
    actions: ["read", "update"],
  },
};

export const MODULE_KEYS = Object.keys(PERMISSION_MODULES);

/** { products:{create:false,read:false,update:false,delete:false}, ... } */
export const emptyPermissions = () => {
  const result = {};
  for (const key of MODULE_KEYS) {
    result[key] = {};
    for (const action of PERMISSION_ACTIONS) result[key][action] = false;
  }
  return result;
};

/** Admin => every action of every module that exists. */
export const fullPermissions = () => {
  const result = emptyPermissions();
  for (const key of MODULE_KEYS) {
    for (const action of PERMISSION_MODULES[key].actions) {
      result[key][action] = true;
    }
  }
  return result;
};

/**
 * Takes whatever the client sent / the DB holds and returns a clean,
 * complete permissions object:
 *  - unknown modules / actions are dropped
 *  - actions a module doesn't support are forced to false
 *  - update / delete imply read (the edit & delete buttons live on the
 *    "view" screens, so without read they could never be used)
 */
export const sanitizePermissions = (input) => {
  const clean = emptyPermissions();
  if (!input || typeof input !== "object") return clean;

  for (const key of MODULE_KEYS) {
    const given = input[key];
    if (!given || typeof given !== "object") continue;

    for (const action of PERMISSION_MODULES[key].actions) {
      clean[key][action] = given[action] === true;
    }

    const supportsRead = PERMISSION_MODULES[key].actions.includes("read");
    if (supportsRead && (clean[key].update || clean[key].delete)) {
      clean[key].read = true;
    }
  }
  return clean;
};

export const hasAnyPermission = (permissions) =>
  MODULE_KEYS.some((key) =>
    PERMISSION_ACTIONS.some((action) => permissions?.[key]?.[action]),
  );

export const getPermissionMeta = () => ({
  actions: PERMISSION_ACTIONS,
  modules: MODULE_KEYS.map((key) => ({
    key,
    label: PERMISSION_MODULES[key].label,
    description: PERMISSION_MODULES[key].description,
    actions: PERMISSION_MODULES[key].actions,
  })),
});
