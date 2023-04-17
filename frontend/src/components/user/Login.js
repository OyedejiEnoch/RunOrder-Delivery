import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation, useNavigate, } from "react-router-dom"
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { login, clearErrors } from "../../action/userActions"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function Login() {
    let navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let location = useLocation()

    const dispatch = useDispatch()

    const { isAunthenticated, error, loading } = useSelector(state => state.auth)

    let redirect = location.search ? location.search.split("=")[1] : "/"

    useEffect(() => {

        if (isAunthenticated) {
            navigate(redirect)
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, isAunthenticated, error, navigate])

    function handleEmail(event) {
        setEmail(event.target.value)
    }
    function handlePassword(event) {
        setPassword(event.target.value)
    }

    function handleSubmit(event) {

        event.preventDefault();
        dispatch(login(email, password))
    }



    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={"Login"} />

                    <div className="row wrapper">
                        <div className="col-lg-6">
                            <img src="./images/undraw_access_account_re_8spm.svg" width="80%" />
                        </div>
                        <div className="col-lg-6 col-lg-5">
                            <form className="shadow-lg" onSubmit={handleSubmit}>
                                <h1 className="mb-3">Login</h1>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={handleEmail}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password_field">Password</label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        value={password}
                                        onChange={handlePassword}
                                    />
                                </div>

                                <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>

                                {/* <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3">
                                    LOGIN
                                </button> */}
                                <div class="d-grid gap-2">
                                    <button id="login_button" className="btn btn-primary" type="submit">Login</button>
                                </div>

                                <Link to="/register" className="float-right mt-3">New User?</Link>
                            </form>
                        </div>
                    </div>

                </Fragment>
            )}
        </Fragment>
    )
}

export default Login