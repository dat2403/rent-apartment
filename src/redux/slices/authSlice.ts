import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginAPI } from '../../api/auth';

export interface User {
  name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  role: string | null;
  status: boolean | null;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    signOut(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    startLoading(state) {
      state.loading = true;
    },
    endLoading(state) {
      state.loading = false;
    },
  },
});

export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthState }) =>
  state.auth.loading;

export const { signIn, signOut, startLoading, endLoading } = authSlice.actions;

export default authSlice.reducer;
