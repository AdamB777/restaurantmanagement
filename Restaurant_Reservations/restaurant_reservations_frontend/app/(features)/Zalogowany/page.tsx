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
import { parseCookies } from 'nookies';
import { GetServerSideProps } from "next";

export default function Zalogowany() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.account);
  const customer = useAppSelector(customersSelectors.selectAll);
  


  useEffect(() => {
    const token = user?.token;
    if (token) {
      document.cookie = `token=${token}; path=/; Secure; HttpOnly; SameSite=Lax;`;
    }
    const handleAuth = async () => {
      const localUser = localStorage.getItem('user');
      if (!localUser) {
        router.push('/');
        return;
      }
      const userData = JSON.parse(localUser);
      const token = userData?.token;
      if (!token) {
        console.log("Token nie istnieje, przekierowanie do logowania...");
        router.push('/');
        return;
      }

      const decodedToken = DecodeToken(token);
      if (decodedToken !== 'Owner') {
        console.error("Nie jesteś właścicielem: dostęp ograniczony");
        router.push('/');
        return;
      }
      dispatch(fetchCurrentUser());
      dispatch(getAllCustomersAsync());
    };

    handleAuth();
  }, []);

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
