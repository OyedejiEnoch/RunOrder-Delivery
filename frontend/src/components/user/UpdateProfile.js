import React, { Fragment, useState, useEffect } from "react";


import MetaData from "../layout/MetaData";
import { updateProfile, loadUser, clearErrors } from "../../action/userActions"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";


function UpdateProfile() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    // const [avatar, setAvatar] = useState("")

    // const [avatarPreview, setAvatarPreview] = useState("/images/default_user.png")


    let navigate = useNavigate()


    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)
    const { error, isUpdated, loading } = useSelector(state => state.user)
    useEffect(() => {

        if (user) {
            setName(user.name);
            setEmail(user.email);
            // setAvatarPreview(user.avatar.url);

        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success("Updated successfully")
            dispatch(loadUser());

            navigate("/me")

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }


    }, [dispatch, error, navigate, isUpdated])

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);

        // formData.set('avatar', avatar);

        dispatch(updateProfile(formData))
    }

    // function onChange(e) {
    //     const reader = new FileReader();

    //     reader.onload = () => {
    //         if (reader.readyState === 2) {
    //             setAvatarPreview(reader.result)
    //             setAvatar(reader.result)
    //         }
    //     }

    //     reader.readAsDataURL(e.target.files[0])


    // }

    function handleChange(e) {
        setName(e.target.value)
    }

    function handleEmail(e) {
        setEmail(e.target.value)
    }

    return (
        <Fragment>
            <MetaData title={"Update Profile"} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={handleSubmit} encType='multipart/form-data'>
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={handleChange}
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
                                onChange={handleEmail}
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
                                        accept="image/*"
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div> */}

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3"
                            disabled={loading ? true : false} >Update</button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdateProfile;