const express = require("express")

const router = express.Router();

const { isAunthenticatedUser, authorizedRoles } = require("../middleWares/auth")

const {newCafeteriaForm, allCafeteriaForm, deleteCafeteriaForm} = require("../controllers/nationalKitchenController")

router.route("/admin/nationalKitchen/new").post(isAunthenticatedUser, authorizedRoles("admin", "team", "NationalKitchen"), newCafeteriaForm);
router.route("/admin/nationalKitchen").get(isAunthenticatedUser, authorizedRoles("admin", "team", "NationalKitchen") ,allCafeteriaForm);
router.route("/admin/nationalKitchen/:id")
    .delete(isAunthenticatedUser, authorizedRoles("admin",  "team"), deleteCafeteriaForm);

module.exports = router;