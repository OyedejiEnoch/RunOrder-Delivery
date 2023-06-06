const express = require("express");

const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
} = require("../controllers/peaceParkController");

const {
  isAunthenticatedUser,
  authorizedRoles,
} = require("../middleWares/auth");

router.route("/peacePark").get(getProducts);
router.route("/admin/peacePark").get(getAdminProducts);
router.route("/peacePark/:id").get(getSingleProduct);

router
  .route("/admin/peacePark/new")
  .post(isAunthenticatedUser, authorizedRoles("admin", "team"), newProduct);
router
  .route("/admin/peacePark/:id")
  .put(isAunthenticatedUser, authorizedRoles("admin", "team"), updateProduct)
  .delete(
    isAunthenticatedUser,
    authorizedRoles("admin", "team"),
    deleteProduct
  );

module.exports = router;
