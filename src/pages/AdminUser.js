import SideBarAdmin from '../components/SideBarAdmin';
import './Admin.css'
import { Dropdown } from 'flowbite-react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
const HOST = process.env.REACT_APP_HOST

export default function AdminUser() {
    const [statusFilter, setStatusFilter] = useState("All")
    const [account, setAccount] = useState([])
    const [next, setNext] = useState()
    const [present, setPresent] = useState(HOST + "/admin/user/list/")
    const [previous, setPrevious] = useState()
    const handleFilter = (e, status) => {
        console.log(status)
        if (status === "All") {
            setStatusFilter("All")
            loadData()
        } else if (status === "Active") {
            setStatusFilter("Active")
            loadDataFilterActive()
        } else if (status === "Block") {
            setStatusFilter("Block")
            loadDataFilterBlock()
        } else {
            setStatusFilter("Pending")
            loadDataFilterPending()
        }
    }
    const loadDataFilterActive = async () => {
        setPresent(HOST + "/admin/user/list/?is_active=true&business_status=active")
        var config = {
            method: 'get',
            url: HOST + "/admin/user/list/?is_active=true&business_status=active",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        };
        await axios(config)
            .then(function (response) {
                setNext(response.data.next)
                setPrevious(response.data.previous)
                setAccount(response.data.results)
            })
            .catch(function (error) {

            });
    }
    const loadDataFilterPending = async () => {
        setPresent(HOST + "/admin/user/list/?is_active=true&business_status=pending")
        var config = {
            method: 'get',
            url: HOST + "/admin/user/list/?is_active=true&business_status=pending",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        };
        await axios(config)
            .then(function (response) {
                setNext(response.data.next)
                setPrevious(response.data.previous)
                setAccount(response.data.results)
            })
            .catch(function (error) {

            });
    }
    const loadDataFilterBlock = async () => {
        setPresent(HOST + "/admin/user/list/?is_active=false")
        var config = {
            method: 'get',
            url: HOST + "/admin/user/list/?is_active=false",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        };
        await axios(config)
            .then(function (response) {
                setNext(response.data.next)
                setPrevious(response.data.previous)
                setAccount(response.data.results)
            })
            .catch(function (error) {

            });
    }
    const handleSearch = async (e) => {
        e.preventDefault()
        const dataSubmit = new FormData(e.currentTarget);
        setPresent(HOST + "/admin/user/list/?search=" + dataSubmit.get('search-user'))
        var config = {
            method: 'get',
            url: HOST + "/admin/user/list/?search=" + dataSubmit.get('search-user'),
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        };
        await axios(config)
            .then(function (response) {
                setNext(response.data.next)
                setPrevious(HOST + "/admin/user/list/?search=" + dataSubmit.get('search-user'))
                setAccount(response.data.results)
            })
            .catch(function (error) {

            });
    }

    const loadData = async () => {
        setPresent(HOST + "/admin/user/list/?ordering=-date_joined")
        var config = {
            method: 'get',
            url: HOST + "/admin/user/list/?ordering=-date_joined",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        };
        await axios(config)
            .then(function (response) {
                setNext(response.data.next)
                setPrevious(HOST + "/admin/user/list/?ordering=-date_joined")
                setAccount(response.data.results)
            })
            .catch(function (error) {
                
            });
    }

    const reloadPage = async () => {
        console.log(present)
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
                setAccount(response.data.results)
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
                setAccount(response.data.results)
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
                setAccount(response.data.results)
            })
            .catch(function (error) {

            });
    }

    const handleActive = async (id) => {
        var data = JSON.stringify({
            "is_active": true,
            "business_status": "active"
        });
        var config = {
            method: 'put',
            url: HOST + '/admin/user/' + id + "/",
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
    const handleBlock = async (id) => {
        var data = JSON.stringify({
            "is_active": false
        });
        var config = {
            method: 'put',
            url: HOST + '/admin/user/' + id + "/",
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
    }, [])
    const listStore = () => {
        let element = account.map((user, index) => {
            return <StoreUser key={index}
                data={user}
                handleActive={(id) => { handleActive(id) }}
                handleBlock={(id) => { handleBlock(id) }}

            />
        })
        return element;
    }



    return (
        <div>
            <div className='display-flex'>
                <SideBarAdmin AdminUser="true" />
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
                                    <input type="search" name="search-user" id="search-user" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                                </div>
                            </form>
                        </div>
                        <div className='admin-user-filter'>
                            <Dropdown
                                label={"Filter: " + statusFilter}
                                inline={true}>
                                <h1 onClick={(e) => handleFilter(e, 'All')}>
                                    <Dropdown.Item>
                                        <p>All</p>
                                    </Dropdown.Item>
                                </h1>
                                <h1 onClick={(e) => handleFilter(e, 'Active')}>
                                    <Dropdown.Item>
                                        <p>Active</p>
                                    </Dropdown.Item>
                                </h1>
                                <h1 onClick={(e) => handleFilter(e, 'Block')}>
                                    <Dropdown.Item>
                                        <p>Block</p>
                                    </Dropdown.Item>
                                </h1>
                                <h1 onClick={(e) => handleFilter(e, 'Pending')}>
                                    <Dropdown.Item>
                                        <p>Pending</p>
                                    </Dropdown.Item>
                                </h1>
                            </Dropdown>
                        </div>
                    </div>
                    <div className='admin-user-title bg-gray-200'>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>
                            Cửa hàng
                        </p>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>
                            Email
                        </p>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>
                            SĐT
                        </p>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>
                            Trạng thái
                        </p>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>
                            Địa chỉ
                        </p>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>

                        </p>
                    </div>
                    <div className='admin-list'>
                        {listStore()}
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
        if (props.data.is_active === false) {
            return (
                <p className='text-base font-semibold text-red-500 dark:text-gray-300'>
                    Block
                </p>
            )
        }
        else if (props.data.business_status === "active") {
            return (
                <p className='text-base font-semibold text-green-500 dark:text-gray-300'>
                    Active
                </p>
            )
        } else {
            return (
                <p className='text-base font-semibold text-blue-500 dark:text-gray-300'>
                    Pending
                </p>
            )
        }
    }
    const showAction = () => {
        if (action === "admin-action-hide") {
            setAction("admin-action")
        } else {
            setAction("admin-action-hide")
        }
    }
    const handleActive = () => {
        showAction()
        props.handleActive(props.data.id)
    }
    const handleBlock = () => {
        showAction()
        props.handleBlock(props.data.id)
    }
    return (
        <div className='admin-user-store'>
            <p className='text-base font-semibold text-gray-600 dark:text-gray-300'>
                {props.data.full_name}
            </p>
            <p className='text-base font-semibold text-gray-600 dark:text-gray-300'>
                {props.data.email}
            </p>
            <p className='text-base font-semibold text-gray-600 dark:text-gray-300'>
                {props.data.phone}
            </p>
            {showStatus()}
            <p className='text-sm font-semibold text-gray-600 dark:text-gray-300'>
                {props.data.business.address}
            </p>
            <div className='action text-base font-semibold text-gray-600 dark:text-gray-300'>
                <button onClick={showAction} className="mt-5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                </button>
                <div className={action}>
                    <button onClick={handleActive} type="button" className="text-green-500 bg-white hover:bg-gray-200 font-medium rounded-sm text-sm  py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Active
                    </button>
                    <button onClick={handleBlock} type="button" className="text-red-500 bg-white hover:bg-gray-200 font-medium rounded-sm text-sm  py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Block
                    </button>
                </div>
            </div>
        </div>
    )
}