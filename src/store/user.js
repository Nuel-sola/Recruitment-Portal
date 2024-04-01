import { createSlice } from '@reduxjs/toolkit';

export const  user = createSlice({
  name: 'user',
  initialState: {
    value: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setUser } =  user.actions;
export default  user.reducer;