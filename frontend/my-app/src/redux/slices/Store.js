import { configureStore } from '@reduxjs/toolkit';

import Slice from './Slice';
const store = configureStore({
  reducer: {
    Items: Slice,
    rewardsCatalog: Slice,
    cart: Slice,
  },
});

export default store;
