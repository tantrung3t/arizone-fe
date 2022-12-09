import { useState, useEffect } from 'react';
import './Business.css'
import { Dropdown } from 'flowbite-react';
import SideBarBusiness from '../components/SideBarBusiness';
import axios from 'axios';
import { Link } from 'react-router-dom';


const HOST = process.env.REACT_APP_HOST

export default function BusinessOrder() {
    const [statusFilter, setStatusFilter] = useState("Tất cả")
    const [product, setProduct] = useState([])
    const [showAddProduct, setShowAddProduct] = useState("business-product")
    const [next, setNext] = useState()
    const [previous, setPrevious] = useState()
    const handleFilter = (e, status) => {
        console.log(status)
        if (status === "all") {
            setStatusFilter("Tất cả")
            loadOrder()
        } else if (status === "active") {
            setStatusFilter("Thành công")
            getDataFilter("success")
        } else if (status === "cancel") {
            getDataFilter("cancel")
            setStatusFilter("Đã huỷ")
        } else if (status === "shipping") {
            getDataFilter("shipping")
            setStatusFilter("Chấp nhận")
        }
        else {
            setStatusFilter("Chưa xử lý")
            getDataFilter("pending")
        }
    }

    const getDataFilter = (status) => {
        var config = {
            method: 'get',
            url: HOST + '/business/order/list/?ordering=-id&status=' + status,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
            }
        };

        axios(config)
            .then(function (response) {
                setOrder(response.data.results)
                setNext(response.data.next)
                setPrevious(response.data.previous)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const handleSearch = (e) => {
        e.preventDefault()
        const dataSubmit = new FormData(e.currentTarget);
        console.log(dataSubmit.get('search-product'))
    }

    const [order, setOrder] = useState([])

    const loadOrder = async () => {
        var config = {
            method: 'get',
            url: HOST + '/business/order/list/?ordering=-id',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
            }
        };

        await axios(config)
            .then(function (response) {
                setOrder(response.data.results)
                setNext(response.data.next)
                setPrevious(response.data.previous)
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    useEffect(() => {
        loadOrder()
    }, [])
    const listProduct = () => {
        let element = order.map((item, index) => {
            return <StoreUser key={index}
                id={item.id}
                full_name={item.full_name}
                payment={item.payment}
                status={item.status}
                total={item.total}
            />
        })
        return element;
    }
    const addProduct = () => {
        setShowAddProduct("business-product-hide")
    }

    const nextPage = async () => {
        var config = {
            method: 'get',
            url: next,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
            }
        };
        await axios(config)
            .then(function (response) {
                setOrder(response.data.results)
                setNext(response.data.next)
                setPrevious(response.data.previous)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const previousPage = async () => {
        var config = {
            method: 'get',
            url: previous,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
            }
        };

        await axios(config)
            .then(function (response) {
                setOrder(response.data.results)
                setNext(response.data.next)
                setPrevious(response.data.previous)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <div className='display-flex'>
                <SideBarBusiness BusinessOrder="true" />
            </div>
            <div className='business-container'>
                <div className={showAddProduct}>
                    <div className='display-flex-only justify-content-flex-end-only'>

                    </div>
                    <div className='display-flex-only justify-content-sb-only'>
                        <div className='business-product-search'>
                            <form onSubmit={handleSearch}>
                                <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Your Email</label>
                                <div className="relative">
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    </div>
                                    <input type="search" name="search-product" id="search-product" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                                </div>
                            </form>
                        </div>
                        <div className='business-filter'>
                            <Dropdown
                                label={"Bộ lọc: " + statusFilter}
                                inline={true}>
                                <h1 onClick={(e) => handleFilter(e, 'all')}>
                                    <Dropdown.Item>
                                        <p>Tất cả</p>
                                    </Dropdown.Item>
                                </h1>
                                <h1 onClick={(e) => handleFilter(e, 'shipping')}>
                                    <Dropdown.Item>
                                        <p>Chấp nhận</p>
                                    </Dropdown.Item>
                                </h1>
                                <h1 onClick={(e) => handleFilter(e, 'active')}>
                                    <Dropdown.Item>
                                        <p>Thành công</p>
                                    </Dropdown.Item>
                                </h1>
                                <h1 onClick={(e) => handleFilter(e, 'cancel')}>
                                    <Dropdown.Item>
                                        <p>Đã huỷ</p>
                                    </Dropdown.Item>
                                </h1>
                                <h1 onClick={(e) => handleFilter(e, 'pending')}>
                                    <Dropdown.Item>
                                        <p>Chưa xử lý</p>
                                    </Dropdown.Item>
                                </h1>
                            </Dropdown>
                        </div>

                    </div>
                    <div className='business-order-title bg-gray-200'>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>
                            Mã đơn hàng
                        </p>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>
                            Người đặt hàng
                        </p>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>
                            Trạng thái
                        </p>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>
                            Tổng tiền
                        </p>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>
                            Thanh toán
                        </p>
                        <p>
                        </p>
                    </div>
                    <div className='business-product-list'>
                        {listProduct()}
                    </div>
                    <div className='pagination'>
                        <button onClick={previousPage} className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            Trang trước
                        </button>
                        <button onClick={nextPage} className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            Trang kế
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StoreUser(props) {
    const [action, setAction] = useState("business-action-hide")
    const showStatus = () => {
        if (props.status === "success") {
            return (
                <p className='text-base font-semibold text-green-500 dark:text-gray-300'>
                    Thành công
                </p>
            )
        }
        else if (props.status === "cancel") {
            return (
                <p className='text-base font-semibold text-red-500 dark:text-gray-300'>
                    Đã huỷ
                </p>
            )
        } else if (props.status === "shipping") {
            return (
                <p className='text-base font-semibold text-blue-500 dark:text-gray-300'>
                    Chấp nhận
                </p>
            )
        } else {
            return (
                <p className='text-base font-semibold text-yellow-500 dark:text-gray-300'>
                    Chưa xử lý
                </p>
            )
        }
    }
    const showDetail = () => {
        console.log(props.id)
    }
    const showAction = () => {
        if (action === "business-action-hide") {
            setAction("business-action")
        } else {
            setAction("business-action-hide")
        }
    }
    return (
        <div onClick={showDetail} className='business-order-store'>
            <p className='text-base font-semibold text-gray-600 dark:text-gray-300'>
                {props.id}
            </p>
            <p className='text-base font-semibold text-gray-600 dark:text-gray-300'>
                {props.full_name}
            </p>
            {showStatus()}
            <p className='text-sm font-semibold text-gray-600 dark:text-gray-300'>
                {props.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
            </p>
            {
                props.payment === "cash" ? (
                    <p className='text-sm font-semibold text-gray-600 dark:text-gray-300'>
                        COD
                    </p>
                ) : (
                    <p className='text-sm font-semibold text-gray-600 dark:text-gray-300'>
                        Online
                    </p>
                )
            }
            <p>
                <Link to={"/business/order/" + props.id} className='text-base font-semibold text-gray-600 dark:text-gray-300'>
                    <button onClick={showAction}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                    </button>
                </Link>
            </p>
        </div>
    )
}