/* user jwt token expiration time*/
export const expireTimer = {
  expiresIn: '1h'
};

/* maintained user roles */
export const user_roles = {
  super: "SUPER_USER",
  admin: "ADMIN_USER",
  staff: "STAFF_USER",
}

export const extractInitials = (input: string) => {
  return input.split('_').map(word => word[0]).join('');
}