const express = require("express")

const router = express.Router();

const { isAunthenticatedUser, authorizedRoles } = require("../middleWares/auth")

const {newCafeteriaForm, allCafeteriaForm, deleteCafeteriaForm} = require("../controllers/mimiesController")

router.route("/admin/mimies/new").post(isAunthenticatedUser, authorizedRoles("admin", "team", "Mimies"), newCafeteriaForm);
router.route("/admin/mimies").get(isAunthenticatedUser, authorizedRoles("admin", "team", "Mimies") ,allCafeteriaForm);
router.route("/admin/mimies/:id")
    .delete(isAunthenticatedUser, authorizedRoles("admin",  "team"), deleteCafeteriaForm);

module.exports = router;