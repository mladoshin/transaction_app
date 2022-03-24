import React, { useState, useEffect } from 'react'
import { Typography, Card, Button, CssBaseline, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, Link, Grid, Container } from '@mui/material'
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/system';

const FormContainer = styled("div")(({ theme }) => ({
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: "3px solid #1976d2",
    borderRadius: 10,
    maxWidth: theme.breakpoints.values.sm,
    padding: theme.spacing(8),
}));

const Form = styled("form")(({ theme }) => ({
    width: '100%', // Fix IE 11 issue.
}));

const SubmitBtn = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2)
}));

function TransactionForm() {
    const [cardNumber, setCardNumber] = useState("")
    const [expDate, setExpDate] = useState("")
    const [cvv, setCvv] = useState("")
    const [amount, setAmount] = useState("")
    const [valid, setValid] = useState(false)

    useEffect(() => {
        console.log(JSON.stringify(cardNumber))
        //validate data
        let isValid = true
        const cardNum_regex = /^\d{16}$/
        const expDate_regex = /^(0?[1-9]|1[012])\/\d{4}$/
        const amount_regex = /^\d{1,7}$/
        let exp_date = expDate?.split("/")

        const cvv_regex = /^\d{3}$/

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

        if (!cvv.match(cvv_regex)) {
            isValid = false
        }

        if (!amount.match(amount_regex)) {
            isValid = false
        }

        setValid(isValid)
    }, [cardNumber, expDate, cvv, amount])

    const handlePay = (e) => {
        e.preventDefault()

        sendTransaction().then(res => {
            if (res.error) {
                alert(`The transaction was unsuccessful!\nError code: ${res.error}\nError: ${res.message}`)
            } else {
                alert(`The transaction with id ${res.RequestId} was successful! \n Amount withdrawn: ${res.Amount}`)
            }

            clearForm()
        })
    }

    //function for clearing all the fields in the form after submission
    const clearForm = () => {
        setCardNumber("")
        setExpDate("")
        setCvv("")
        setAmount("")
    }

    async function sendTransaction() {
        const data = { cardNumber, expDate, cvv, amount: parseInt(amount) }
        const res = await fetch("http://localhost:3001/transaction", {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        return res.json()
    }

    // handle change the cardNum
    const changeCardNum = (e) => {
        const regex = /^\d*$/
        if (e.target.value.match(regex)) {
            setCardNumber(e.target.value)
        }


    }

    const changeExpDate = (e) => {
        const regex = /^[0-9/]{0,7}$/
        if (e.target.value.match(regex)) {
            setExpDate(e.target.value)
        }
    }

    const changeCvv = (e) => {
        const regex = /^\d{0,3}$/
        if (e.target.value.match(regex)) {
            setCvv(e.target.value)
        }
    }

    const changeAmount = (e) => {
        const regex = /^\d{0,7}$/
        if (e.target.value.match(regex)) {
            setAmount(e.target.value)
        }
    }

    return (

        <FormContainer>
            <Typography component="h1" variant="h5">
                Transaction
            </Typography>

            <Form noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    type="tel"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    id="card-number"
                    label="Card number"
                    name="cardNumber"
                    value={cardNumber}
                    onChange={changeCardNum}
                    autoFocus
                />
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        name="expDate"
                        label="Expiration date"
                        type="text"
                        id="exp-date"
                        autoComplete="current-password"
                        value={expDate}
                        onChange={changeExpDate}
                        sx={{ width: "45%" }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        name="cvv"
                        label="Cvv"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={cvv}
                        onChange={changeCvv}
                        sx={{ width: "45%" }}
                    />
                </Box>

                <FormControl fullWidth sx={{ marginTop: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        value={amount}
                        onChange={changeAmount}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Amount"
                    />
                </FormControl>

                <SubmitBtn
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={!valid}
                    onClick={(e) => handlePay(e)}
                >
                    Pay
                </SubmitBtn>
            </Form>
        </FormContainer>
    )
}

export default TransactionForm