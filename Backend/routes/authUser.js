const express = require("express")

const router = express.Router();

const { registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword,
    updateProfile,
    allUsers,
    getUserDetails,
    updateUser,
    deleteUser } = require("../controllers/authUserControllers")


const { isAunthenticatedUser, authorizedRoles } = require("../middleWares/auth")
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)


router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/logout").get(logout)

router.route("/me").get(isAunthenticatedUser, getUserProfile)
router.route("/password/update").put(isAunthenticatedUser, updatePassword)
router.route("/me/update").put(isAunthenticatedUser, updateProfile)


router.route("/admin/users").get( isAunthenticatedUser,authorizedRoles("admin", "team, user"), allUsers)
router.route("/admin/users/:id")
    .get(isAunthenticatedUser, authorizedRoles("admin"), getUserDetails)
    .put(isAunthenticatedUser, authorizedRoles("admin",), updateUser)
    .delete(isAunthenticatedUser, authorizedRoles("admin"), deleteUser)
module.exports = router;