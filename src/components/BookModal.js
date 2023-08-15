import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthors, fetchBooks,updateBook } from '../store/book-slice';
import Select from 'react-select'
let file = '';
const token = localStorage.getItem('token');

function BookModal(props) {

  const [book,setBook]  = useState('');
  const [author,setAuthor] = useState('')
  const [coverPreviewUrl,setCoverPreviewUlr] = useState('')
  const book_id = useSelector(state => state.book.book_id);
  const books = useSelector((state) => state.book.books)
  const authors = useSelector((state) => state.book.authors)
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchBooks(token));
    dispatch(fetchAuthors(token))

  },[dispatch,token])

    useEffect(() => {
      
      let bookData = {...props.book};
      setCoverPreviewUlr(bookData.cover);
      if(bookData.Author){
          setAuthor({
            label:bookData?.Author.name,
            value: bookData?.Author.id
          })
      }
      
      setBook(bookData)

    }, [props])

    
    const handleChange = e => {
        const { name, value } = e.target;

        setBook(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {

      e.preventDefault();
      let bookData = {...book};
      console.log("file",file);
      bookData.author_id = author.value;
      dispatch(updateBook(bookData,file,token));
      props.hideBookModal();
      setCoverPreviewUlr('')
    //   if(place.id && file != ''){
    //     dispatch(uploadImage(file,place.id))
    //   }
    }

    const onChangedAuthor = (e) => {
        setAuthor(e);
    }

    const onFileChange = (e) => {

      setCoverPreviewUlr(URL.createObjectURL(e.target.files[0]))
      file = e.target.files[0];
      console.log("file",file);

    }
  return (
    <>

      <Modal 
        show={props.show} 
        onHide={props.hideBookModal}
        size="lg"
        >
        <Form 
            onSubmit={handleSubmit}
            >

        <Modal.Header closeButton>
          <Modal.Title> { props.book.id ? "Edit book" : "Create new book"} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            { coverPreviewUrl &&
              <Form.Group className="mb-3 text-center">
                <img src={coverPreviewUrl} width={150}></img>
              </Form.Group>
            }

            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" value={book?.name || ''}  onChange={(e) => handleChange(e)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" name="price" value={book.price || ''}  onChange={(e) => handleChange(e)}  required/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Author</Form.Label>

                 
                <Select
                    {...props}
                    value = {author}
                    as="select"
                    options = {authors}
                    onChange={(e) => {onChangedAuthor(e)}}
                    >
                    
                </Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Cover</Form.Label>
                {
                  book.id ? (
                    <Form.Control  type="file" name="file" onChange={(e) => onFileChange(e)}/>
                  ) : (
                    <Form.Control  type="file" name="file" onChange={(e) => onFileChange(e)} required/>
                  )
                }
                
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.hideBookModal()}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default BookModal;