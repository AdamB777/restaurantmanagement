"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signInUser } from "@/app/utils/redux/slices/accountSlice";
import { useAppDispatch } from "@/app/utils/redux/store";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(event: any) {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function submitForm(event: any) {
    event.preventDefault();
    try {
      const actionResult = await dispatch(signInUser(values));

      if (signInUser.fulfilled.match(actionResult)) {
        const user = actionResult.payload;
        const token = user?.token;
        console.log("user token ==========> ", user.token);
        const decodedToken: any = jwtDecode(token!.toString());
        console.log("DECODED TOKEN:  ", decodedToken);

        // Zapisani roli uzytkownika do stanu
        const role =
          decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];

        console.log("user role is ...", role);
        // Opóźnienie nawigacji do momentu pełnego załadowania komponentu
        setTimeout(() => {
          if (role === "Owner") {
            router.push("/Zalogowany");
          } else if (user.isEmployee) {
            router.push("/employee");
          } else if (user.isCustomer) {
            router.push("/customer");
          } else if (user.isSuperAdmin) {
            router.push("/admin");
          }
        }, 0);
      } else {
        console.error("Logowanie nie powiodło się");
      }
    } catch (error) {
      console.error("Błąd podczas logowania:", error);
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submitForm}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={values.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={values.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
