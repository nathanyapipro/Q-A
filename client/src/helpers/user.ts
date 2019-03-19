import { RoleType } from "../types/apollo";

export function getUsername(username: string, role: RoleType): string {
  if (role === RoleType.ANONYMOUS) {
    return username.slice(10, 18);
  } else {
    return username;
  }
}
