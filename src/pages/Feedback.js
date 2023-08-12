import { useEffect, useState } from "react";
import { useSelector,useDispatch } from 'react-redux';
import { fetchSales } from "../store/sale-slice";

import Nav from '../pages/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import Notification from "../components/Notification"
import FeedbackModal from "../components/FeedbackModal";
import { fetchFeedbacks } from "../store/feedback-slice";

const Feedback = () => {

    const dispatch = useDispatch();
    const sales   = useSelector( (state) => state.feedback.feedbacks)
    const [showModal,setModalData] = useState(false);
    const [feedback,setFeedback] = useState({});
    const [columns,setColumns] = useState();
    const [showAlert,setShowAlert] = useState(false)
    const notification = useSelector((state) => state.feedback.notification)
    const token = localStorage.getItem('token');

    useEffect(() => {

        dispatch(fetchFeedbacks(token))
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
                name: 'Feedback',
                selector: row => row.text,
            },
            
            {
                name: 'Time',
                selector: row => new Date(row.createdAt).toLocaleDateString(),
            },{
                name:'',
                selector: row => <div> <a className="btn btn-primary mx-auto ml-2" onClick={ () => showFeedbackModal(row)}>Detail</a> 
                                 </div>
            }
        ])
    },[dispatch]);

    const showFeedbackModal = (feedback) => {
        setModalData(true)
        setFeedback(feedback)
    }

    const hideFeedbackModal = () => {
        setModalData(false);
    }

    const showWarningAlert = (feedback) => {
        setShowAlert(true);
        setFeedback(feedback);
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
                Feedbacks
            </h2>
            <DataTable
                defaultSortFieldId={2}
                pagination
                columns={columns}
                data={sales}
            />
            <FeedbackModal show={showModal} hideFeedbackModal={hideFeedbackModal} feedback={feedback}></FeedbackModal>
            {/* <AlertWarningModal show={showAlert} hideWarningAlert={hideWarningAlert} data={sale}></AlertWarningModal> */}

            </div>
        </div>
      );
};
  
export default Feedback;