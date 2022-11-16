import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = process.env.REACT_APP_STRIPE_KEY

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer(props) {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm
                data={props.data}
                loading={() => props.loading()}
                closeLoading={() => props.closeLoading()} />
        </Elements>
    )
}