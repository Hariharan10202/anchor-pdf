import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    loading: false,
    protocol: false,
  },

  reducers: {
    updateUserPending: (state) => {
      state.loading = true;
    },
    updateUser: (state, action) => {
      state.data = action.payload;
    },
    updateSucess: (state) => {
      state.loading = false;
    },
    updateProtocol: (state, action) => {
      state.protocol = action.payload;
    },
  },
});

export const { updateUser, updateUserPending, updateSucess, updateProtocol } =
  userSlice.actions;

export default userSlice.reducer;
