import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserModel from '../../model/UserModel';

export interface AuthState {
  user?: UserModel;
}

const initialState: AuthState = {
  user: undefined,
};

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    _signIn(state, action: PayloadAction<AuthState>) {
      return action.payload;
    },
    _signOut() {
      return initialState;
    },
  },
});

export const { _signIn, _signOut } = authSlice.actions;
export default authSlice.reducer;
