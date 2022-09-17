import express from "express";
import { Flutterwave } from "../controllers/Money";
import { User } from "../controllers/User";

const router = express.Router()

router.post('/Send', (req, res, next) => {
    return res.status(200).json({message: "hello", status:200})
})
router.post('/make_transfer', Flutterwave.makeTransfer)
router.post('/make_momo_transfer', Flutterwave.makeMomoTransfer)
router.post('/charge_card', Flutterwave.makeCardCharge)
router.post('/validate_otp', Flutterwave.validateChargeOTP)
router.post('/login', User.login)
export default router