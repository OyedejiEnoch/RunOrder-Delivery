const express = require("express")

const router = express.Router();


const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteReview, getAdminProducts } = require("../controllers/toppingsControllers")


const { isAunthenticatedUser, authorizedRoles } = require("../middleWares/auth")

router.route("/toppings").get(getProducts);
router.route("/admin/toppings").get(getAdminProducts);
router.route("/toppings/:id").get(getSingleProduct);

router.route("/admin/toppings/new").post(isAunthenticatedUser, authorizedRoles("admin", "team"), newProduct);
router.route("/admin/toppings/:id")
    .put(isAunthenticatedUser, authorizedRoles("admin", "team"), updateProduct)
    .delete(isAunthenticatedUser, authorizedRoles("admin",  "team"), deleteProduct);

module.exports = router;