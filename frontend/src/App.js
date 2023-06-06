import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import ProductDetails from "./components/product/ProductDetails";
import DrinksDetails from "./components/product/DrinksDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { useSelector } from "react-redux";

import LandingPage from "./components/layout/LandingPage";

//profile and password details
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ProtectedRoute from "./components/route/ProtectedRoute";
import ForgotPassword from "./components/user/ForgotPassword";
import Newpassword from "./components/user/Newpassword";

//cart import
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Ordersuccess from "./components/cart/Ordersuccess";
// order import
import ListOrder from "./components/order/ListOrder";
import OrderDetails from "./components/order/OrderDetails";

//admin import
import Dashboard from "./components/admin/Dashbord";

import { loadUser } from "./action/userActions";
import store from "./store";
import ProductsList from "./components/admin/ProductsList";
import NewProduct from "./components/admin/NewProduct";
import DrinksList from "./components/admin/DrinksLists";
import NewDrinks from "./components/admin/NewDrinks";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrderList from "./components/admin/OrdersList";
import ProcessOrders from "./components/admin/ProcessOrders";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import AgentsForm from "./components/admin/AgentsForm";

import MannerForm from "./components/admin/MannerForm";
import NumbersForm from "./components/admin/NumbersForm";
import DoublePortionForm from "./components/admin/DoublePortionForm";
import NationalKitchenForm from "./components/admin/NationalKitchenForm";
import MimiesForm from "./components/admin/MimiesForm";
import DivineHandsForm from "./components/admin/DivineHandsForm";
import UpdateDrinks from "./components/admin/UpdateDrinks";
import DrinksHome from "./components/stores/Drinks";
import ToppingsDetails from "./components/product/ToppingsDetails";
import ToppingsHome from "./components/stores/Toppings";
import ToppingsList from "./components/admin/ToppingsList";
import NewToppings from "./components/admin/NewToppings";
import UpdateToppings from "./components/admin/UpdateToppings";
import FoodDetails from "./components/product/FoodDetails";
import FoodsHome from "./components/stores/Food";
import NewFood from "./components/admin/NewFood";
import FoodList from "./components/admin/FoodList";
import UpdateFood from "./components/admin/UpdateFood";

import PeaceParkDetails from "./components/product/PeaceParkDetails";
import PeaceParkHome from "./components/stores/PeacePark";
import NewPeacePark from "./components/admin/NewPeacePark";
import PeaceParkList from "./components/admin/PeaceParkList";
import UpdatePeacePark from "./components/admin/UpdatePeacePark";

// import { useEffect } from 'react';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const { user, loading } = useSelector((state) => state.auth);

  return (
    <Router>
      <div>
        <ToastContainer
          position="bottom-center"
          autoClose={4000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/home" element={<Home />} exact />
          <Route path="/drinks" element={<DrinksHome />} exact />
          <Route path="/toppings" element={<ToppingsHome />} exact />
          <Route path="/Foods" element={<FoodsHome />} exact />
          <Route path="/peacePark" element={<PeaceParkHome />} exact />
          <Route path="/search/:keyword" element={<Home />} />
        </Routes>
        <div className="container container-fluid homePage">
          <Routes>
            <Route path="/product/:id" element={<ProductDetails />} exact />
            <Route path="/drinks/:id" element={<DrinksDetails />} exact />
            <Route path="/toppings/:id" element={<ToppingsDetails />} exact />
            <Route path="/foods/:id" element={<FoodDetails />} exact />
            <Route path="/peacePark/:id" element={<PeaceParkDetails />} exact />

            <Route path="/cart" element={<Cart />} exact />
            <Route
              path="/shipping"
              element={
                <ProtectedRoute>
                  <Shipping />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order/confirm"
              element={
                <ProtectedRoute>
                  <ConfirmOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/success"
              element={
                <ProtectedRoute>
                  <Ordersuccess />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password/forgot" element={<ForgotPassword />} exact />
            <Route
              path="/password/reset/:token"
              element={<Newpassword />}
              exact
            />

            <Route
              path="/me"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
              exact
            />
            <Route
              path="/me/update"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
              exact
            />
            <Route
              path="/password/update"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
              exact
            />

            <Route
              path="/orders/me"
              element={
                <ProtectedRoute>
                  <ListOrder />
                </ProtectedRoute>
              }
              exact
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              }
              exact
            />
          </Routes>
        </div>
        <Routes>
          <Route
            path="/dashbord"
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard />
              </ProtectedRoute>
            }
            exact
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProductsList />
              </ProtectedRoute>
            }
            exact
          />
          <Route
            path="/admin/product"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewProduct />
              </ProtectedRoute>
            }
            exact
          />

          <Route
            path="/admin/drinks"
            element={
              <ProtectedRoute isAdmin={true}>
                <DrinksList />
              </ProtectedRoute>
            }
            exact
          />
          <Route
            path="/admin/drink"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewDrinks />
              </ProtectedRoute>
            }
            exact
          />

          <Route
            path="/admin/topping"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewToppings />
              </ProtectedRoute>
            }
            exact
          />
          <Route
            path="/admin/toppings"
            element={
              <ProtectedRoute isAdmin={true}>
                <ToppingsList />
              </ProtectedRoute>
            }
            exact
          />

          <Route
            path="/admin/food"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewFood />{" "}
              </ProtectedRoute>
            }
            exact
          />
          <Route
            path="/admin/foods"
            element={
              <ProtectedRoute isAdmin={true}>
                <FoodList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/peacePark"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewPeacePark />{" "}
              </ProtectedRoute>
            }
            exact
          />
          <Route
            path="/admin/peaceParks"
            element={
              <ProtectedRoute isAdmin={true}>
                <PeaceParkList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/products/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateProduct />
              </ProtectedRoute>
            }
            exact
          />
          <Route
            path="/admin/drinks/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateDrinks />
              </ProtectedRoute>
            }
            exact
          />
          <Route
            path="/admin/toppings/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateToppings />
              </ProtectedRoute>
            }
            exact
          />
          <Route
            path="/admin/foods/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                {" "}
                <UpdateFood />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/peacePark/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                {" "}
                <UpdatePeacePark />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute isAdmin={true}>
                <OrderList />
              </ProtectedRoute>
            }
            exact
          />
          <Route
            path="/admin/order/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProcessOrders />
              </ProtectedRoute>
            }
            exact
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute isAdmin={true}>
                <UsersList />
              </ProtectedRoute>
            }
            exact
          />
          <Route
            path="/admin/user/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateUser />
              </ProtectedRoute>
            }
            exact
          />

          <Route
            path="/admin/agentsForm"
            element={
              <ProtectedRoute isAdmin={true}>
                <AgentsForm />
              </ProtectedRoute>
            }
            exact
          />
          <Route
            path="/admin/mannerPalaceForm"
            element={
              <ProtectedRoute isAdmin={true}>
                <MannerForm />
              </ProtectedRoute>
            }
            exact
          />
          <Route
            path="/admin/numbersForm"
            element={
              <ProtectedRoute isAdmin={true}>
                <NumbersForm />
              </ProtectedRoute>
            }
            exact
          />
          <Route
            path="/admin/doublePortion"
            element={
              <ProtectedRoute isAdmin={true}>
                <DoublePortionForm />
              </ProtectedRoute>
            }
            exact
          />
          <Route
            path="/admin/nationalKitchen"
            element={
              <ProtectedRoute isAdmin={true}>
                {" "}
                <NationalKitchenForm />{" "}
              </ProtectedRoute>
            }
            exact
          ></Route>
          <Route
            path="/admin/mimies"
            element={
              <ProtectedRoute isAdmin={true}>
                {" "}
                <MimiesForm />{" "}
              </ProtectedRoute>
            }
            exact
          ></Route>
          <Route
            path="/admin/divineHands"
            element={
              <ProtectedRoute isAdmin={true}>
                {" "}
                <DivineHandsForm />{" "}
              </ProtectedRoute>
            }
            exact
          ></Route>
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
//

// Options -MultiViews
//     RewriteEngine On
//     RewriteCond %{REQUEST_FILENAME} !-f
//     RewriteRule ^ index.html [QSA,L]
