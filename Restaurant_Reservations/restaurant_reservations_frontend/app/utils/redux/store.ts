import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import testSlice from "./slices/testSlice";
import accountSlice from "./slices/accountSlice";
import customerSlice from "./slices/customerSlice";

console.log("accountSlice:", accountSlice);

export const store = configureStore({
  reducer: {
    testState: testSlice,
    customerState: customerSlice,
    account: accountSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorowanie konkretnych akcji podczas sprawdzania serializacji
        // np. do lokalnego chwilowego przechowywania pliku
        ignoredActions: [],
        // Ignorowanie konkretnych ścieżek podczas sprawdzania serializacji
        ignoredPaths: [],
      },
    }),
});

// Typ RootState reprezentuje typ całego stanu Redux store
export type RootState = ReturnType<typeof store.getState>;

// Typ AppDispatch reprezentuje typ dispatch funkcji Redux store
export type AppDispatch = typeof store.dispatch;

// Hook useAppDispatch umożliwia dostęp do funkcji dispatch Redux store
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Hook useAppSelector umożliwia dostęp do selektorów z typowanym stanem Redux
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
