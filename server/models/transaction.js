const mongoose = require("mongoose")

const TransactionSchema = mongoose.Schema({
    CardNumber: String,
    ExpDate: String,
    Cvv: String,
    Amount: Number
})

module.exports = mongoose.model("transactions", TransactionSchema)