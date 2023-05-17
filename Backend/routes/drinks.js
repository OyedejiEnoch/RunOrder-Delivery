const express = require("express")

const router = express.Router();


const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, getAdminProducts } = require("../controllers/drinksControllers")


const { isAunthenticatedUser, authorizedRoles } = require("../middleWares/auth")

router.route("/drinks").get(getProducts);
router.route("/admin/drinks").get(getAdminProducts);
router.route("/products/:id").get(getSingleProduct);

router.route("/admin/drinks/new").post(isAunthenticatedUser, authorizedRoles("admin", "team"), newProduct);
router.route("/admin/drinks/:id")
    .put(isAunthenticatedUser, authorizedRoles("admin", "team"), updateProduct)
    .delete(isAunthenticatedUser, authorizedRoles("admin",  "team"), deleteProduct);

module.exports = router;