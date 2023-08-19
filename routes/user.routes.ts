import express from "express";
import multer from "multer";

import { BlockUser, GetProfile, GetUsers, Login, Logout, MakeAdmin, NewUser, RemoveAdmin, ResetPassword, SendPasswordResetMail, SendVerifyEmail, SignUp, UnBlockUser, UpdateBotFieldRoles, UpdateLeadFieldRoles, UpdateProfile, UpdateUser, VerifyEmail, testRoute, updatePassword, updateUserPassword } from "../controllers/user.controller";
import { isAdmin, isAuthenticatedUser, isProfileAuthenticated, } from "../middlewares/auth.middleware";

const router = express.Router()
export const upload = multer({ storage: multer.diskStorage({ destination: "/tmp/" }) })

router.post("/signup", upload.single("dp"), SignUp)
router.route("/users").get(isAuthenticatedUser, GetUsers)
    .post(isAuthenticatedUser, isAdmin, upload.single("dp"), NewUser)
router.route("/users/:id")
    .put(isAuthenticatedUser, isAdmin, upload.single("dp"), UpdateUser)
router.patch("/make-admin/user/:id", isAuthenticatedUser, isAdmin, MakeAdmin)
router.patch("/block/user/:id", isAuthenticatedUser, isAdmin, BlockUser)
router.patch("/unblock/user/:id", isAuthenticatedUser, isAdmin, UnBlockUser)
router.patch("/remove-admin/user/:id", isAuthenticatedUser, isAdmin, RemoveAdmin)
router.patch("/update-lead-field-roles/user/:id", isAuthenticatedUser, isAdmin, UpdateLeadFieldRoles)
router.patch("/update-bot-field-roles/user/:id", isAuthenticatedUser, isAdmin, UpdateBotFieldRoles)
router.post("/login", Login)
router.post("/logout", Logout)
router.route("/profile")
    .get(isProfileAuthenticated, GetProfile)
    .put(isAuthenticatedUser, upload.single("dp"), UpdateProfile)
router.route("/password/update").patch(isAuthenticatedUser, isAdmin, updatePassword)
router.route("/password/update/:id").patch(isAuthenticatedUser, isAdmin, updateUserPassword)

router.post("/email/verify", isAuthenticatedUser, SendVerifyEmail)
router.patch("/email/verify/:token", VerifyEmail)
router.post("/password/reset", SendPasswordResetMail)
router.patch("/password/reset/:token", ResetPassword)
router.patch("/test/:id", testRoute)


export default router;