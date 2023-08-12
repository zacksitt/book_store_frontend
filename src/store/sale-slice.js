import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { API_URL } from '../config';

const SaleSlice = createSlice({
  name: 'sale',
  initialState: {
    sales: [],
    sale_id:0,
    notification:{}
  },
  reducers: {
    
    setSales(state,action){
        state.sales = action.payload.sales;
    },
    setNotification(state,action){
      state.notification = action.payload;
  },
  }
})

export const fetchSales = (token) => {
    let headers = {

        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
    }
    return async (dispatch) => {
        const fetch = async () => {
            let response = await axios.get(API_URL + "/api/auth/sales",{headers});
            return response.data;
        }

        let sales = await fetch();
        
        dispatch(saleAction.setSales(sales))
    }
}

export const saleAction = SaleSlice.actions;

export default SaleSlice;