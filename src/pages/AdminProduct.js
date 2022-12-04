import { useState, useEffect } from 'react';
import './Admin.css'
import { Dropdown } from 'flowbite-react';
import SideBarAdmin from '../components/SideBarAdmin';
import axios from 'axios';
import { getToken } from './Refresh';

const HOST = process.env.REACT_APP_HOST

export default function AdminProduct() {
    const [statusFilter, setStatusFilter] = useState("Tất cả")
    const [statusCategory, setStatusCategory] = useState("Tất cả")
    const [product, setProduct] = useState([])
    const [next, setNext] = useState()
    const [present, setPresent] = useState(HOST + "/admin/user/list/")
    const [previous, setPrevious] = useState()

    const [category, setCategory] = useState("")

    const handleCategory = (e, category) => {
        if (category === 1) {
            setStatusCategory("Phân bón")
            setCategory("&category=1")
            
        } else if (category === 2) {
            setStatusCategory("Thuốc đặt trị")
            setCategory("&category=2")
            
            
        } else if (category === 3) {
            setStatusCategory("Thuốc kích thích")
            setCategory("&category=3")
            
            
        } else if (category === 4) {
            setCategory("&category=4")
            setStatusCategory("Chế phẩm sinh học")
            
            
        }else if (category === 5) {
            setStatusCategory("Vi sinh")
            setCategory("&category=5")
            
            
        } else {
            setStatusCategory("Tất cả")
            setCategory("")
            
        }

        setStatusFilter("Tất cả")
    }

    const handleFilter = (e, status) => {
        console.log(status)
        if (status === "All") {
            setStatusFilter("Tất cả")
            loadData()
        } else if (status === "Active") {
            setStatusFilter("Kích hoạt")
            loadDataFilterActive()
        } else if (status === "Block") {
            setStatusFilter("Bị khoá")
            loadDataFilterBlock()
        } else {
            setStatusFilter("Chưa kích hoạt")
            loadDataFilterPending()
        }
    }
    const loadDataFilterActive = async () => {
        setPresent(HOST + "/admin/product/list/?is_active=true&is_block=false" + category)
        var config = {
            method: 'get',
            url: HOST + "/admin/product/list/?is_active=true&is_block=false" + category,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        };
        await axios(config)
            .then(function (response) {
                setNext(response.data.next)
                setPrevious(response.data.previous)
                setProduct(response.data.results)
            })
            .catch(function (error) {

            });
    }
    const loadDataFilterPending = async () => {
        setPresent(HOST + "/admin/product/list/?is_active=false&is_block=false")
        var config = {
            method: 'get',
            url: HOST + "/admin/product/list/?is_active=false&is_block=false",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        };
        await axios(config)
            .then(function (response) {
                setNext(response.data.next)
                setPrevious(response.data.previous)
                setProduct(response.data.results)
            })
            .catch(function (error) {

            });
    }
    const loadDataFilterBlock = async () => {
        setPresent(HOST + "/admin/product/list/?is_block=true" + category)
        var config = {
            method: 'get',
            url: HOST + "/admin/product/list/?is_block=true" + category,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        };
        await axios(config)
            .then(function (response) {
                setNext(response.data.next)
                setPrevious(response.data.previous)
                setProduct(response.data.results)
            })
            .catch(function (error) {

            });
    }
    const handleSearch = async (e) => {
        e.preventDefault()
        const dataSubmit = new FormData(e.currentTarget);
        setPresent(HOST + "/admin/product/list/?ordering=-created_at&search=" + dataSubmit.get('search-product'))
        var config = {
            method: 'get',
            url: HOST + "/admin/product/list/?ordering=-created_at&search=" + dataSubmit.get('search-product'),
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        };
        await axios(config)
            .then(function (response) {
                setNext(response.data.next)
                setProduct(response.data.results)
            })
            .catch(function (error) {

            });
    }

    const loadData = async () => {
        setPresent(HOST + "/admin/product/list/?ordering=-created_at" + category)
        var config = {
            method: 'get',
            url: HOST + "/admin/product/list/?ordering=-created_at" + category,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        };
        await axios(config)
            .then(function (response) {
                setNext(response.data.next)
                setProduct(response.data.results)
            })
            .catch(function (error) {
                getToken()
                axios(config)
                    .then(function (response) {
                        setNext(response.data.next)
                        setProduct(response.data.results)
                    })
                    .catch(function (error) {

                    });
            });
    }

    const reloadPage = async () => {
        var config = {
            method: 'get',
            url: present,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        };
        await axios(config)
            .then(function (response) {
                setNext(response.data.next)
                setPrevious(response.data.previous)
                setProduct(response.data.results)
            })
            .catch(function (error) {

            });
    }

    const loadNextPage = async () => {
        setPresent(next)
        var config = {
            method: 'get',
            url: next,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        };
        await axios(config)
            .then(function (response) {
                setNext(response.data.next)
                setPrevious(response.data.previous)
                setProduct(response.data.results)
            })
            .catch(function (error) {

            });
    }
    const loadPreviousPage = async () => {

        setPresent(previous)
        var config = {
            method: 'get',
            url: previous,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        };
        await axios(config)
            .then(function (response) {
                setNext(response.data.next)
                setPrevious(response.data.previous)
                setProduct(response.data.results)
            })
            .catch(function (error) {

            });
    }

    const handleLock = async (id) => {
        var data = JSON.stringify({
            "is_block": true,
        });
        var config = {
            method: 'put',
            url: HOST + '/admin/product/update/' + id + "/",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            data: data
        };
        await axios(config)
            .then(function (response) {
                reloadPage()
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    const handleUnlock = async (id) => {
        var data = JSON.stringify({
            "is_block": false
        });
        var config = {
            method: 'put',
            url: HOST + '/admin/product/update/' + id + "/",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            data: data
        };
        await axios(config)
            .then(function (response) {
                reloadPage()
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(() => {
        loadData()
    }, [category])
    const listProduct = () => {
        let element = product.map((item, index) => {
            return <StoreUser key={index}
                id={item.id}
                product_name={item.name}
                image={item.image}
                is_active={item.is_active}
                is_block={item.is_block}
                store_name={item.created_by.full_name}
                handleLock={(id) => { handleLock(id) }}
                handleUnlock={(id) => { handleUnlock(id) }}
            />
        })
        return element;
    }
    return (
        <div>
            <div className='display-flex'>
                <SideBarAdmin AdminProduct="true" />
            </div>
            <div className='admin-container'>
                <div className='admin-user'>
                    <div className='display-flex-only justify-content-sb-only'>
                        <div className='admin-user-search'>
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
                        <div className='admin-user-filter'>
                            <Dropdown
                                label={"Loại: " + statusCategory}
                                inline={true}>
                                <h1 onClick={(e) => handleCategory(e, 0)}>
                                    <Dropdown.Item>
                                        <p>Tất cả</p>
                                    </Dropdown.Item>
                                </h1>
                                <h1 onClick={(e) => handleCategory(e, 1)}>
                                    <Dropdown.Item>
                                        <p>Phân bón</p>
                                    </Dropdown.Item>
                                </h1>
                                <h1 onClick={(e) => handleCategory(e, 2)}>
                                    <Dropdown.Item>
                                        <p>Thuốc đặt trị</p>
                                    </Dropdown.Item>
                                </h1>
                                <h1 onClick={(e) => handleCategory(e, 3)}>
                                    <Dropdown.Item>
                                        <p>Thuốc kích thích</p>
                                    </Dropdown.Item>
                                </h1>
                                <h1 onClick={(e) => handleCategory(e, 4)}>
                                    <Dropdown.Item>
                                        <p>Chế phẩm sinh học</p>
                                    </Dropdown.Item>
                                </h1>
                                <h1 onClick={(e) => handleCategory(e, 5)}>
                                    <Dropdown.Item>
                                        <p>Vi sinh</p>
                                    </Dropdown.Item>
                                </h1>
                            </Dropdown>
                        </div>
                        <div className='admin-user-filter'>
                            <Dropdown
                                label={"Trạng thái: " + statusFilter}
                                inline={true}>
                                <h1 onClick={(e) => handleFilter(e, 'All')}>
                                    <Dropdown.Item>
                                        <p>Tất cả</p>
                                    </Dropdown.Item>
                                </h1>
                                <h1 onClick={(e) => handleFilter(e, 'Active')}>
                                    <Dropdown.Item>
                                        <p>Kích hoạt</p>
                                    </Dropdown.Item>
                                </h1>
                                <h1 onClick={(e) => handleFilter(e, 'Block')}>
                                    <Dropdown.Item>
                                        <p>Bị khoá</p>
                                    </Dropdown.Item>
                                </h1>
                            </Dropdown>
                        </div>
                    </div>
                    <div className='admin-user-title bg-gray-200'>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>
                            Hình ảnh
                        </p>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>
                            Tên sản phẩm
                        </p>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>

                        </p>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>
                            Trạng thái
                        </p>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>
                            Cửa hàng
                        </p>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>

                        </p>
                    </div>
                    <div className='admin-list'>
                        {listProduct()}
                    </div>
                    <div className='pagination'>
                        <button onClick={loadPreviousPage} type="button" className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            Trang trước
                        </button>
                        <button onClick={loadNextPage} type="button" className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            Trang kế
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StoreUser(props) {
    const [action, setAction] = useState("admin-action-hide")
    const showStatus = () => {
        if (props.is_block) {
            return (
                <p className='text-base font-semibold text-red-500 dark:text-gray-300'>
                    Bị khoá
                </p>
            )
        }
        else if (props.is_active) {
            return (
                <p className='text-base font-semibold text-green-500 dark:text-gray-300'>
                    Kích hoạt
                </p>
            )
        } else {
            return (
                <p className='text-base font-semibold text-blue-500 dark:text-gray-300'>
                    Chưa kích hoạt
                </p>
            )
        }
    }
    const showDetail = () => {
        console.log(props.id)
    }
    const showAction = () => {
        if (action === "admin-action-hide") {
            setAction("admin-action")
        } else {
            setAction("admin-action-hide")
        }
    }

    const handleLock = () => {
        showAction()
        props.handleLock(props.id)
    }
    const handleUnlock = () => {
        showAction()
        props.handleUnlock(props.id)
    }
    return (
        <div onClick={showDetail} className='admin-user-store'>
            <p className='text-base font-semibold text-gray-600 dark:text-gray-300'>
                <img
                    src={props.image}
                    alt="Flowbite Logo"
                />
            </p>
            <p className='text-base font-semibold text-gray-600 dark:text-gray-300'>
                {props.product_name}
            </p>
            <p className='text-base font-semibold text-gray-600 dark:text-gray-300'>
                {props.phone}
            </p>
            {showStatus()}
            <p className='text-sm font-semibold text-gray-600 dark:text-gray-300'>
                {props.store_name}
            </p>
            <p className='text-base font-semibold text-gray-600 dark:text-gray-300'>
                <button onClick={showAction}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                </button>
                <div className={action}>
                    <button onClick={handleUnlock} type="button" className="text-green-500 bg-white hover:bg-gray-200 font-medium rounded-sm text-sm  py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Mở khoá
                    </button>
                    <button onClick={handleLock} type="button" className="text-red-500 bg-white hover:bg-gray-200 font-medium rounded-sm text-sm  py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Khoá
                    </button>
                </div>
            </p>
        </div>
    )
}