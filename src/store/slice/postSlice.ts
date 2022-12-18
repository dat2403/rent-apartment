import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApartDetailModel } from '../../model/ApartDetailModel';

export interface FakeApartModel {
  id: number;
  image: string;
  title: string;
  address: string;
  rating: number;
  price: string;
  total_rating: number;
  user_id: number;
  detail: string;
}

function genFakeApartList() {
  let Data: FakeApartModel[] = [];
  for (let i = 1; i < 100; i++) {
    Data.push({
      id: i + 100,
      image:
        'https://img5.thuthuatphanmem.vn/uploads/2022/01/13/logo-nha-ngoi_075713022.jpg',
      title: 'Apartment' + ' ' + i.toString(),
      address: 'DongDa, Hanoi, Viet Nam',
      rating: Math.ceil(Math.random() * 5),
      total_rating: 0,
      price: '1.000.000',
      user_id: i,
      detail: 'Nha chung cu',
    });
  }
  return Data;
}

export const FAKE_DATA: FakeApartModel[] = genFakeApartList();

export interface PostState {
  posts: ApartDetailModel[];
}

const initialState: PostState = {
  posts: [],
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    // _pushFakePost(state, action: PayloadAction<FakeApartModel>) {
    //   const newPost = action.payload
    //   state.posts.unshift(newPost)
    // },
    _loadAll(state) {
      return state;
    },
    _savePost(state, action: PayloadAction<ApartDetailModel>) {
      state.posts.unshift(action.payload);
    },
  },
});

export const { _loadAll, _savePost } = postSlice.actions;
export default postSlice.reducer;
