const express = require("express")

const router = express.Router();

const {newAgentForm, allAgentForm, deleteAgentform} = require("../controllers/agentFromController")
const { isAunthenticatedUser, authorizedRoles } = require("../middleWares/auth")


router.route("/admin/agentsForm/new").post(isAunthenticatedUser, authorizedRoles("admin", "team", "agents"), newAgentForm);
router.route("/admin/agentsForm").get(allAgentForm);
router.route("/admin/agentsForm/:id")
    .delete(isAunthenticatedUser, authorizedRoles("admin",  "team"), deleteAgentform);

module.exports = router;