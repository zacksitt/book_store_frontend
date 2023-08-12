import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { API_URL } from '../config';

const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    customers: [],
    place_id:0,
    notification:{}
  },
  reducers: {
    
    setCustomers(state,action){
        state.customers = action.payload.customers;
    },
    setNotification(state,action){
      state.notification = action.payload;
  },
  }
})

export const fetchCustomers = (token) => {
    let headers = {

        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
    }
    console.log("fetch customers");
    return async (dispatch) => {
        const fetch = async () => {
            let response = await axios.get(API_URL + "/api/auth/customers",{headers});
            console.log("response",response);
            return response.data;
        }

        let customers = await fetch();
        
        dispatch(customerAction.setCustomers(customers))
    }
}
export const deleteCustomer = (id,token) => {
    let headers = {

        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
    }
    
    return async (dispatch) => {
      const deleteData = async () => {
          let response = await axios.delete(API_URL + "/api/auth/customer/" + id,{headers});
          return response.data;
      }
      await deleteData();
      dispatch(fetchCustomers(token));
      
      dispatch(customerAction.setNotification({
        "message":"Deleted customer successfully.",
        "variant":"danger"
      }))
  
    }
  }
export const updateCustomer = (customer,token) => {

    let headers = {

        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
    }
  return async (dispatch) => {
      const update = async () => {
          let response;
          if(customer.id)
            response = await axios.put(API_URL + "/api/auth/customer",customer,{headers});
          else
            response = await axios.post(API_URL + "/api/auth/customer",customer,{headers});
          
          return response.data;
      }
      let response = await update();

      if(customer.id){
        // dispatch(customerAction.setPlaces(response))
        dispatch(fetchCustomers(token));
        dispatch(customerAction.setNotification({
          "message":"Updated customer successfully.",
          "variant":"primary"
        }))
      }


  }
}
export const customerAction = customerSlice.actions;

export default customerSlice;