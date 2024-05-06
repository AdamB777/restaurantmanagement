"use client";

import { signOut } from "@/app/utils/redux/slices/accountSlice";
import {
  customersSelectors,
  getAllCustomersAsync,
} from "@/app/utils/redux/slices/customerSlice";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/store";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Zalogowany() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.account);
  const customer = useSelector(customersSelectors.selectAll);

  const asd = user?.token;

  console.log("user token ===> ", asd);

  const decodedToken = jwtDecode(asd!.toString());
  console.log("Decoded JWT: ", decodedToken);

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
          <button className="btn btn-blue" onClick={() => logout()}>
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
