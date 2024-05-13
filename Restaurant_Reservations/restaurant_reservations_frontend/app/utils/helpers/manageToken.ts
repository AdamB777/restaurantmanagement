import { jwtDecode } from "jwt-decode";


export function DecodeToken(token: any) {
  const decodedToken: any = jwtDecode(token);
  console.log("Token zd:",token);
  const role =
    decodedToken[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];

  return role;
}
