export const findDepartments = (plug, departments) => {
  if (departments && departments.length === 0) {
    return undefined;
  }
  return departments.filter((item) => plug === item.department_slug)[0];
};
