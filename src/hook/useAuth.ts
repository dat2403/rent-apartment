import { useAppDispatch, useAppSelector } from '../store/store';
import {
  _saveNewProfile,
  _signIn,
  _signOut,
  AuthState,
} from '../store/slice/authSlide';
import UserModel from '../model/UserModel';

export default function useAuth() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.authentication);

  return {
    signIn(auth: AuthState) {
      dispatch(_signIn(auth));
    },
    signOut() {
      dispatch(_signOut());
    },
    saveNewProfile(newInfo: UserModel) {
      dispatch(
        _saveNewProfile({
          ...authState.user,
          ...newInfo,
        })
      );
    },
    ...authState,
  };
}
