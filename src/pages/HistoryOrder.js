import './Home.css'
import Header from '../components/Header';
import AppFooter from '../components/Footer';
import './HistoryOrder.css'
import StartRating from '../components/StartRating';
import { StoreContext } from '../store/store';
import { useEffect, useState, useContext, useRef } from 'react';
import { Avatar } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function HistoryOrder() {
    const [all, setAll] = useState("order-tab-underline")
    const [processing, setProcessing] = useState("order-tab-underline-hide")
    const [shipping, setShipping] = useState("order-tab-underline-hide")
    const [success, setSuccess] = useState("order-tab-underline-hide")
    const [cancel, setCancel] = useState("order-tab-underline-hide")
    const handleTabALL = () => {
        setAll("order-tab-underline")
        setProcessing("order-tab-underline-hide")
        setShipping("order-tab-underline-hide")
        setSuccess("order-tab-underline-hide")
        setCancel("order-tab-underline-hide")
    }
    const handleTabProcessing = () => {
        setAll("order-tab-underline-hide")
        setProcessing("order-tab-underline")
        setShipping("order-tab-underline-hide")
        setSuccess("order-tab-underline-hide")
        setCancel("order-tab-underline-hide")
    }
    const handleTabShipping = () => {
        setAll("order-tab-underline-hide")
        setProcessing("order-tab-underline-hide")
        setShipping("order-tab-underline")
        setSuccess("order-tab-underline-hide")
        setCancel("order-tab-underline-hide")
    }
    const handleTabSuccess = () => {
        setAll("order-tab-underline-hide")
        setProcessing("order-tab-underline-hide")
        setShipping("order-tab-underline-hide")
        setSuccess("order-tab-underline")
        setCancel("order-tab-underline-hide")
    }
    const handleTabCancel = () => {
        setAll("order-tab-underline-hide")
        setProcessing("order-tab-underline-hide")
        setShipping("order-tab-underline-hide")
        setSuccess("order-tab-underline-hide")
        setCancel("order-tab-underline")
    }
    return (
        <div>
            <header>
                <Header></Header>
            </header>
            <main>
                <div className='body-container'>
                    <div className='order-container'>
                        <div className='order-tab'>
                            <div className='order-tab-title'>
                                <button onClick={handleTabALL}>
                                    <p className='text-xl font-bold text-gray-800 dark:text-white'>
                                        Tất cả
                                    </p>
                                </button>
                                <h1 className={all}>
                                </h1>
                            </div>
                            <div className='order-tab-vertical-line bg-gray-400'>
                            </div>
                            <div className='order-tab-title'>
                                <button onClick={handleTabProcessing}>
                                    <p className='text-xl font-bold text-gray-800 dark:text-white'>
                                        Đang xử lý
                                    </p>
                                </button>
                                <h1 className={processing}>
                                </h1>
                            </div>
                            <div>
                                <div className='order-tab-vertical-line bg-gray-400'>
                                </div>
                            </div>
                            <div className='order-tab-title'>
                                <button onClick={handleTabShipping}>
                                    <p className='text-xl font-bold text-gray-800 dark:text-white'>
                                        Đang giao
                                    </p>
                                </button>
                                <h1 className={shipping}>
                                </h1>
                            </div>
                            <div>
                                <div className='order-tab-vertical-line bg-gray-400'>
                                </div>
                            </div>
                            <div className='order-tab-title'>
                                <button onClick={handleTabSuccess}>
                                    <p className='text-xl font-bold text-gray-800 dark:text-white'>
                                        Thành công
                                    </p>
                                </button>
                                <h1 className={success}>
                                </h1>
                            </div>
                            <div>
                                <div className='order-tab-vertical-line bg-gray-400'>
                                </div>
                            </div>
                            <div className='order-tab-title'>
                                <button onClick={handleTabCancel}>
                                    <p className='text-xl font-bold text-gray-800 dark:text-white'>
                                        Đã huỷ
                                    </p>
                                </button>
                                <h1 className={cancel}>
                                </h1>
                            </div>
                        </div>
                        <div>
                            <HistoryOrderDetail
                                status="processing"
                                paymentMethod="card" />
                            <HistoryOrderDetail
                                status="shipping"
                                paymentMethod="cash" />
                            <HistoryOrderDetail
                                status="success"
                                paymentMethod="card" />
                            <HistoryOrderDetail
                                status="cancel"
                                paymentMethod="cash" />
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <AppFooter></AppFooter>
            </footer>
        </div>
    )
}

function HistoryOrderDetail(props) {
    const showStatus = () => {
        if (props.status === "processing") {
            return (
                <Processing />
            )
        }
        else {
            if (props.status === "shipping") {
                return (
                    <Shipping />
                )
            }
            else {
                if (props.status === "success") {
                    return (
                        <Success />
                    )
                }
                else {
                    return (
                        <Cancel />
                    )
                }
            }
        }

    }
    const showPaymentMethod = () => {
        if (props.paymentMethod === "card") {
            return (
                <CardPayment />
            )
        }
        return (
            <CashPayment />
        )
    }
    return (
        <div className='history-order-detail'>
            <div className='order-display-flex history-order-detail-status'>
                <p className='text-xl font-bold text-gray-800 dark:text-white'>
                    Cua hang a
                </p>
                {showStatus()}
            </div>
            <Product />
            <Product />
            <div className='history-order-detail-total'>
                <p className='text-xl font-bold text-gray-800 dark:text-white'>
                    Tổng: 1.000.000đ
                </p>
            </div>
            <div className='order-history-line'>
            </div>
            <div className='order-display-flex history-order-detail-status order-history-info-buyer'>
                <div>
                    <p className='text-xl font-bold text-gray-800 dark:text-white'>
                        Thông tin người nhận:
                    </p>
                    <p className='text-sm font-bold text-gray-600 dark:text-white'>
                        Trần Tấn Trung
                    </p>
                    <p className='text-sm font-bold text-gray-600 dark:text-white'>
                        0327171194
                    </p>
                    <p className='text-sm font-bold text-gray-600 dark:text-white'>
                        Hưng Lợi, Ninh Kiều, Cần Thơ
                    </p>
                </div>
                <div>
                    <p className='text-xl font-bold text-gray-800 dark:text-white'>
                        Phương thức thanh toán
                    </p>
                    {showPaymentMethod()}
                </div>
            </div>
        </div>
    )
}

function CashPayment() {
    return (
        <div className='order-display-flex order-history-payment-method'>
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z">
                </path>
            </svg>
            <p className='text-lg font-bold text-gray-600 dark:text-white'>
                Thanh toán tiền mặt
            </p>
        </div>
    )
}

function CardPayment() {
    return (
        <div className='order-display-flex order-history-payment-method'>
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <p className='text-lg font-bold text-gray-600 dark:text-white'>
                Thanh toán qua Stripe
            </p>
        </div>
    )
}

function Success() {
    return (
        <div className='history-order-detail-success'>
            <p className='text-xm font-bold text-green-50 dark:text-white'>
                Thành công
            </p>
        </div>
    )
}
function Processing() {
    return (
        <div className='history-order-detail-processing'>
            <p className='text-xm font-bold text-blue-50 dark:text-white'>
                Đang xử lý
            </p>
        </div>
    )
}
function Cancel() {
    return (
        <div className='history-order-detail-cancel'>
            <p className='text-xm font-bold text-red-50 dark:text-white'>
                Đã huỷ
            </p>
        </div>
    )
}
function Shipping() {
    return (
        <div className='history-order-detail-shipping'>
            <p className='text-xm font-bold text-yellow-50 dark:text-white'>
                Đang giao
            </p>
        </div>
    )
}


function Product(props) {
    return (
        <div className='order-display-flex history-order-detail-product'>
            <div className='order-display-flex'>
                <img
                    src="https://www.w3schools.com/w3css/img_lights.jpg"
                    alt="store"
                />
                <div className='history-order-detail-product-info'>
                    <p className='text-lg font-bold text-gray-600 dark:text-white'>
                        Thuốc trừ sâu hiệu con Nai
                    </p>
                    <p className='text-xm font-bold text-gray-600 dark:text-white'>
                        x1
                    </p>
                </div>
            </div>
            <div className='history-order-detail-product-info-price'>
                <p className='text-lg font-bold text-gray-800 dark:text-white'>
                    200.000đ
                </p>
            </div>
        </div>
    )
}