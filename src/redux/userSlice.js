import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: undefined,
  token: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUsers: (state, action) => {
      state.user={...state.user, action};
    },
  },
});


export {updateUsers} from userSlice.action;

export default userSlice.reducer;
