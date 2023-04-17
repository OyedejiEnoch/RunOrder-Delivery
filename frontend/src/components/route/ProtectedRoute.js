import React, {  useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../action/userActions";


function ProtectedRoute({ children, isAdmin }) {

    const { isAunthenticated = false, loading = true, user } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            dispatch(loadUser())
        }
    }, [isAunthenticated, loading])

    if (loading) return <h1>loading...</h1>
    if (!loading && isAunthenticated) {
        if (isAdmin === true && user.role !== "admin" && user.role !== "team" && user.role !== "agents" && user.role !== "MannerPalace" && user.role !== "NationalKitchen"
        && user.role !== "DoublePortion" && user.role !== "Mimies" && user.role !== "Numbers" && user.role !== "DivineHands") {
            return <Navigate to="/" />
        }
        return children;
    } else {
        return <Navigate to={"/login"} />
    }
}


export default ProtectedRoute;