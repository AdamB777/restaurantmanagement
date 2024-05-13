"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/store";
import { fetchCurrentUser, signOut } from "@/app/utils/redux/slices/accountSlice";
import {
  customersSelectors,
  getAllCustomersAsync,
} from "@/app/utils/redux/slices/customerSlice";
import { DecodeToken } from "@/app/utils/helpers/manageToken";

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
      const role = DecodeToken(token);

      if (role !== "Owner") {
        console.error("Nie jesteś właścicielem: dostęp ograniczony");
        router.push("/error");
        return;
      }
      // TODO  else
    } catch (error) {
      console.error("Błąd dekodowania tokenu: ", error);
      router.push("/");
    }
  }, [token, router]);

  useEffect(() => {
    dispatch(fetchCurrentUser)
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
