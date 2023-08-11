import { useEffect, useState } from "react";
import { useSelector,useDispatch } from 'react-redux';
import { deleteCustomer, fetchCustomers } from "../store/customer-slice";

import Nav from '../pages/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiFillCheckCircle } from "react-icons/ai";
import DataTable from 'react-data-table-component';
import AlertWarningModal from "../components/AlertWarningModal";
import Notification from "../components/Notification"
import CustomerModal from "../components/CustomerModal";

const Customer = () => {

    const dispatch = useDispatch();
    const customers   = useSelector( (state) => state.customer.customers)
    const [showModal,setModalData] = useState(false);
    const [customer,setCustomer] = useState({});
    const [columns,setColumns] = useState();
    const [showAlert,setShowAlert] = useState(false)
    const notification = useSelector((state) => state.customer.notification)
    const token = localStorage.getItem('token');

    useEffect(() => {

        console.log("use Effect");
        
        dispatch(fetchCustomers(token))
        setColumns([
            {
                name: 'ID',
                selector: row => row.id,
            },
            {
                name: 'Name',
                selector: row => row.name,
            },
            {
                name: 'Email',
                selector: row => row.email,
            },
            {
                name: 'Joined at',
                selector: row => row.createdAt,
            },{
                name:'',
                selector: row => <div> <a className="btn btn-primary mx-auto ml-2" onClick={ () => showCustomerModal(row)}>Edit</a> 
                                        <a className="btn btn-danger" onClick={() => showWarningAlert(row)}>Delete</a>
                                 </div>
            }
        ])
    },[dispatch]);

    const showCustomerModal = (customer) => {
        setModalData(true)
        setCustomer(customer)
    }

    const hideCustomerModal = () => {
        setModalData(false);
    }

    const showWarningAlert = (customer) => {
        setShowAlert(true);
        setCustomer(customer);
    }

    const hideWarningAlert = () => {
        setShowAlert(false);
    }
    const confirmDelete = (customerid) => {
        dispatch(deleteCustomer(customerid,token))
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
                Customers
                {/* <a className="m-2 btn btn-success" onClick={ () => showPlaceModal({})}>Add new</a> */}
            </h2>
            <DataTable
                defaultSortFieldId={2}
                pagination
                columns={columns}
                data={customers}
            />
            <CustomerModal show={showModal} hideCustomerModal={hideCustomerModal} customer={customer}></CustomerModal>
            <AlertWarningModal show={showAlert} hideWarningAlert={hideWarningAlert} confirmDelete={confirmDelete} data={customer}></AlertWarningModal>

            </div>
        </div>
      );
};
  
export default Customer;