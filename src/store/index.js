import { configureStore } from '@reduxjs/toolkit';

import bookSlice from './book-slice';
import customerSlice from './customer-slice';
import SaleSlice from './sale-slice';
import FeedbackSlice from './feedback-slice';

const store = configureStore({
  reducer: { 
    book: bookSlice.reducer,
    customer:customerSlice.reducer,
    sale:SaleSlice.reducer,
    feedback:FeedbackSlice.reducer
  },
    
});

export default store;
