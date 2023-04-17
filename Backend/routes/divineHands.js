const express = require("express")

const router = express.Router();

const { isAunthenticatedUser, authorizedRoles } = require("../middleWares/auth")

const {newCafeteriaForm, allCafeteriaForm, deleteCafeteriaForm} = require("../controllers/divineHandsController")

router.route("/admin/divineHands/new").post(isAunthenticatedUser, authorizedRoles("admin", "team", "DivineHands"), newCafeteriaForm);
router.route("/admin/divineHands").get(isAunthenticatedUser, authorizedRoles("admin", "team", "DivineHands") ,allCafeteriaForm);
router.route("/admin/divineHands/:id")
    .delete(isAunthenticatedUser, authorizedRoles("admin",  "team"), deleteCafeteriaForm);

module.exports = router;