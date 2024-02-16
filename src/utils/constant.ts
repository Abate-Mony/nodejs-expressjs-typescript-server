type user = "admin" | "user";
export const enum _user {
  ADMIN = "admin",
  USER = "user",
}
type UserRole = user[];
export const ROLES: UserRole = ["admin", "user"];
