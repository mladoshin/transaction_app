const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose');
const Transaction = require("./models/transaction")

const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3001

const uri = "mongodb+srv://max:vzkNiB8bjX9Te6uk@cluster0.mzrv9.mongodb.net/transactions_app?retryWrites=true&w=majority";


mongoose.connect("mongodb://localhost/testdb");



app.post("/transaction", async (req, res) => {
    const formData = req.body
    if(!validateTransaction(formData)){
        res.status(400).send({error: 400, message: "Bad request"})
        return
    }

    createTransaction(formData).then(transaction => {
        console.log(transaction)

        res.status(200).send(transaction)
    })
})

function validateTransaction(transaction) {
    const cardNumber = transaction?.cardNumber || ""
    const expDate = transaction?.expDate || ""
    const cvv = transaction?.cvv || ""
    const amount = transaction?.amount || ""

    let isValid = true
    const cardNum_regex = /^\d{16}$/
    const expDate_regex = /^(0?[1-9]|1[012])\/\d{4}$/
    const amount_regex = /^\d{1,7}$/
    let exp_date = expDate?.split("/")

    const cvv_regex = /^\d{3}$/

    //check if the card number is valid
    if (!cardNumber.match(cardNum_regex)) {
        isValid = false
    }

    //check if the card is not expired
    if (exp_date[0] <= new Date(Date.now()).getMonth() + 1 && exp_date[1] <= new Date(Date.now()).getFullYear() || exp_date[1] < new Date(Date.now()).getFullYear()) {
        isValid = false
    }

    //check if the date matches the format
    if (!expDate.match(expDate_regex)) {
        isValid = false
    }

    //check if cvv has 3 digits
    if (!cvv.match(cvv_regex)) {
        isValid = false
    }

    // check if the amount is valid number
    if (!JSON.stringify(amount).match(amount_regex)) {
        isValid = false
    }

    return isValid
}

async function createTransaction(transaction) {
    console.log(transaction)
    const res = await Transaction.create(transaction)
    return { RequestId: res["_id"], Amount: transaction.amount }
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})