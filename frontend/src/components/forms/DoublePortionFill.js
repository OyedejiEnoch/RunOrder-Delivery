import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {newCafeteriaForm, clearErrors} from "../../action/doublePortionActions"
import {NEW_FORM_REQUEST} from "../../constants/doublePortionConstants"

const DoublePortionFill = () => {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [attendant, setAttendant] = useState("");

  const dispatch = useDispatch()
  let navigate = useNavigate()

  const { loading, error, success } = useSelector(state => state.dpCafeteria);

  useEffect(() => {


      if (error) {
          toast.error(error);
          dispatch(clearErrors())
      }

      if (success) {
          navigate("/admin/doublePortion")
          toast.success("Order Noted Pls refresh the page")
          dispatch({ type: NEW_FORM_REQUEST })
      }
  }, [dispatch, error, success])


  function handleSubmit(event) {
      event.preventDefault();

      const formData = new FormData();
      formData.set('name', name);
      formData.set('price', price);
      formData.set('attendant', attendant);

      dispatch(newCafeteriaForm(formData))
  }



  return (
    <Fragment>
      
      <form className=" cafeteriaFormFill" encType='multipart/form-data' onSubmit={handleSubmit}>
                        <h2 className="mt-2 mb-5">Order details</h2>

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
                            <label htmlFor="price">Price</label>
                            <input
                                type="name"
                                id="price"
                                className="form-control"
                                name='price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Customer">Name of Attendant</label>
                            <input
                                type="name"
                                id="Customer"
                                className="form-control"
                                name='customer'
                                value={attendant}
                                onChange={(e) =>setAttendant(e.target.value)}
                            />
                        </div>
                      

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3"
                            disabled={loading ? true : false} >Update</button>
                    </form>


    </Fragment>
  )
}

export default DoublePortionFill
