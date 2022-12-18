import { useAppDispatch, useAppSelector } from '../store/store';
import { _loadAll, _savePost } from '../store/slice/postSlice';
import { ApartDetailModel } from '../model/ApartDetailModel';

export default function usePost() {
  const dispatch = useAppDispatch();
  const postState = useAppSelector((state) => state.post);

  return {
    // pushFakePost(post: FakeApartModel) {
    //   dispatch(_pushFakePost(post))
    // },
    loadAll() {
      dispatch(_loadAll);
    },
    savePost(newPost: ApartDetailModel) {
      dispatch(_savePost(newPost));
    },
    ...postState,
  };
}
