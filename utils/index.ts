/* user jwt token expiration time*/
export const expireTimer = {expiresIn: '1h'};

/* maintained user roles */
export const user_roles = ["SUPER_USER", "ADMIN_USER", "STAFF_USER",]

/* extract the string */
export const extractInitials = (input: string) => {
  return input.split('_').map(word => word[0]).join('');
}