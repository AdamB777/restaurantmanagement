import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../../agent";
import { User } from "@/app/models/user";
import router from "next/router";

// Definicja stanu dla konta użytkownika
interface AccountState {
  user: User | null;
  isLoading: boolean;
  isUserLoaded: boolean;
}
interface FormData {
  email: string;
  password: string;
}

// określenie stanu poczatkowego
const initialState: AccountState = {
  user: null,
  isLoading: false,
  isUserLoaded: false,
};

// export const confirmEmailAsync = createAsyncThunk(
//   "account/registerConfirm",
//   async ({ userId, token }: { userId: string; token: string }, thunkAPI) => {
//     try {
//       await agent.Account.registerConfirm(userId, token);
//       return { userId, token };
//     } catch (error) {
//       return thunkAPI.rejectWithValue({ error: error || "Unknown error" });
//     }
//   }
// );

// export const registerPatient = createAsyncThunk<User, FormData>(
//   "account/registerPatient",
//   async (formData, thunkAPI) => {
//     try {
//       const user = await agent.Account.registerPatient(formData);
//       return user;
//     } catch (error) {
//       return thunkAPI.rejectWithValue({ error });
//     }
//   }
// );

// export const registerAdmin = createAsyncThunk<User, FormData>(
//   "account/registerAdmin",
//   async (formData, thunkAPI) => {
//     try {
//       const user = await agent.Account.registerAdmin(formData);
//       return user;
//     } catch (error) {
//       return thunkAPI.rejectWithValue({ error });
//     }
//   }
// );

// export const addAdmin = createAsyncThunk<User, FormData>(
//   "account/addAdmin",
//   async (formData, thunkAPI) => {
//     try {
//       const user = await agent.Admins.addAdmin(formData);
//       return user;
//     } catch (error) {
//       return thunkAPI.rejectWithValue({ error });
//     }
//   }
// );

// export const registerDietician = createAsyncThunk<User, FormData>(
//   "account/registerDietician",
//   async (formData, thunkAPI) => {
//     try {
//       const user = await agent.Account.registerDietician(formData);
//       return user;
//     } catch (error) {
//       return thunkAPI.rejectWithValue({ error });
//     }
//   }
// );

export const signInUser = createAsyncThunk<User, FormData>(
  "account/signInUser",
  async (formdata, thunkAPI) => {
    try {
      const user = await agent.Account.login(formdata);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      console.error("SignIn error:", error);
      // return thunkAPI.rejectWithValue({ error });
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

// export const updatePasswordAsync = createAsyncThunk<
//   void,
//   { userId: number; passwordData: ChangePassword }
// >("account/updatePassword", async ({ userId, passwordData }, thunkAPI) => {
//   try {
//     await agent.Account.updatePassword(userId, passwordData);
//   } catch (error) {
//     return thunkAPI.rejectWithValue({ error: error || "Nieznany błąd" });
//   }
// });

// utworzenie slice'a (slice jest odpowiedzialny za zarządzaniem stanem globalnym aplikacji wybranego modułu)
export const accountSlice = createSlice({
  name: "account",
  initialState,
  // reducery (służą do generowania akcji w slice'ach)
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
  // extra reducery określają co ma się dziać w akcjach asynchronicznych (np. przy ładowaniu, wyświetlaniu i odrzuceniu żądania)
  extraReducers: (builder) => {
    builder
      //       .addCase(registerPatient.fulfilled, (state, action) => {
      //         state.user = action.payload;
      //       })
      //       .addCase(registerDietician.fulfilled, (state, action) => {
      //         state.user = action.payload;
      //       })
      //       .addCase(registerAdmin.fulfilled, (state, action) => {
      //         state.user = action.payload;
      //       })
      //       .addCase(addAdmin.fulfilled, (state, action) => {
      //         state.user = action.payload;
      //       })
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
    //       .addCase(updatePasswordAsync.pending, (state) => {
    //         state.isLoading = true;
    //       })
    //       .addCase(updatePasswordAsync.fulfilled, (state) => {
    //         state.isLoading = false;
    //       })
    //       .addCase(updatePasswordAsync.rejected, (state, action) => {
    //         state.isLoading = false;
    //         console.error("Błąd aktualizacji hasła: ", action.payload);
    //       });

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
