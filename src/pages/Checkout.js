
import './Home.css'
import Header from '../components/Header';
import AppFooter from '../components/Footer';
import './Checkout.css'
import StartRating from '../components/StartRating';
import { StoreContext } from '../store/store';
import React, { useEffect, useState, useContext, useRef } from 'react';
import { Avatar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import StripeContainer from '../components/StripeContainer';

const dataProduct = {
    "business": "Cửa hàng A",
    "products": [
        {
            "name": "Thuốc trừ bệnh Help 25WG",
            "thumbnail": "https://media.istockphoto.com/photos/wild-grass-in-the-mountains-at-sunset-picture-id1322277517?k=20&m=1322277517&s=612x612&w=0&h=ZdxT3aGDGLsOAn3mILBS6FD7ARonKRHe_EKKa-V-Hws=",
            "price": 400000,
            "sale": 0,
            "amount": 3
        },
        {
            "name": "Thuốc trừ bệnh Actara 25WG",
            "thumbnail": "https://media.istockphoto.com/photos/wild-grass-in-the-mountains-at-sunset-picture-id1322277517?k=20&m=1322277517&s=612x612&w=0&h=ZdxT3aGDGLsOAn3mILBS6FD7ARonKRHe_EKKa-V-Hws=",
            "price": 200000,
            "sale": 150000,
            "amount": 2
        },
    ]
}

export default function Checkout(props) {
    const product = dataProduct.products[0]
    const [modalHide, setModalHide] = useState("modal hide")
    const onlinePayment = () => {
        setModalHide("modal")
    }
    const closeModal = () => {
        setModalHide("modal hide")
    }
    const data = {
        message: "Hello",
        status: 200
    }
    return (
        <div>
            <header>
                <Header></Header>
            </header>
            <main>
                <div>
                    <div className={modalHide}>
                        <div className="modal__inner">
                            <div className="modal__header bg-gray-700">
                                <p>Nhập thẻ thanh toán</p>
                                <button
                                    onClick={closeModal}
                                    type="button">
                                    <svg className="w-6 h-6 animate-infinite" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                            </div>
                            <div className="modal__body">
                                <StripePaymentModal data={data}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='body-container'>
                    <div className='checkout-container'>
                        <div className='checkout-product'>
                            <div className='checkout-title'>
                                <div className='cart-title-product'>
                                    <p className='text-xm font-bold text-gray-900 dark:text-white'>
                                        Sản phẩm
                                    </p>
                                </div>
                                <div className='cart-title-price'>
                                    <p className='text-xm font-bold text-gray-900 dark:text-white'>
                                        Đơn giá
                                    </p>
                                </div>
                                <div className='cart-title-amount'>
                                    <p className='text-xm font-bold text-gray-900 dark:text-white'>
                                        Số lượng
                                    </p>
                                </div>
                                <div className='cart-title-money'>
                                    <p className='text-xm font-bold text-gray-900 dark:text-white'>
                                        Thành tiền
                                    </p>
                                </div>
                            </div>
                            <div className='checkout-list-product'>
                                <Product />
                                <Product />
                                <Product />
                            </div>


                        </div>
                        <div className='checkout-invoice'>
                            <div className='checkout-invoice-address'>
                                <h5 className='text-xm font-bold text-gray-800 dark:text-white'>
                                    Thông tin nhận hàng
                                </h5>
                                <form>
                                    <div>
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Họ và tên:
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Nguyễn Văn A"
                                            // data="Trần Tấn Trung"
                                            required />
                                    </div>
                                    <div>
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Số điện thoại:
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="0123123123"
                                            // data="Trần Tấn Trung"
                                            required />
                                    </div>
                                    <div>
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Địa chỉ:
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Địa chỉ"
                                            // data="Trần Tấn Trung"
                                            required />
                                    </div>
                                </form>
                            </div>
                            <div className='checkout-invoice-payment'>
                                <h5 className='text-xm font-bold text-gray-800 dark:text-white'>
                                    Thanh toán
                                </h5>
                                <div className='checkout-total'>
                                    <h5 className='text-xm font-semibold text-gray-800 dark:text-white'>
                                        Thành tiền:
                                    </h5>
                                    <p className='text-xm font-semibold text-blue-700 dark:text-white'>
                                        0đ
                                    </p>
                                </div>
                                <div>
                                    <button type='button' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                        <p className='text-xm font-semibold text-white-700 dark:text-white'>
                                            THANH TOÁN TIỀN MẶT
                                        </p>
                                        <p className='text-xs font-semibold text-white-700 dark:text-white'>
                                            (Thanh toán khi nhận hàng)
                                        </p>
                                    </button>
                                </div>
                                <button onClick={onlinePayment} type='button' className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    <p className='text-xm font-semibold text-white-700 dark:text-white'>
                                        THANH TOÁN ONLINE
                                    </p>
                                    <p className='text-xs font-semibold text-white-700 dark:text-white'>
                                        (Thanh toán bằng thẻ ngân hàng)
                                    </p>
                                </button>
                            </div>
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

function Product(props) {
    return (
        <div className='cart-product-in-store'>
            <div className='cart-title-product'>
                <img
                    src="https://media.istockphoto.com/photos/wild-grass-in-the-mountains-at-sunset-picture-id1322277517?k=20&m=1322277517&s=612x612&w=0&h=ZdxT3aGDGLsOAn3mILBS6FD7ARonKRHe_EKKa-V-Hws="
                    alt="store"
                />
                <p className='p-5 text-lg font-semibold text-gray-900 dark:text-white'>
                    Product name
                </p>
            </div>
            <div className='cart-title-price'>
                <p className='text-lg font-semibold text-gray-600 line-through dark:text-white'>
                    100.000đ
                </p>
                <p className='text-lg font-semibold text-red-600 dark:text-white'>
                    90.000đ
                </p>
            </div>
            <div className='cart-title-amount'>
                <p className='text-lg font-semibold text-blue-900 dark:text-white'>
                    x3
                </p>
            </div>
            <div className='cart-title-money'>
                <p className='text-lg font-semibold text-blue-900 dark:text-white'>
                    10000đ
                </p>
            </div>

        </div>
    )
}

function StripePaymentModal(props) {
    return(
        <div>
            <StripeContainer data={props.data}/>
        </div>
    )
}