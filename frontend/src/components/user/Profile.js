import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import 'animate.css';
import "./Profile.css"

const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'My Profile'} />

                    <h2 className="mt-5 ms-5">My Profile</h2>
                    <div className="  mt-5 user-info profileBody animate__animated animate__fadeIn">
                        <div className='profileImg'>
                        <img src='./images/profile.svg' />
                        </div>
                     
                        <div className="profileInfo">
                            <div className="profileDetails">
                            <h4>Full Name</h4>
                            <p>{user.name}</p>
                            </div>

                            <div className="profileDetails">
                            <h4>Email Address</h4>
                            <p>{user.email}</p>
                            </div>

                            <div className="profileDetails">
                            <h4>Joined On</h4>
                            <p>{String(user.createdAt).substring(0, 10)}</p>
                            </div>


                            <div >
                         
                            </div>

                            
                        </div>
                        <div className='profileButtons'>

                               {/* {user.role !== 'admin' && user.role !== 'agent' && user.role !== 'team' && ( */}
                                <Link to="/orders/me" className="btn btn-block ">
                                    My Orders
                                </Link>
                            {/* )} */}
                        
                            <Link to="/password/update" className="btn btn-block">
                                Change Password
                            </Link>
                         

                        <Link to="/me/update" id="edit_profile" className="btn btn-block ">
                                Edit Profile
                            </Link>
                            </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile