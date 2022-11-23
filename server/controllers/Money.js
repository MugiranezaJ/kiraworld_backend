import { chargeCard, initTrans, transfer, validateOTP } from "../services/Flutterwave"
import FLW from 'flutterwave-node-v3'
import dotenv from 'dotenv'
import { response } from "express";
import { json } from "express/lib/response";
import { initialize } from '../models';
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
    // TODO: send actual money
    // TODO: Update the wallet of receiver

    static initiateTransfer = async (req, res, next) => {
        const db = await initialize();
        const t = await db.sequelize.transaction();
        try{
            const { user, recipient, description, destination_amount} = req.body
            // Sender
            const sender_wallet = await db.wallet.findOne({where: {user_model: user}})
            const sender_balance = sender_wallet.balance - parseInt(destination_amount)
            await db.wallet.update({balance: sender_balance},{where:{user_model: user}}, {transaction: t}) 

            // Receiver
            const new_destination_amount = parseInt(destination_amount)
            const receiver_wallet = await db.wallet.findOne({where: {wallet_id: recipient}}, )
            const receiver_balance = receiver_wallet.balance + new_destination_amount
            await db.wallet.update({balance: receiver_balance},{where:{wallet_id: recipient}})

            await db.transactions.create({user_model: user, reason: description, amount: new_destination_amount, fee: 2, status: "processing"}, {transaction: t})
            await t.commit();

            return res.status(200).json({status: 200, message: "transfered successfully"})
        }catch(err){
            t.rollback()
            console.log(err)
            next(err)
        }
    }
}