import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form,Row,Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers,updateCustomer } from '../store/customer-slice';
const token = localStorage.getItem('token');

function CustomerModal(props) {

  const [customer,setCustomer]  = useState('');
  const customer_id = useSelector(state => state.customer.customer_id);
  const customers = useSelector((state) => state.customer.customers)
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchCustomers());
  },[dispatch])


    useEffect(() => {

      let customerData = {...props.customer};
      customerData.name = props.customer.name || '';
      customerData.email = props.customer.email || '';
      setCustomer(customerData)

    }, [props])

    
    const handleChange = e => {
        const { name, value } = e.target;
        setCustomer(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {

      e.preventDefault();
      let customerData = {...customer};
      dispatch(updateCustomer(customerData,token));
      props.hideCustomerModal();

    }

  return (
    <>

      <Modal 
        show={props.show} 
        onHide={props.hideCustomerModal}
        size="lg"
        >
        <Form 
            onSubmit={handleSubmit}
            >

        <Modal.Header closeButton>
          <Modal.Title>Customer Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            

            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" value={customer?.name || ''}  onChange={(e) => handleChange(e)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={customer.email || ''}  onChange={(e) => handleChange(e)}  required/>
            </Form.Group>
           
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ () => props.hideCustomerModal()}>
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

export default CustomerModal;