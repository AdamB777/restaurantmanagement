"use client";

import {
  countryStateSelectors,
  getAllCountryStateAsync,
} from "@/app/utils/redux/slices/testSlice";
import { useAppDispatch } from "@/app/utils/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Test() {
  const [state, setState] = useState("");
  const dispatch = useAppDispatch();

  const testState = useSelector(countryStateSelectors.selectAll);

  useEffect(() => {
    dispatch(getAllCountryStateAsync());
  }, [dispatch]);

  return (
    <>
      <div>
        {testState.map((ts, index) => (
          <div key={index}>State: {ts.stateName}</div>
        ))}
      </div>
    </>
  );
}

export { Test };
