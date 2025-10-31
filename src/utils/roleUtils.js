// src/utils/roleUtils.js
export const canAccess = (user, feature) => {
  const roles = {
    Admin: ['equipment_add', 'equipment_edit', 'equipment_delete', 'rentals_create', 'rentals_update', 'maintenance_add', 'maintenance_edit'],
    Staff: ['equipment_add', 'equipment_edit', 'rentals_create', 'rentals_update', 'maintenance_add', 'maintenance_edit'],
    Customer: ['rentals_create'],
  };
  return user && roles[user.role]?.includes(feature);
};