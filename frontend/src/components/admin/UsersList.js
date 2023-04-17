import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import { allUsers, clearErrors, deleteUser } from "../../action/userActions";
import Sidebar from "./Sidebar";
import { DELETE_USER_RESET, } from "../../constants/userConstants";



function UserList() {


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, error, users } = useSelector(state => state.allUsers);
    const { isDeleted } = useSelector(state => state.user)



    useEffect(() => {
        dispatch(allUsers());

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            toast.success("User deleted successfully");
            navigate("/admin/users")
            dispatch({ type: DELETE_USER_RESET, })
        }
    }, [dispatch, error, isDeleted])

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

    function setUsers() {
        const data = {
            columns: [

                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                // {
                //     label: 'Role',
                //     field: 'role',
                //     sort: 'asc'
                // },
                {
                    label: 'Actions',
                    field: 'actions',

                },
            ],
            rows: []
        }

        users.forEach(user => {
            data.rows.push({
                name: user.name,
                email: user.email,
                // role: user.role,

                actions: <Fragment>
                    <Link to={`/admin/user/${user._id}`} style={{textDecoration:"none"}} className="py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button style={{border:"none"}} className="py-1 px-2 ml-2" onClick={() => deleteUserHandler(user._id)}>
                    <i style={{color:"red"}} className="fa-sharp fa-solid fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data
    }



    return (
        <Fragment>
            <MetaData title={"All Users"} />
            <div className="row">
            <div className="col-12 col-md-2">
                    <div className="sideBar">
                        <Sidebar />
                     </div>
                <div className="sideBarMenu">
                    <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><i className="fa-solid fa-bars"></i></button>

                 <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                    <div className="offcanvas-header">
                     <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Offcanvas with body scrolling</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                
                    </div>
                 <div className="offcanvas-body">
                 <Sidebar />
                 </div>
            </div>

            </div>

                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Users</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setUsers()}
                                className="px-3 productsTable"
                                hover
                            />
                        )}

                    </Fragment>
                </div>

            </div>
        </Fragment>
    )
}



export default UserList;