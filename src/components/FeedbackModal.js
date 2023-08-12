import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form,Row,Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers,updateCustomer } from '../store/customer-slice';
import { fetchSales } from '../store/sale-slice';
const token = localStorage.getItem('token');

function FeedbackModal(props) {

const [feedback,setFeedback]  = useState('');

useEffect(() => {

    let feedbackData = {...props.feedback};
    setFeedback(feedbackData)

}, [props])

    

  return (
    <>

      <Modal 
        show={props.show} 
        onHide={props.hideFeedbackModal}
        size="lg"
        >
        <Form>

        <Modal.Header closeButton>
          <Modal.Title>Feedback Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            

            <Form.Group className="mb-3">
                <Form.Label>ID</Form.Label>
                <Form.Control name="name" value={feedback?.id || ''}  disabled/>
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Customer</Form.Label>
                <Form.Control type="text" name="total_amount" value={feedback.Customer ? feedback.Customer.name : ''} disabled/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Feedback</Form.Label>
                <Form.Control type="text" name="total_amount" value={feedback.text || ''} disabled/>
            </Form.Group>
           
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ () => props.hideFeedbackModal()}>
            Close
          </Button>
   
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default FeedbackModal;