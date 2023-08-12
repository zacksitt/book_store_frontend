import { useEffect, useState } from "react";
import { useSelector,useDispatch } from 'react-redux';
import { deleteBook,updateBook, fetchBooks, fetchAuthors } from "../store/book-slice";

import { Table } from "react-bootstrap"
import Nav from '../pages/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiFillCheckCircle } from "react-icons/ai";
import DataTable from 'react-data-table-component';
import AlertWarningModal from "../components/AlertWarningModal";
import Notification from "../components/Notification"
import BookModal from "../components/BookModal";

const Book = () => {

    const dispatch = useDispatch();
    const books   = useSelector( (state) => state.book.books)
    const [showModal,setModalData] = useState(false);
    const [book,setBook] = useState({});
    const [columns,setColumns] = useState();
    const [showAlert,setShowAlert] = useState(false)
    const notification = useSelector((state) => state.book.notification)
    const token = localStorage.getItem('token');

    useEffect(() => {

        console.log("use Effect");
        
        dispatch(fetchBooks(token))
        // dispatch(fetchAuthors(token))
        setColumns([
            {
                name: 'Cover',
                width:'15%',
                selector: row => <img width="75px" alt={row.name} src={row.cover} className="p-2"/>,
            },
            {
                name: 'ID',
                selector: row => row.id,
            },
            {
                name: 'Name',
                selector: row => row.name,
            },
            {
                name: 'Author',
                selector: row => row.Author.name,
            },
            {
                name: 'Price',
                selector: row => row.price,
            },
            {
                name: 'Created At',
                selector: row => new Date(row.createdAt).toLocaleDateString(),
            },{
                name:'',
                selector: row => <div> <a className="btn btn-primary mx-auto ml-2" onClick={ () => showBookModal(row)}>Edit</a> 
                                        <a className="btn btn-danger" onClick={() => showWarningAlert(row)}>Delete</a>
                                 </div>
            }
        ])
    },[dispatch]);

    const showBookModal = (book) => {
        setModalData(true)
        setBook(book)
    }

    const hideBookModal = () => {
        setModalData(false);
    }

    const showWarningAlert = (book) => {
        setShowAlert(true);
        setBook(book);
    }

    const hideWarningAlert = () => {
        setShowAlert(false);
    }
    const confirmDelete = (bookid) => {
        dispatch(deleteBook(bookid,token))
        setShowAlert(false);
    }

    return (
        <div>
            <Nav></Nav>   
            <div className="container">
            { notification.message && 
            <Notification
                message={notification.message}
                variant={notification.variant}
            >
            </Notification>}
            
            <h2 className="text-primary">
                Books
                <a className="m-2 btn btn-success" onClick={ () => showBookModal({})}>Add new</a>
            </h2>
            <DataTable
                defaultSortFieldId={2}
                pagination
                columns={columns}
                data={books}
            />
            <BookModal show={showModal} hideBookModal={hideBookModal} book={book}></BookModal>
            <AlertWarningModal show={showAlert} hideWarningAlert={hideWarningAlert} confirmDelete={confirmDelete} data={book}></AlertWarningModal>

            </div>
        </div>
      );
};
  
export default Book;