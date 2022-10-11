import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import './Stripe.css'


const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#1F2937",
            color: "#1F2937",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#1F2937" },
            "::placeholder": { color: "#1F2937" }
        },
        invalid: {
            iconColor: "#C81E1E",
            color: "#C81E1E"
        }
    }
}

export default function PaymentForm(props) {
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(props.data)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
        console.log(paymentMethod)
        if (!error) {
            try {
                const { id } = paymentMethod
                const response = await axios.post("http://localhost:8000/intents/", {
                    amount: 1000,
                    id
                })
                console.log(response.data.client_secret)
                if (response.data.success) {
                    console.log("Successful payment")
                    // setSuccess(true)

                    const confirmPayment = await stripe
                        .confirmCardPayment(
                            response.data.client_secret, {
                            payment_method: {
                                card: elements.getElement(CardElement)
                            }
                        }
                        )
                        .then(function (result) {
                            // Handle result.error or result.paymentIntent
                        });

                    console.log(confirmPayment)
                }

            } catch (error) {
                console.log("Error", error)
            }
        } else {
            console.log(error.message)
        }
    }

    return (
        <>

            <form onSubmit={handleSubmit}>
                <fieldset className="FormGroup">
                    <div className="FormRow">
                        <CardElement options={CARD_OPTIONS} />
                    </div>
                </fieldset>
                <button className="stripe-confirm-button text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                    Thanh toán
                </button>
            </form>


        </>
    )
}
