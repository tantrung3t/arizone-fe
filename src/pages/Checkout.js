
import './Home.css'
import Header from '../components/Header';
import AppFooter from '../components/Footer';
import './Checkout.css'
import StartRating from '../components/StartRating';
import React, { useEffect, useState } from 'react';
import { Avatar } from 'flowbite-react';
import { Link } from 'react-router-dom';

import StripeContainer from '../components/StripeContainer';
import axios from 'axios';

const HOST = process.env.REACT_APP_HOST

export default function Checkout(props) {
    const [user, setUser] = useState(
        {
            "full_name": "",
            "permission": "",
            "phone": "",
            "address": "",
            "image": ""
        }
    )
    const [product, setProduct] = useState(
        {
            "total": 0,
            "product": []
        }
    )
    const [modalHide, setModalHide] = useState("modal hide")
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()

    const [dataOrder, setDataOrder] = useState()
    const onlinePayment = () => {
        setModalHide("modal")
        console.log(dataOrder)
    }
    const getDataOrder = () => {
        let productOrder = []
        product.product.map((item, index) => {
            let data = {
                "id": item.product.id,
                "quantity": item.quantity
            }
            return productOrder.push(data)
        })
        let data = {
            "full_name": name,
            "phone": phone,
            "address": address,
            "order": productOrder
        }
        setDataOrder(data)
        return data
    }
    const cashPayment = () => {
        let order = getDataOrder()
        console.log(order)

    }
    const closeModal = () => {
        setModalHide("modal hide")
    }

    const getUser = async () => {
        var config = {
            method: 'get',
            url: HOST + '/user/',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        };
        await axios(config)
            .then(function (response) {
                setUser(response.data)
                setName(response.data.full_name)
                setPhone(response.data.phone)
                setAddress(response.data.address)
            })
            .catch(function (error) {

            });
    }
    useEffect(() => {
        setProduct(JSON.parse(localStorage.getItem("order")))
        getUser()
    }, [])

    const listProduct = () => {
        if (product.total) {
            let element = product.product.map((item, index) => {
                return <Product key={index}
                    image={item.product.image}
                    name={item.product.name}
                    price={item.product.price}
                    sale={item.product.sale}
                    quantity={item.quantity}
                />
            })
            return element;
        }
        return <div></div>
    }

    const changeName = (e) => {
        setName(e.target.value)
    }
    const changePhone = (e) => {
        setPhone(e.target.value)
    }
    const changeAddress = (e) => {
        setAddress(e.target.value)
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
                                <StripePaymentModal data={dataOrder} />
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
                                {listProduct()}
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
                                            onChange={changeName}
                                            defaultValue={user.full_name}
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
                                            onChange={changePhone}
                                            defaultValue={user.phone}
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
                                            onChange={changeAddress}
                                            defaultValue={user.address}
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
                                    <p className='text-xl font-semibold text-blue-700 dark:text-white'>
                                        {product.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                                    </p>
                                </div>
                                <div>
                                    <button onClick={cashPayment} type='button' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
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
                    src={props.image}
                    alt="store"
                />
                <p className='p-5 text-lg font-semibold text-gray-900 dark:text-white'>
                    {props.name}
                </p>
            </div>
            <div className='cart-title-price'>
                {
                    props.sale ? (
                        <>
                            <p className='text-lg font-semibold text-gray-600 line-through dark:text-white'>
                                {props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                            </p>
                            <p className='text-lg font-semibold text-red-600 dark:text-white'>
                                {props.sale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                            </p>
                        </>
                    ) : (
                        <p className='text-lg font-semibold text-gray-600 dark:text-white'>
                            {props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                        </p>
                    )
                }
            </div>
            <div className='cart-title-amount'>
                <p className='text-lg font-semibold text-blue-900 dark:text-white'>
                    x{props.quantity}
                </p>
            </div>
            <div className='cart-title-money'>
                {
                    props.sale ? (
                        <p className='text-lg font-semibold text-blue-900 dark:text-white'>
                            {(props.sale * props.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                        </p>
                    ) : (
                        <p className='text-lg font-semibold text-blue-900 dark:text-white'>
                            {(props.price * props.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                        </p>
                    )
                }
            </div>

        </div>
    )
}

function StripePaymentModal(props) {
    return (
        <div>
            <StripeContainer data={props.data} />
        </div>
    )
}