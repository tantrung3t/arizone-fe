
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBarBusiness from "../components/SideBarBusiness";
import './Business.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";
import { getToken } from './Refresh';
import { async } from "@firebase/util";

const HOST = process.env.REACT_APP_HOST

export default function BusinessDetailOrder(props) {

    const [data, setData] = useState()
    const [loading, setLoading] = useState()

    useEffect(() => {
        getDetailOrder()
    }, [])

    const updateOrder = async (status) => {
        var data = {
            "status": status
        };

        var config = {
            method: 'put',
            url: HOST + '/business/order/update/' + props.id + '/',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(config)
            .then(function (response) {
                toastSuccess()
                getDetailOrder()
                // setTimeout(() => {
                //     getDetailOrder()
                // }, 2200)
            })
            .catch(function (error) {
                toastError()
            });
    }
    const listProductOrder = () => {
        let element = data.product_detail.map((product, index) => {
            return <ProductOrder
                key={index}
                data={product}
            />
        })
        return element;
    }

    const getDetailOrder = async () => {
        var config = {
            method: 'get',
            url: HOST + '/business/order/' + props.id,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        };
        await axios(config)
            .then(function (response) {
                setData(response.data)
                setLoading(1)
            })
            .catch(function (error) {
                getToken()
                axios(config)
                    .then(function (response) {
                        setData(response.data)
                    })
                    .catch(function (error) {

                    });
            });
    }

    const showStatus = () => {
        console.log(data.status)
        if (data.status === "pending") {
            return (
                <p className='text-lg font-bold text-yellow-500 dark:text-gray-300'>
                    Chờ chấp nhận
                </p>
            )
        }
        else if (data.status === "shipping") {
            return (
                <p className='text-lg font-bold text-blue-500 dark:text-gray-300'>
                    Đã chấp nhận
                </p>
            )
        } else if (data.status === "success") {
            return (
                <p className='text-lg font-bold text-green-500 dark:text-gray-300'>
                    Thành công
                </p>
            )
        } else {
            return (
                <p className='text-lg font-bold text-red-500 dark:text-gray-300'>
                    Đã huỷ
                </p>
            )
        }
    }

    const toastSuccess = () => toast.success('Cập nhật đơn hàng thành công!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });;

    const toastError = () => toast.error('Lỗi rồi, thử lại sau nhé!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const shipping = () => {
        updateOrder("shipping")
    }
    const cancel = () => {
        updateOrder("cancel")
    }
    const success = () => {
        updateOrder("success")
    }

    return (
        <div>
            <div className='display-flex'>
                <SideBarBusiness BusinessOrder="true" />
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            {loading ? (
                <div className="business-container">
                    <div className="business-add-product min-width-550">
                        <Link to="/business/orders/" className='display-flex-only hover:text-blue-700'>
                            <svg className="w-6 h-6 text-gray-600 hover:text-blue-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            <p className='text-base ml-2 font-semibold text-gray-600 dark:text-gray-300 mb-3'>
                                Trở lại
                            </p>
                        </Link>
                        <div className="display-flex-only justify-content-sb-only">
                            <div>
                                <p className="text-xl font-bold text-gray-800 dark:text-gray-300 ">
                                    Mã đơn hàng: {props.id}
                                </p>
                                <div className="text-lg font-bold text-gray-600 dark:text-gray-300 ">
                                    Trạng thái:
                                    {showStatus()}
                                </div>
                            </div>
                            <div className="order-info">
                                <p className="text-xl font-bold text-gray-800 dark:text-gray-300 mb-2">
                                    Người đặt hàng:
                                </p>
                                <p className="text-lg font-semibold text-gray-800 dark:text-gray-300 ">
                                    {data.full_name}
                                </p>
                                <p className="text-lg font-semibold text-gray-800 dark:text-gray-300 ">
                                    {data.phone}
                                </p>
                                <p className="text-lg font-semibold text-gray-800 dark:text-gray-300 ">
                                    {data.address}
                                </p>
                            </div>
                        </div>
                        <div className="list-product-order display-flex-only justify-content-sa-only mt-7">
                            <p className='text-lg font-semibold text-gray-600 dark:text-gray-300'>
                                Tên sản phẩm
                            </p>
                            <p className='text-lg font-semibold text-gray-600 dark:text-gray-300'>
                                Đơn giá
                            </p>
                            <p className='text-lg font-semibold text-gray-600 dark:text-gray-300'>
                                Số lượng
                            </p>
                            <p className='text-lg font-semibold text-gray-600 dark:text-gray-300'>
                                Thành tiền
                            </p>
                        </div>
                        {listProductOrder()}
                        <div className="list-product-order display-flex-only justify-content-sa-only">
                            <span className='text-lg font-bold text-gray-800 dark:text-gray-300'>
                                Tổng tiền:
                            </span>
                            <span className='text-lg font-bold text-gray-800 dark:text-gray-300'>
                                {data.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                            </span>
                        </div>
                        <div className="list-product-order display-flex-only justify-content-sa-only">
                            <span className='text-lg font-bold text-gray-800 dark:text-gray-300'>
                                Đã thanh toán:
                            </span>
                            {
                                (data.payment === "online" || data.status === "success") ? (
                                    <span className='text-lg font-bold text-gray-800 dark:text-gray-300'>
                                        {data.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                                    </span>
                                ) : (
                                    <span className='text-lg font-bold text-gray-800 dark:text-gray-300'>
                                        0đ
                                    </span>
                                )
                            }
                        </div>
                        <div className="business-order-action">
                            <div className=" mt-10 display-flex-only justify-content-ct-only">

                                {
                                    (data.status === "pending") ? (
                                        <button onClick={shipping} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                            Chấp nhận
                                        </button>
                                    ) : (
                                        <button className="cursor-not-allowed text-white bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" disabled>
                                            Chấp nhận
                                        </button>
                                    )
                                }
                                {
                                    (data.status === "success") ? (
                                        <button className="cursor-not-allowed text-white bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800" disabled>
                                            Huỷ đơn
                                        </button>
                                    ) : (
                                        <button onClick={cancel} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                                            Huỷ đơn
                                        </button>

                                    )
                                }
                                {
                                    (data.status === "cancel" || data.status === "pending") ? (
                                        <button className="cursor-not-allowed text-white bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800" disabled>
                                            Thành công
                                        </button>
                                    ) : (
                                        <button onClick={success} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">
                                            Thành công
                                        </button>

                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="loading">
                    <div role="status" className='w-20 h-20'>
                        <svg aria-hidden="true" className="mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                </div>
            )
            }


        </div>
    )
}


function ProductOrder(props) {
    return (
        <>
            {
                props.data.sale ? (
                    <div className="list-product-order display-flex-only justify-content-sa-only">
                        <div>
                            {props.data.product.name}
                        </div>
                        <div>
                            {props.data.sale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                        </div>
                        <div>
                            {props.data.quantity}
                        </div>
                        <div>
                            {(props.data.sale * props.data.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                        </div>
                    </div>
                ) : (
                    <div className="list-product-order display-flex-only justify-content-sa-only">
                        <div>
                            {props.data.product.name}
                        </div>
                        <div>
                            {props.data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                        </div>
                        <div>
                            {props.data.quantity}
                        </div>
                        <div>
                            {(props.data.price * props.data.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                        </div>
                    </div>
                )
            }
        </>
    )
}