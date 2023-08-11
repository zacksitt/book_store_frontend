import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { API_URL } from '../config';

const bookSlice = createSlice({
  name: 'book',
  initialState: {
    books: [],
    authors:[],
    book_id:0,
    notification:{}
  },
  reducers: {
    
    setBooks(state,action){
        state.books = action.payload.books;
    },
    addBook(state,action){
      state.books.push(action.payload.book);
      
    },
    setBookId(state,action){
      state.book_id = action.payload;
    },
    setNotification(state,action){
        state.notification = action.payload;
    },
    setAuthors(state,action){
        state.authors = action.payload
    }
  }
})

export const fetchBooks = (token) => {
    
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
    }
    return async (dispatch) => {
        const fetch = async () => {
            let response = await axios.get(API_URL + "/api/auth/books",{headers});
            return response.data;
        }
        let books = await fetch();
        
        dispatch(bookAction.setBooks(books))
    }
}

export const fetchAuthors = (token) => {
    
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
    }
    return async (dispatch) => {
        const fetch = async () => {
            let response = await axios.get(API_URL + "/api/auth/authors",{headers});
            return response.data;
        }
        
        let data = await fetch();
        let authors = data.authors;
        let authorOptions = [];
        for (const author of authors) {
            authorOptions.push(
              {
                label:author.name,
                value:author.id
    
              }
            )
        }
        dispatch(bookAction.setAuthors(authorOptions))
    }
}

export const deleteBook = (id,token) => {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
    }
  return async (dispatch) => {
    const deleteData = async () => {
        let response = await axios.delete(API_URL + "/api/auth/book/" + id,{headers});
        return response.data;
    }
    await deleteData();
    dispatch(fetchBooks(token));
    
    dispatch(bookAction.setNotification({
      "message":"Deleted tour successfully.",
      "variant":"danger"
    }))

  }
}


export const updateBook = (book,file,token) => {

    let headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
    }
  return async (dispatch) => {
      const update = async () => {
          let response;
          const formData = new FormData();
          if(file){
            
            formData.append( 
                "file", 
                file, 
                file.name 
            );
          }
          formData.append("id",book.id);
          formData.append("name",book.name);
          formData.append("price",book.price);
          formData.append("author_id",book.author_id);
        
          if(book.id)
            response = await axios.put(API_URL + "/api/auth/book",formData,{headers});
          else
            response = await axios.post(API_URL + "/api/auth/book",formData,{headers});
          
          return response.data;
      }
      let response = await update();
      if(book.id){
        dispatch(fetchBooks(token))
        dispatch(bookAction.setNotification({
          "message":"Updated book successfully.",
          "variant":"primary"
        }))
      }
        
      else{
        // dispatch(placeAction.addPlace(response));
        // dispatch(placeAction.setPlaceId(response.place.id))
        // dispatch(tourAction.setNotification({
        //   "message":"Created new tour successfully.",
        //   "variant":"primary"
        // }))

        dispatch(bookAction.fetchBooks(token))
        dispatch(bookAction.setNotification({
          "message":"Created book successfully.",
          "variant":"primary"
        }))
      } 
        

  }
}
export const bookAction = bookSlice.actions;

export default bookSlice;