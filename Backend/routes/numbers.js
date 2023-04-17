const express = require("express")

const router = express.Router();

const { isAunthenticatedUser, authorizedRoles } = require("../middleWares/auth")

const {newCafeteriaForm, allCafeteriaForm, deleteCafeteriaForm} = require("../controllers/numbersControllers")

router.route("/admin/numbers/new").post(isAunthenticatedUser, authorizedRoles("admin", "team", "Numbers"), newCafeteriaForm);
router.route("/admin/numbers").get(isAunthenticatedUser, authorizedRoles("admin", "team", "Numbers") ,allCafeteriaForm);
router.route("/admin/numbers/:id")
    .delete(isAunthenticatedUser, authorizedRoles("admin",  "team"), deleteCafeteriaForm);

module.exports = router;