import { chargeCard, initiateTransfer, initTrans, transfer, validateOTP } from "../services/Flutterwave"
import FLW from 'flutterwave-node-v3'
import dotenv from 'dotenv'
import { response } from "express";
import { json } from "express/lib/response";
dotenv.config()
const flw = new FLW(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
export class Flutterwave{
    static makeTransfer = async (req, res, next) => {
        const {sender, recipient} = req.body
        console.log(sender,recipient)
        // const response = await initiateTransfer(payload)
        // const response = await initTrans(payload)
        // console.log(response)
        return res.status(200).json({status:"200", sender, recipient})
        
    }

    static makeMomoTransfer = async (req,res, next) => {
        try{
            const response = await flw.Transfer.initiate(req.body);
            console.log(response)
            return res.status(200).json(response)
        }catch(err){
            console.log(err)
            return res.status(400).json(err)
        }
    }

    static makeCardCharge = async (req, res, next) => {
        const {sender, recipient} = req.body
        sender['enckey'] = process.env.FLW_ENCRYPTION_KEY
        sender['card_number'] = sender.card_number.replaceAll(" ","")
        try{
            const response = await chargeCard(sender)
            console.log("Response:")
            console.log(response)
            res.status(200).json(response)
        }catch(err){
            // console.log(err)
            res.status(400).json(err)
        }
    }
    static validateChargeOTP = async (req, res, next) => {
        console.log("verifying otp")
        console.log(req.body)
        try{
            const {otp, flw_ref, recipient} = req.body
            console.log(otp, flw_ref)
            const verification = await validateOTP(otp, flw_ref)
            if(verification.status =='success'){
                const response = await flw.Transfer.initiate(recipient);
                return res.status(200).json({otp:verification,momo:response})
            }else{
                console.log(verification)
                return json.status(200).json("There was error sendind money")
            }
            
        }catch(err){
            console.log(err)
            return err
        }
    }
}