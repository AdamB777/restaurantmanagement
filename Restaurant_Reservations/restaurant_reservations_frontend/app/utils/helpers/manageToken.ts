import { jwtDecode } from "jwt-decode";

export function DecodeToken(token: string) {
  const decodedToken: any = jwtDecode(token);
  const role =
    decodedToken[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];

  return role;
}
