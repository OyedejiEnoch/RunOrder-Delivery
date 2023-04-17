import React, { Fragment, useState, useEffect } from "react";


import MetaData from "../layout/MetaData";
import { register, clearErrors } from "../../action/userActions"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function Register() {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState("")

    const [avatarPreview, setAvatarPreview] = useState("/images/default_user.png")


    let navigate = useNavigate()


    const dispatch = useDispatch()

    const { isAunthenticated, error, loading } = useSelector(state => state.auth)

    useEffect(() => {

        if (isAunthenticated) {
            navigate("/")
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, isAunthenticated, error, navigate])

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        // formData.set('avatar', avatar);

        dispatch(register(formData))
    }

    function onChange(e) {

    setUser((prevValue)=>{
        return { ...prevValue, [e.target.name]: e.target.value }
    })
        
    }

    return (
        <Fragment>

            <MetaData title={'Register User'} />

            <div className="row wrapper">
                <div className="col-lg-6">
                    <img src="./images/undraw_hello_re_3evm.svg" width="80%" />
                </div>
                <div className="col-lg-6 col-lg-5">
                    <form className="shadow-lg" onSubmit={handleSubmit} encType='multipart/form-data'>
                        <h1 className="mb-3">Register</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name='password'
                                value={password}
                                onChange={onChange}
                            />
                        </div>

                        {/* <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept="iamges/*"
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div> */}

                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            REGISTER
                        </button>
                    </form>
                </div>
            </div>

        </Fragment>

    )
}

export default Register