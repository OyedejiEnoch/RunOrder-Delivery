import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Sidebar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/dashbord">
              <i className="fa fa-tachometer-alt"></i> Dashboard
            </Link>
          </li>

          {user && user.role !== "admin" && user.role !== "team" ? null : (
            <li>
              <a
                class="btn btn-primary "
                data-bs-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
                className=" dropdown-toggle"
              >
                <i className="fa fa-product-hunt"></i> Products
              </a>
              <ul
                className="collapse list-unstyled collapse.show "
                id="collapseExample"
              >
                <li>
                  <Link to="/admin/products">
                    <i className="fa fa-clipboard-list"></i> All
                  </Link>
                </li>

                <li>
                  <Link to="/admin/product">
                    <i className="fa fa-plus"></i> Create
                  </Link>
                </li>
              </ul>
            </li>
          )}
          {user && user.role !== "admin" && user.role !== "team" ? null : (
            <li>
              <a
                class="btn btn-primary"
                data-bs-toggle="collapse"
                href="#collapseExample3"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
                className=" dropdown-toggle"
              >
                <i className="fa fa-product-hunt"></i> Drinks
              </a>
              <ul
                className="collapse list-unstyled collapse.show "
                id="collapseExample3"
              >
                <li>
                  <Link to="/admin/drinks">
                    <i className="fa fa-clipboard-list"></i> All
                  </Link>
                </li>

                <li>
                  <Link to="/admin/drink">
                    <i className="fa fa-plus"></i> Create
                  </Link>
                </li>
              </ul>
            </li>
          )}
          {/* toppings */}
          {user && user.role !== "admin" && user.role !== "team" ? null : (
            <li>
              <a
                class="btn btn-primary "
                data-bs-toggle="collapse"
                href="#collapseExample4"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
                className="dropdown-toggle"
              >
                <i className="fa fa-product-hunt"></i> Toppings
              </a>
              <ul
                className="collapse list-unstyled collapse.show "
                id="collapseExample4"
              >
                <li>
                  <Link to="/admin/toppings">
                    <i className="fa fa-clipboard-list"></i> All
                  </Link>
                </li>

                <li>
                  <Link to="/admin/topping">
                    <i className="fa fa-plus"></i> Create
                  </Link>
                </li>
              </ul>
            </li>
          )}

          {/* food */}
          {user && user.role !== "admin" && user.role !== "team" ? null : (
            <li>
              <a
                class="btn btn-primary "
                data-bs-toggle="collapse"
                href="#collapseExample5"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
                className="dropdown-toggle"
              >
                <i className="fa fa-product-hunt"></i> Foods
              </a>
              <ul
                className="collapse list-unstyled collapse.show "
                id="collapseExample5"
              >
                <li>
                  <Link to="/admin/foods">
                    <i className="fa fa-clipboard-list"></i> All
                  </Link>
                </li>

                <li>
                  <Link to="/admin/food">
                    <i className="fa fa-plus"></i> Create
                  </Link>
                </li>
              </ul>
            </li>
          )}

          {/* food */}
          {user && user.role !== "admin" && user.role !== "team" ? null : (
            <li>
              <a
                class="btn btn-primary "
                data-bs-toggle="collapse"
                href="#collapseExample6"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
                className="dropdown-toggle"
              >
                <i className="fa fa-product-hunt"></i> PeacePark
              </a>
              <ul
                className="collapse list-unstyled collapse.show "
                id="collapseExample6"
              >
                <li>
                  <Link to="/admin/peaceParks">
                    <i className="fa fa-clipboard-list"></i> All
                  </Link>
                </li>

                <li>
                  <Link to="/admin/peacePark">
                    <i className="fa fa-plus"></i> Create
                  </Link>
                </li>
              </ul>
            </li>
          )}

          <li>
            <Link to="/admin/orders">
              <i className="fa fa-shopping-basket"></i> Orders
            </Link>
          </li>

          {user && user.role === "admin" && (
            <li>
              <Link to="/admin/users">
                <i className="fa fa-users"></i> Users
              </Link>
            </li>
          )}

          {user && user.role !== "admin" && user.role !== "team" ? null : (
            <li>
              <Link to="/admin/agentsForm">
                <i className="fa fa-users"></i> AgentsForm
              </Link>
            </li>
          )}

          <li>
            <a
              class="btn btn-primary "
              data-bs-toggle="collapse"
              href="#collapseExample2"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
              className=" dropdown-toggle"
            >
              <i className="fa-solid fa-house"></i>Cafeteria
            </a>
            <ul
              className="collapse list-unstyled collapse.show "
              id="collapseExample2"
            >
              {user &&
              user.role !== "admin" &&
              user.role !== "team" &&
              user.role !== "MannerPalace" ? null : (
                <li>
                  <Link to="/admin/mannerPalaceForm">
                    <i className="fa fa-shopping-basket"></i>MannerPalace
                  </Link>
                </li>
              )}

              {user &&
              user.role !== "admin" &&
              user.role !== "team" &&
              user.role !== "Numbers" ? null : (
                <li>
                  <Link to="/admin/numbersForm">
                    <i className="fa-solid fa-cart-shopping"></i> Numbers
                  </Link>
                </li>
              )}

              {user &&
              user.role !== "admin" &&
              user.role !== "team" &&
              user.role !== "DoublePortion" ? null : (
                <li>
                  <Link to="/admin/doublePortion">
                    <i className="fa-solid fa-cart-shopping"></i>DoublePortion
                  </Link>
                </li>
              )}

              {user &&
              user.role !== "admin" &&
              user.role !== "team" &&
              user.role !== "NationalKitchen" ? null : (
                <li>
                  <Link to="/admin/nationalKitchen">
                    <i className="fa-solid fa-cart-shopping"></i>National
                    Kitchen
                  </Link>
                </li>
              )}

              {user &&
              user.role !== "admin" &&
              user.role !== "team" &&
              user.role !== "Mimies" ? null : (
                <li>
                  <Link to="/admin/mimies">
                    <i className="fa fa-shopping-basket"></i> Mimies
                  </Link>
                </li>
              )}

              {user &&
              user.role !== "admin" &&
              user.role !== "team" &&
              user.role !== "DivineHands" ? null : (
                <li>
                  <Link to="/admin/divineHands">
                    <i className="fa fa-shopping-basket"></i> Divine Hands
                  </Link>
                </li>
              )}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
