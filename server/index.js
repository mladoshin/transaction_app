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

    createTransaction(formData).then(transaction => {
        console.log(transaction)
        
        res.status(200).send(transaction)
    })
})

async function createTransaction(transaction) {
    console.log(transaction)
    const res = await Transaction.create(transaction)
    return {RequestId: res["_id"], Amount: transaction.amount}
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})