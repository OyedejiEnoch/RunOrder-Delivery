const express = require("express")

const router = express.Router();

const { isAunthenticatedUser, authorizedRoles } = require("../middleWares/auth")

const {newCafeteriaForm, allCafeteriaForm, deleteCafeteriaForm} = require("../controllers/mannerPalaceController")

router.route("/admin/mannerPalace/new").post(isAunthenticatedUser, authorizedRoles("admin", "team", "MannerPalace"), newCafeteriaForm);
router.route("/admin/mannerPalace").get(isAunthenticatedUser, authorizedRoles("admin", "team", "MannerPalace") ,allCafeteriaForm);
router.route("/admin/mannerPalace/:id")
    .delete(isAunthenticatedUser, authorizedRoles("admin",  "team"), deleteCafeteriaForm);

module.exports = router;