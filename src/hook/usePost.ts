import { useAppDispatch, useAppSelector } from '../store/store';
import {
  _loadAll,
  _pushFakePost,
  FakeApartModel,
} from '../store/slice/postSlice';

export default function usePost() {
  const dispatch = useAppDispatch();
  const postState = useAppSelector((state) => state.post);

  return {
    pushFakePost(post: FakeApartModel) {
      dispatch(_pushFakePost(post));
    },
    loadAll() {
      dispatch(_loadAll);
    },
    ...postState,
  };
}
