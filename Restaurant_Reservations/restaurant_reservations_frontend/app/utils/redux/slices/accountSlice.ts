import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../../agent";
import { User } from "@/app/models/user";

// Definicja stanu dla konta użytkownika
interface AccountState {
  user: User|null;
  isLoading: boolean;
  isUserLoaded: boolean;
  error: string | null;
}
interface FormData {
  email: string;
  password: string;
}

const initialState: AccountState = {
  user: null,
  isLoading: false,
  isUserLoaded: false,
  error: null,
};

export const signInUser = createAsyncThunk<User, FormData>(
  "account/signInUser",
  async (formdata, thunkAPI) => {
    try {
      const user = await agent.Account.login(formdata);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      console.error("SignIn error:", error);
      return thunkAPI.rejectWithValue({ error: error || "Unknown error" });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<User>(
  "account/fetchCurrentUser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
    try {
      const user = await agent.Account.currentUser();
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);
export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isUserLoaded = false;
      localStorage.removeItem("user");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isUserLoaded = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.isUserLoaded = true;
        localStorage.removeItem("user");
        //   router.navigate("/");
      })
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signInUser.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addMatcher(
        isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
        (state, action) => {
          state.user = action.payload;
        }
      )
      .addMatcher(isAnyOf(signInUser.rejected), (state, action) => {});
  },
});

export const { signOut, setUser } = accountSlice.actions;
export default accountSlice.reducer;
