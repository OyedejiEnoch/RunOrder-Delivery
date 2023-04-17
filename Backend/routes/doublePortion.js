const express = require("express")

const router = express.Router();

const { isAunthenticatedUser, authorizedRoles } = require("../middleWares/auth")

const {newCafeteriaForm, allCafeteriaForm, deleteCafeteriaForm} = require("../controllers/doublePortionController")

router.route("/admin/doublePortion/new").post(isAunthenticatedUser, authorizedRoles("admin", "team", "DoublePortion"), newCafeteriaForm);
router.route("/admin/doublePortion").get(isAunthenticatedUser, authorizedRoles("admin", "team", "DoublePortion") ,allCafeteriaForm);
router.route("/admin/doublePortion/:id")
    .delete(isAunthenticatedUser, authorizedRoles("admin",  "team"), deleteCafeteriaForm);

module.exports = router;