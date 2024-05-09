"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/store";
import { signOut } from "@/app/utils/redux/slices/accountSlice";
import {
  customersSelectors,
  getAllCustomersAsync,
} from "@/app/utils/redux/slices/customerSlice";

export default function Zalogowany() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.account);
  const customer = useAppSelector(customersSelectors.selectAll);
  const token = user?.token;

  useEffect(() => {
    if (!token) {
      console.log("Token nie istnieje, przekierowanie do logowania...");
      router.push("/");
      return;
    }
    try {
      const decodedToken: any = jwtDecode(token);
      const role =
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
      if (role !== "Owner") {
        console.error("Nie jesteś właścicielem: dostęp ograniczony");
        router.push("/error");
        return;
      }
      console.log("DECODED TOKEN: ", decodedToken);
    } catch (error) {
      console.error("Błąd dekodowania tokenu: ", error);
      router.push("/");
    }
  }, [token, router]);

  useEffect(() => {
    dispatch(getAllCustomersAsync());
  }, [dispatch]);

  const logout = () => {
    dispatch(signOut());
    router.push("/");
  };

  return (
    <>
      <div>
        <div>
          ZALOGOWANO !!!!
          <button className="btn btn-blue" onClick={logout}>
            Wyloguj
          </button>
        </div>
        <div>
          {customer.map((c, index) => (
            <div key={index}>
              {c.firstName} , {c.lastName}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
