import React, { Fragment, useState } from "react";
import { countries } from "countries-list";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import { saveShippingInfo } from "../../action/cartActions";
import { useNavigate } from "react-router-dom";

import CheckoutSteps from "./CheckoutSteps";
import { useEffect } from "react";

function Shipping() {
  let navigate = useNavigate();

  const countriesList = Object.values(countries);
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  //change to cafiteria
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [cafeteria, setCafeteria] = useState(shippingInfo.cafeteria);

  const dispatch = useDispatch();

  useEffect(() => {
    window.onload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(saveShippingInfo({ address, phoneNo, cafeteria }));
    navigate("/order/confirm");
  }
  // city postalCode
  return (
    <Fragment>
      <MetaData title={"Shipping info"} />
      <CheckoutSteps shipping />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mb-4" style={{ fontFamily: "Dancing Script" }}>
              Delivery Info
            </h1>
            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value={address}
                placeholder="girls hostel blk29 rm32"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/* <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div> */}

            <div className="form-group">
              <label htmlFor="phone_field">Phone No</label>
              <input
                type="phone"
                id="phone_field"
                className="form-control"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            {/* <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div> */}

            <div className="form-group">
              <label htmlFor="country_field">Cafeteria</label>
              <select
                id="country_field"
                className="form-control"
                value={cafeteria}
                onChange={(e) => setCafeteria(e.target.value)}
                required
              >
                <option>Select.. </option>
                {/* <option >Manner Palace </option> */}
                <option>Double Portion </option>
                <option>National Kitchen</option>
                <option>Mimi's</option>
                <option>Peace Park</option>
                {/* <option>Runsa Vendors</option> */}
              </select>
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="btn btn-block py-3"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Shipping;
