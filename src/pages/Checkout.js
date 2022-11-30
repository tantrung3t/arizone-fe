
import './Home.css'
import Header from '../components/Header';
import AppFooter from '../components/Footer';
import './Checkout.css'
import StartRating from '../components/StartRating';
import React, { useEffect, useState } from 'react';
import { Avatar } from 'flowbite-react';
import { Link, useHistory } from 'react-router-dom';

import StripeContainer from '../components/StripeContainer';
import axios from 'axios';

const HOST = process.env.REACT_APP_HOST

export default function Checkout(props) {
    const history = useHistory()
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
            "cart_id": "",
            "business": "",
            "total": 0,
            "product": []
        }
    )
    const [modalHide, setModalHide] = useState("modal hide")
    const [modalAddress, setModalAddress] = useState("modal hide")
    const [name, setName] = useState(user.full_name)
    const [phone, setPhone] = useState(user.phone)
    const [address, setAddress] = useState(user.address)

    const [loadingScreen, setLoadingScreen] = useState("hide")

    const [dataOrder, setDataOrder] = useState()

    const [listAddress, setListAddress] = useState([])

    const [addAddress, setAddAddress] = useState(true)

    const onlinePayment = async () => {
        let order = getDataOrder()

        var config = {
            method: 'get',
            url: HOST + '/user/',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.data.stripe_customer) {
                    loading()
                    var config = {
                        method: 'post',
                        url: HOST + '/order/create/online/save/',
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                            'Content-Type': 'application/json'
                        },
                        data: order
                    };
                    axios(config)
                        .then(function (response) {
                            closeLoading()
                            history.push("/customer/order")

                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                }
                else {
                    setModalHide("modal")
                }
            })
            .catch(function (error) {

            });


    }
    const getDataOrder = () => {
        let productOrder = []
        product.product.map((item, index) => {
            let data = {
                "product": item.product.id,
                "price": item.product.price,
                "sale": item.product.sale,
                "quantity": item.quantity
            }
            return productOrder.push(data)
        })
        let data = {
            "cart_id": product.cart_id,
            "full_name": name,
            "phone": phone,
            "address": address,
            "business": product.business,
            "order": productOrder
        }
        setDataOrder(data)
        return data
    }

    const loading = () => {
        setLoadingScreen("loading")
    }

    const closeLoading = () => {
        setLoadingScreen("hide")
    }

    const cashPayment = async () => {

        loading()
        let order = getDataOrder()

        var config = {
            method: 'post',
            url: HOST + '/order/create/cash/',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            data: order
        };

        await axios(config)
            .then(function (response) {
                setTimeout(() => {
                    closeLoading()
                    history.push("/customer/order")
                }, 500)
            })
            .catch(function (error) {
                console.log(error);
            });


    }
    const closeModal = () => {
        setModalHide("modal hide")
        setModalAddress("modal hide")
        setAddAddress(true)
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

    const getAddress = async () => {
        var config = {
            method: 'get',
            url: HOST + '/address/',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        };

        axios(config)
            .then(function (response) {
                setListAddress(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(() => {
        setProduct(JSON.parse(localStorage.getItem("order")))
        getUser()
        getAddress()
    }, [])

    const setInfoCheckout = (name, phone, address) => {
        setName(name)
        setPhone(phone)
        setAddress(address)
        closeModal()
    }

    const deleteAddress = (id) => {
        console.log(id)
        var config = {
            method: 'delete',
            url: HOST + '/address/' + id + '/',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        };

        axios(config)
            .then(function (response) {
                getAddress()
            })
            .catch(function (error) {
                console.log(error);
            });
    }

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
    const showListAddress = () => {

        let element = listAddress.map((item, index) => {
            return <Address
                key={index}
                id={item.id}
                name={item.name}
                phone={item.phone}
                address={item.address}
                default={false}
                setInfoCheckout={(name, phone, address) => { setInfoCheckout(name, phone, address) }}
                deleteAddress={(id) => { deleteAddress(id) }} />
        })
        return element;

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

    const chooseAddress = () => {
        setModalAddress("modal")
    }

    const showAddAddress = () => {
        setAddAddress(false)
    }

    const handleSubmitAddAddress = (e) => {
        e.preventDefault()

        const dataSubmit = new FormData(e.currentTarget);

        let data = {
            "name": dataSubmit.get('address-name'),
            "phone": dataSubmit.get('address-phone'),
            "address": dataSubmit.get('address-address')
        }

        var config = {
            method: 'post',
            url: HOST + '/address/',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                getAddress()
                setAddAddress(true)
            })
            .catch(function (error) {
                console.log(error);
            });


    }

    return (
        <div>
            <header>
                <Header></Header>
            </header>
            <main>
                <div className={loadingScreen}>
                    <div role="status" className='w-20 h-20'>
                        <svg aria-hidden="true" className="mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                </div>
                <div>
                    <div className={modalAddress}>
                        <div className="modal__inner">
                            <div className="modal__header bg-blue-600">
                                <p className='text-base font-bold'>
                                    Chọn địa chỉ nhận hàng
                                </p>
                                <button
                                    onClick={closeModal}
                                    type="button">
                                    <svg className="w-6 h-6 animate-infinite" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            {
                                addAddress ? (
                                    <>
                                        <div className="modal__body checkout-list-address">
                                            <Address
                                                name={user.full_name}
                                                phone={user.phone}
                                                address={user.address}
                                                default={true}
                                                setInfoCheckout={(name, phone, address) => { setInfoCheckout(name, phone, address) }} />
                                            {showListAddress()}
                                        </div>
                                        <div className='checkout-add-address'>
                                            <button onClick={showAddAddress} type="button" className="text-blue-800 hover:text-blue-800 border border-blue-700 hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                                                Thêm địa chỉ
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <form onSubmit={handleSubmitAddAddress}>
                                        <div className="modal__body checkout-list-address">
                                            <input
                                                type="text"
                                                id="address-name"
                                                name="address-name"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Họ và Tên"
                                                required />
                                            <input
                                                type="number"
                                                id="address-phone"
                                                name="address-phone"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Số điện thoại"
                                                required />
                                            <input
                                                type="text"
                                                id="address-address"
                                                name="address-address"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Địa chỉ nhận hàng"
                                                required />
                                        </div>
                                        <div className='checkout-add-address'>
                                            <button className="text-blue-800 hover:text-blue-800 border border-blue-700 hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                                                Thêm địa chỉ
                                            </button>
                                        </div>
                                    </form>
                                )
                            }
                        </div>
                    </div>
                </div>
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
                                <StripePaymentModal
                                    data={dataOrder}
                                    loading={() => loading()}
                                    closeLoading={() => closeLoading()}
                                />
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
                                <div className='checkout-button-address'>
                                    <h5 className='text-xm font-bold text-gray-800 dark:text-white'>
                                        Thông tin nhận hàng
                                    </h5>
                                    <button onClick={chooseAddress} type='button' className="text-sm text-gray font-semibold hover:bg-gray-100 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                        Chọn địa chỉ
                                    </button>
                                </div>
                                <form>
                                    <div>
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Họ và tên:
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            disabled
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Nguyễn Văn A"
                                            onChange={changeName}
                                            defaultValue={name}
                                            required />
                                    </div>
                                    <div>
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Số điện thoại:
                                        </label>
                                        <input
                                            type="number"
                                            id="phone"
                                            disabled
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="0123123123"
                                            onChange={changePhone}
                                            defaultValue={phone}
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
                                            disabled
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Địa chỉ"
                                            onChange={changeAddress}
                                            defaultValue={address}
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
            <StripeContainer
                data={props.data}
                loading={() => props.loading()}
                closeLoading={() => props.closeLoading()}
            />
        </div>
    )
}


function Address(props) {
    const setInfo = () => {
        props.setInfoCheckout(props.name, props.phone, props.address)
    }
    const deleteAddress = () => {
        props.deleteAddress(props.id)
    }
    return (
        <div className='checkout-cart-address hover:bg-gray-100 border border-gray-300 rounded-lg'>
            <div onClick={setInfo}>
                <p className="text-base font-semibold">
                    {props.name}
                </p>
                <p className="text-base font-semibold">
                    {props.phone}
                </p>
                <p className="text-base font-semibold">
                    {props.address}
                </p>
            </div>
            {
                props.default ? (
                    <div className='checkout-cart-address-action'>
                        <p className='text-blue-800 text-sm font-semibold'>
                            Mặc định
                        </p>
                    </div>
                ) : (
                    <div className='checkout-cart-address-action'>
                        <button onClick={deleteAddress} className='text-red-800 text-sm font-semibold'>
                            Xoá
                        </button>
                    </div>
                )
            }
        </div>
    )
}