const { userVerification } = require("../middleware/user.middleware")
const {
    SignupFunction,
    LoginFunction,
    PasswordResetFunction,
    UpdatePasswordFunction,
    checkUserFunction,
    updateUserProfile,
    getUserProfile
} = require("../controllers/user.controller");
const router = require("express").Router();

router.post('/verify-token', userVerification)

router.post("/check-user", checkUserFunction)

router.post("/signup", SignupFunction);

router.post('/login', LoginFunction)

router.post("/reset-request", PasswordResetFunction)

router.post("/reset-password/:token", UpdatePasswordFunction)

router.put("/update-user-profile", updateUserProfile)

router.get("/get-user-profile/:id", getUserProfile)


module.exports = router;