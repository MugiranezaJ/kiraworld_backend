import axios from 'axios'
import dotenv from 'dotenv'
import Flutterwave from 'flutterwave-node-v3'
import Axios from '../services/AxiosConfig'

dotenv.config()
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

export const initTrans = async (payload) => {

    try {
        // const payload = {
        //     "account_bank": "044", //This is the recipient bank code. Get list here :https://developer.flutterwave.com/v3.0/reference#get-all-banks
        //     "account_number": "0690000040",
        //     "amount": 200,
        //     "narration": "ionnodo",
        //     "currency": "NGN",
        //     "reference": "transfer-"+Date.now(), //This is a merchant's unique reference for the transfer, it can be used to query for the status of the transfer
        //     "callback_url": "https://webhook.site/b3e505b0-fe02-430e-a538-22bbbce8ce0d",
        //     "debit_currency": "NGN"
        // }

        const response = await flw.Transfer.initiate(payload)
        console.log(JSON.stringify(response));
        console.log("initiated transfer")
        return response
    } catch (error) {
        console.log(error)
        return error
    }

}

export const initMobileMoneyTransfer = async (payload) => {
    try{
        // const details = {
        //     account_bank: "flutterwave",
        //     account_number: "99992069",
        //     amount: 500,
        //     currency: "NGN",
        //     debit_currency: "NGN"
        // };
        const response = await flw.Transfer.initiate(details);
        console.log(response)
        return response
    }catch(err){
        console.log(err)
        return err
    }
}

export const chargeCard = async (payload) => {
    try {
        const response = await flw.Charge.card(payload)
        console.log(response)
        if (response.meta.authorization.mode === 'pin') {
            console.log("pin required")
            let payload2 = payload
            payload2.authorization = {
                "mode": "pin",
                "fields": [
                    "pin"
                ],
                "pin": 3310
            }
            const reCallCharge = await flw.Charge.card(payload2)
            return reCallCharge
        }
        if (response.meta.authorization.mode === 'redirect') {

            var url = response.meta.authorization.redirect
            open(url)
        }
        // console.log(response)
        return response


    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

export const validateOTP = async (otp, flw_ref) => {
    const callValidate = await flw.Charge.validate({
        "otp": otp,
        "flw_ref": flw_ref
    })
    console.log(callValidate)
    return callValidate
}

export const getTransferFee = async (payload) => {

    try {
        // const payload = {
        //     "amount":"5000",
        //     "currency":"NGN"
        // }

        const response = await flw.Transfer.fee(payload)
        console.log(response);
        return response
    } catch (error) {
        console.log(error)
        return error
    }

}