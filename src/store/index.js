import { configureStore } from '@reduxjs/toolkit';

import bookSlice from './book-slice';
import customerSlice from './customer-slice';

const store = configureStore({
  reducer: { 
    book: bookSlice.reducer,
    customer:customerSlice.reducer},
});

export default store;
