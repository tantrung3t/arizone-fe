import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51LmY0hEo6l0mTkYsS12RprwD9pFUGbpIISSqesK2LJVUIwJnPm0PBm7a9UiOGmCaB2Ki4n7Gte7ooHzfhwzOwXPi00KUoeJu4B"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer(props) {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm
                data={props.data} />
        </Elements>
    )
}