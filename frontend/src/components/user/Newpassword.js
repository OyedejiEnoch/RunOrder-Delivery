import React, { Fragment, useState, useEffect } from "react";


import MetaData from "../layout/MetaData";
import { resetPassword, loadUser, clearErrors } from "../../action/userActions"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";


function Newpassword() {

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    let navigate = useNavigate()
    const dispatch = useDispatch()
    let params = useParams()


    const { error, success } = useSelector(state => state.forgotPassword)
    useEffect(() => {


        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            toast.success("Password updated successfully")
            navigate("/login")
        }


    }, [dispatch, error, success, navigate])


    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);


        dispatch(resetPassword(params.token, formData))
    }





    return (
        <Fragment>
            <MetaData title={"New password reset"} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={handleSubmit}>
                        <h1 className="mb-3">New Password</h1>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm_password_field">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password_field"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button
                            id="new_password_button"
                            type="submit"
                            className="btn btn-block py-3">
                            Set Password
                        </button>

                    </form>
                </div>
            </div>

        </Fragment>
    )
}




export default Newpassword;