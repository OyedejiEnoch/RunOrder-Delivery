import React, { Fragment, useState, useEffect } from "react";


import MetaData from "../layout/MetaData";
import { forgotPassword, loadUser, clearErrors } from "../../action/userActions"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function ForgotPassword() {


    const [email, setEmail] = useState("")

    let navigate = useNavigate()
    const dispatch = useDispatch()


    const { error, message, loading } = useSelector(state => state.forgotPassword)
    useEffect(() => {


        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            toast.success(message)
        }


    }, [dispatch, error, message])


    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.set('email', email);


        dispatch(forgotPassword(formData))
    }


    return (
        <Fragment>
            <MetaData title={"Forgot Password"} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={handleSubmit}>
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}>
                            Send Email
                        </button>

                    </form>
                </div>
            </div>

        </Fragment>
    )
}


export default ForgotPassword;