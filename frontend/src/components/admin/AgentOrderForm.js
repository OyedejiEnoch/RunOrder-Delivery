import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {newAgentForm, clearErrors} from "../../action/agentOrderForm"
import {NEW_AGENTSORDER_REQUEST} from "../../constants/agentOrderForm"

const AgentOrderForm = () => {

    const [name, setName] = useState("");
    const [cafeteria, setCafeteria] = useState("");
    const [customer, setCustomer] = useState("");
    const [price, setPrice] = useState("");

    const dispatch = useDispatch()
    let navigate = useNavigate()

  
    const { loading, error, success } = useSelector(state => state.newAgentForm);

    useEffect(() => {


        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            // navigate(`/admin/order/${orders._id}`)
            toast.success("Order picked by you, Do RFRESH the page")
            dispatch({ type: NEW_AGENTSORDER_REQUEST })
        }
    }, [dispatch, error, success])


    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('cafeteria', cafeteria);
        formData.set('customer', customer);

        dispatch(newAgentForm(formData))
    }
    

  return (
    <div>
      

      <form className="shadow-lg agentFormFill" encType='multipart/form-data' onSubmit={handleSubmit}>
                        <h1 className="mt-2 mb-5">Agent details</h1>

                        <div className="form-group">
                            <label htmlFor="Name">Name</label>
                            <input
                                type="name"
                                id="Name"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cafeteria_field">Cafeteria</label>
                            <select
                                id="cafeteria_field"
                                className="form-control"
                                value={cafeteria}
                                onChange={(e) => setCafeteria(e.target.value)}
                                required
                            >


                                <option >Select.. </option>
                                <option >Manner Palace </option>
                                <option >Double Portion </option>
                                <option >National Kitchen</option>
                                <option >Mimies</option>
                                <option >Divine Hands</option>


                            </select>
                        </div>


                        <div className="form-group">
                            <label htmlFor="Customer">Name of Customer</label>
                            <input
                                type="name"
                                id="Customer"
                                className="form-control"
                                name='customer'
                                value={customer}
                                onChange={(e) => setCustomer(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Price">Price</label>
                            <input
                                type="number"
                                id="Price"
                                className="form-control"
                                name='price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-block mt-4 mb-3"
                            disabled={loading ? true : false} >Update</button>
                    </form>



    </div>
  )
}

export default AgentOrderForm
