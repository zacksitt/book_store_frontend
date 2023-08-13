import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form,Row,Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers,updateCustomer } from '../store/customer-slice';
import { fetchSales } from '../store/sale-slice';
const token = localStorage.getItem('token');

function SaleModal(props) {

  const [sale,setSale]  = useState('');
  const sale_id = useSelector(state => state.sale.sale_id);
  const customers = useSelector((state) => state.sale.sales)
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchSales());
  },[dispatch])


    useEffect(() => {

      let saleData = {...props.sale};
      saleData.name = props.sale.name || '';
      saleData.email = props.sale.email || '';
      setSale(saleData)

    }, [props])

    

  return (
    <>

      <Modal 
        show={props.show} 
        onHide={props.hideSaleModal}
        size="lg"
        >
        <Form>

        <Modal.Header closeButton>
          <Modal.Title>Sale detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            

            <Form.Group className="mb-3">
                <Form.Label>ID</Form.Label>
                <Form.Control name="name" value={sale?.id || ''}  disabled/>
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Customer</Form.Label>
                <Form.Control type="text" name="total_amount" value={sale.Customer ? sale.Customer.name : ''} disabled/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Total Amount</Form.Label>
                <Form.Control type="text" name="total_amount" value={sale.total_amount || ''} disabled/>
            </Form.Group>
           
            <Form.Group className="mb-3">
                <Form.Label>Books</Form.Label>
                <Row className='row'>
                {
                    sale.sale_details && sale.sale_details.map((sale, index) => (
                        <Col className='col-md-2'>
                            <img width="100px" height="100px" src={sale.Book ? sale.Book.cover : ''} className="p-2"/>
                            <p> {sale.Book ? sale.Book.name : ''} </p>
                        </Col>
                ))}
                    
                    
                </Row>
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ () => props.hideSaleModal()}>
            Close
          </Button>
 
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default SaleModal;