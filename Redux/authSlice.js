import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    uid:null,
    name: null,
    photoUrl: null,
    email: null,
    isAuth: null,

  },
  reducers: {
    setUser: (state, action) => {
      state.uid = action.payload.uid
      state.name = action.payload.name;
      state.photoUrl = action.payload.photoUrl;
      state.email = action.payload.email;
      state.isAuth = true;
    },
    removerUser: (state) => {
      state.name = null;
      state.photoUrl = null;
      state.email = null;
      state.isAuth = false;
    },
  },
});

export const { setUser, removerUser } = authSlice.actions;
export default authSlice.reducer;
