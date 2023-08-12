import { useEffect, useState } from "react";
import { useSelector,useDispatch } from 'react-redux';
import { fetchSales } from "../store/sale-slice";

import Nav from '../pages/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiFillCheckCircle } from "react-icons/ai";
import DataTable from 'react-data-table-component';
import AlertWarningModal from "../components/AlertWarningModal";
import Notification from "../components/Notification"
import CustomerModal from "../components/CustomerModal";
import SaleModal from "../components/SaleModal";

const Customer = () => {

    const dispatch = useDispatch();
    const sales   = useSelector( (state) => state.sale.sales)
    const [showModal,setModalData] = useState(false);
    const [sale,setSale] = useState({});
    const [columns,setColumns] = useState();
    const [showAlert,setShowAlert] = useState(false)
    const notification = useSelector((state) => state.customer.notification)
    const token = localStorage.getItem('token');

    useEffect(() => {

        dispatch(fetchSales(token))
        setColumns([
            {
                name: 'ID',
                selector: row => row.id,
            },
            {
                name: 'Customer',
                selector: row => row.Customer.name,
            },
            {
                name: 'Total Amount',
                selector: row => row.total_amount,
            },
            
            {
                name: 'Time',
                selector: row => new Date(row.createdAt).toLocaleDateString(),
            },{
                name:'',
                selector: row => <div> <a className="btn btn-primary mx-auto ml-2" onClick={ () => showSaleModal(row)}>Detail</a> 
                                 </div>
            }
        ])
    },[dispatch]);

    const showSaleModal = (sale) => {
        setModalData(true)
        setSale(sale)
    }

    const hideSaleModal = () => {
        setModalData(false);
    }

    const showWarningAlert = (sale) => {
        setShowAlert(true);
        setSale(sale);
    }

    const hideWarningAlert = () => {
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
                Sales
                {/* <a className="m-2 btn btn-success" onClick={ () => showPlaceModal({})}>Add new</a> */}
            </h2>
            <DataTable
                defaultSortFieldId={2}
                pagination
                columns={columns}
                data={sales}
            />
            <SaleModal show={showModal} hideSaleModal={hideSaleModal} sale={sale}></SaleModal>
            {/* <AlertWarningModal show={showAlert} hideWarningAlert={hideWarningAlert} data={sale}></AlertWarningModal> */}

            </div>
        </div>
      );
};
  
export default Customer;