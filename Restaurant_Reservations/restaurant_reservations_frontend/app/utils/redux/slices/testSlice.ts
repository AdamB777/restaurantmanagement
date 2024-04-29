import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Testowy } from "@/app/models/test";
import agent from "../../agent";

const testStateAdapter = createEntityAdapter<Testowy>({});

const initialState = testStateAdapter.getInitialState({
  selectCountryState: null as Testowy | null,
  loading: false,
  messagesError: null as any | null,
});

export const getAllCountryStateAsync = createAsyncThunk(
  "testState/getAllCountryStateAsync",
  async (_, thunkAPI) => {
    try {
      const response = await agent.Test.getStates();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const countryStateSelectors = testStateAdapter.getSelectors<RootState>(
  (state) => state.testState
);

const testSlice = createSlice({
  name: "testState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCountryStateAsync.fulfilled, (state, action) => {
      testStateAdapter.setAll(state, action.payload);
    });
  },
});

export default testSlice.reducer;
