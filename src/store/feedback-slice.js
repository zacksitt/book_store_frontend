import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { API_URL } from '../config';

const FeedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    feedbacks: [],
    feedback_id:0,
    notification:{}
  },
  reducers: {
    
    setFeedbacks(state,action){
        state.feedbacks = action.payload.feedbacks;
    },
    setNotification(state,action){
      state.notification = action.payload;
  },
  }
})

export const fetchFeedbacks = (token) => {
    let headers = {

        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
    }
    return async (dispatch) => {
        const fetch = async () => {
            let response = await axios.get(API_URL + "/api/auth/feedbacks",{headers});
            return response.data;
        }

        let feedbacks = await fetch();
        
        dispatch(feedbackAction.setFeedbacks(feedbacks))
    }
}

export const feedbackAction = FeedbackSlice.actions;

export default FeedbackSlice;