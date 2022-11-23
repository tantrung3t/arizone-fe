import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
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
    const history = useHistory()
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()
        props.loading()
        const dataSubmit = new FormData(e.currentTarget);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        console.log(paymentMethod.id)

        const data = {
            "payment": paymentMethod.id,
            "cart_id": props.data.cart_id,
            "full_name": props.data.full_name,
            "phone": props.data.phone,
            "address": props.data.address,
            "business": props.data.business,
            "order": props.data.order
        }


        // once payment method
        if (!dataSubmit.get('checkbox')) {
            
            var config = {
                method: 'post',
                url: process.env.REACT_APP_HOST + '/order/create/online/',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                    'Content-Type': 'application/json'
                },
                data: data
            };

            await axios(config)
                .then(function (response) {
                    console.log(response.data)
                    props.closeLoading()
                    history.push("/customer/order")
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            var config = {
                method: 'post',
                url: process.env.REACT_APP_HOST + '/order/create/online/save/',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                    'Content-Type': 'application/json'
                },
                data: data
            };

            await axios(config)
                .then(function (response) {
                    console.log(response.data)
                    props.closeLoading()
                    history.push("/customer/order")
                })
                .catch(function (error) {
                    console.log(error);
                });
        }



        // console.log(paymentMethod)
        // if (!error) {
        //     try {
        //         const { id } = paymentMethod
        //         const response = await axios.post("http://localhost:8000/intents/", {
        //             amount: 1000,
        //             id
        //         })
        //         console.log(response.data.client_secret)
        //         if (response.data.success) {
        //             console.log("Successful payment")
        //             // setSuccess(true)

        //             const confirmPayment = await stripe
        //                 .confirmCardPayment(
        //                     response.data.client_secret, {
        //                     payment_method: {
        //                         card: elements.getElement(CardElement)
        //                     }
        //                 }
        //                 )
        //                 .then(function (result) {
        //                     // Handle result.error or result.paymentIntent
        //                 });

        //             console.log(confirmPayment)
        //         }

        //     } catch (error) {
        //         console.log("Error", error)
        //     }
        // } else {
        //     console.log(error.message)
        // }
    }

    return (
        <>

            <form onSubmit={handleSubmit}>
                <fieldset className="FormGroup">
                    <div className="FormRow">
                        <CardElement options={CARD_OPTIONS} />
                    </div>
                </fieldset>
                <div className="flex items-center mb-1 mt-6">
                    <input id="default-checkbox" name="checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="ml-2 text-center text-sm font-medium text-gray-900 dark:text-gray-300">Lưu thông tin thanh toán</label>
                </div>
                <button className="stripe-confirm-button text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 rounded-lg px-5 py-2.5 mr-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                    Thanh toán
                </button>
            </form>
        </>
    )
}
