import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import agent from "../../agent";
import { Customer } from "@/app/models/customer";

const customersAdapter = createEntityAdapter<Customer>({});

const initialState = customersAdapter.getInitialState({
  selectCustomer: null as Customer | null,
  loading: false,
  messagesError: null as any | null,
});

export const getAllCustomersAsync = createAsyncThunk(
  "customerState/getAllCustomersAsync",
  async (_, thunkAPI) => {
    try {
      const response = await agent.Customers.getAllCustomers();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const customersSelectors = customersAdapter.getSelectors<RootState>(
  (state) => state.customerState
);

const customerSlice = createSlice({
  name: "customerState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCustomersAsync.fulfilled, (state, action) => {
      customersAdapter.setAll(state, action.payload);
    });
  },
});

export default customerSlice.reducer;
