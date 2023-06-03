const express = require("express")

const router = express.Router();


const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteReview, getAdminProducts } = require("../controllers/foodController")


const { isAunthenticatedUser, authorizedRoles } = require("../middleWares/auth")

router.route("/foods").get(getProducts);
router.route("/admin/foods").get(getAdminProducts);
router.route("/foods/:id").get(getSingleProduct);

router.route("/admin/foods/new").post(isAunthenticatedUser, authorizedRoles("admin", "team"), newProduct);
router.route("/admin/foods/:id")
    .put(isAunthenticatedUser, authorizedRoles("admin", "team"), updateProduct)
    .delete(isAunthenticatedUser, authorizedRoles("admin",  "team"), deleteProduct);

module.exports = router;