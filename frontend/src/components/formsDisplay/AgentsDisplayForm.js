import React, {  useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {clearErrors, deleteAgentForm} from "../../action/agentOrderForm"
import { DELETE_AGENTSORDER_RESET } from "../../constants/agentOrderForm";
import 'animate.css';


const AgentsDisplayForm = ({agents}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { error: deleteError, isDeleted } = useSelector(state => state.agent)

    const deleteFormHandler = (id) => {
        dispatch(deleteAgentForm(id))
    }


    useEffect(() => {
        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors())
        }
        if (isDeleted) {
            toast.success("Order Form deleted");
            navigate("/admin/agentsForm")
            dispatch({ type: DELETE_AGENTSORDER_RESET })
        }
    }, [dispatch, deleteError, isDeleted])


  return (
    <div>
       <div className="agentsFormDisplay animate__animated animate__fadeInUp">
                <div className="agentsFormText">
                <h2><span>Name: </span> {agents.name} </h2>
                <h2><span>Cafeteria:</span> {agents.cafeteria} </h2>
                <h2><span>Customer:</span> {agents.customer} </h2>
                <h2><span>Price:</span> <i class="fa-solid fa-naira-sign"></i>{agents.price} </h2>
                <button style={{border:"none"}} className=" py-1 px-2 ms-2" onClick={() => deleteFormHandler(agents._id)}>
                    <i style={{color:"red"}} className="fa-sharp fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    </div>
  )
}

export default AgentsDisplayForm
