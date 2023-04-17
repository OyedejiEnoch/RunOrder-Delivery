import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css"


function Search() {

    let navigate = useNavigate()
    const [keyword, setKeyWord] = useState("")


    function handleChange(event) {
        setKeyWord(event.target.value)
    }

    function searchHandler(e) {
        e.preventDefault()

        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate("/")
        }
    }



    return (

        <form onSubmit={searchHandler}>
            <div className="input-group search">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Enter Product Name ..."
                    onChange={handleChange}
                    value={keyword}
                />
                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </form>

    )
}

export default Search;