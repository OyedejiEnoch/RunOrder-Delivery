import React, {  useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {clearErrors, deleteCafeteriaForm} from "../../action/doublePortionActions"
import { DELETE_FORM_RESET } from "../../constants/doublePortionConstants";
import 'animate.css';


const DoublePortionDisplay = ({forms}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { error: deleteError, isDeleted } = useSelector(state => state.doublePortion)

    const deleteFormHandler = (id) => {
        dispatch(deleteCafeteriaForm(id))
    }


    useEffect(() => {
        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors())
        }
        if (isDeleted) {
            toast.success("Order Form deleted");
            navigate("/admin/doublePortionForm")
            dispatch({ type: DELETE_FORM_RESET })
        }
    }, [dispatch, deleteError, isDeleted])



  return (
    <div>
      
      <div className="agentsFormDisplay animate__animated animate__fadeInUp  ">
                <div className="agentsFormText">
                <h2><span>Name: </span> {forms.name} </h2>
                <h2><span>Price:</span> <i className="fa-solid fa-naira-sign"></i>{forms.price} </h2>
                <h2><span>Attendant:</span> {forms.attendant} </h2>
               
                <button style={{border:"none"}} className=" py-1 px-2 ms-2" onClick={() => deleteFormHandler(forms._id)}>
                    <i style={{color:"red"}} className="fa-sharp fa-solid fa-trash"></i>
                </button>
            </div>
        </div>

    </div>
  )
}

export default DoublePortionDisplay
