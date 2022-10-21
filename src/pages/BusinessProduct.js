import { useState, useEffect } from 'react';
import './Business.css'
import { Dropdown } from 'flowbite-react';
import SideBarBusiness from '../components/SideBarBusiness';

const store = [
    {
        store_name: "hình",
        email: "Sản phẩm 1",
        phone: "",
        status: "Active",
        address: "Cửa hàng A"
    },
    {
        store_name: "",
        email: "Sản phẩm 2",
        phone: "",
        status: "Pending",
        address: "Cửa hàng A"
    },
    {
        store_name: "",
        email: "Sản phẩm 3",
        phone: "",
        status: "Active",
        address: "Cửa hàng B"
    },
    {
        store_name: "",
        email: "Sản phẩm 4",
        phone: "",
        status: "Block",
        address: "Cửa hàng A"
    },
    {
        store_name: "",
        email: "Sản phẩm 5",
        phone: "",
        status: "Active",
        address: "Cửa hàng B"
    },
    ,
    {
        store_name: "",
        email: "Sản phẩm 2",
        phone: "",
        status: "Pending",
        address: "Cửa hàng A"
    },
    {
        store_name: "",
        email: "Sản phẩm 4",
        phone: "",
        status: "Block",
        address: "Cửa hàng A"
    },
    {
        store_name: "",
        email: "Sản phẩm 5",
        phone: "",
        status: "Active",
        address: "Cửa hàng B"
    }
]

export default function BusinessProduct() {
    const [statusFilter, setStatusFilter] = useState("All")
    const [product, setProduct] = useState([])
    const [showAddProduct, setShowAddProduct] = useState("business-product")
    const handleFilter = (e, status) => {
        console.log(status)
        if (status === "All") {
            setStatusFilter("All")
        } else if (status === "Active") {
            setStatusFilter("Active")
        } else if (status === "Block") {

            setStatusFilter("Block")
        } else {
            setStatusFilter("Pending")
        }
    }
    const handleSearch = (e) => {
        e.preventDefault()
        const dataSubmit = new FormData(e.currentTarget);
        console.log(dataSubmit.get('search-product'))
    }
    useEffect(() => {
        setProduct(store)
    }, [])
    const listProduct = () => {
        let element = product.map((user, index) => {
            return <StoreUser key={index}
                id={index}
                store_name={user.store_name}
                email={user.email}
                phone={user.phone}
                status={user.status}
                address={user.address}
            />
        })
        return element;
    }
    const addProduct = () => {
        setShowAddProduct("business-product-hide")
    }
    return (
        <div>
            <div className='display-flex'>
                <SideBarBusiness BusinessProduct="true" />
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
                        <div className='business-add-product-button'>
                            <button onClick={addProduct} type="button" className="text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Thêm sản phẩm
                            </button>
                        </div>
                    </div>
                    <div className='business-product-title bg-gray-200'>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>
                            Hình ảnh
                        </p>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>
                            Tên sản phẩm
                        </p>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>
                            Trạng thái
                        </p>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>
                            Đã bán
                        </p>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>
                            Trong kho
                        </p>
                        <p>
                        </p>
                    </div>
                    <div className='business-product-list'>
                        {listProduct()}
                    </div>
                    <div className='pagination'>
                        <button type="button" className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            Trang trước
                        </button>
                        <button type="button" className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            Trang kế
                        </button>
                    </div>
                </div>

                <div className='business-add-product'>
                </div>
            </div>
        </div>
    )
}

function StoreUser(props) {
    const [action, setAction] = useState("business-action-hide")
    const showStatus = () => {
        if (props.status === "Active") {
            return (
                <p className='text-base font-semibold text-green-500 dark:text-gray-300'>
                    Active
                </p>
            )
        }
        else if (props.status === "Block") {
            return (
                <p className='text-base font-semibold text-red-500 dark:text-gray-300'>
                    Block
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
        <div onClick={showDetail} className='business-product-store'>
            <p className='text-base font-semibold text-gray-600 dark:text-gray-300'>
                <img
                    src="https://h5p.org/sites/default/files/h5p/content/1209180/images/file-6113d5f8845dc.jpeg"
                    alt="Flowbite Logo"
                />
            </p>
            <p className='text-base font-semibold text-gray-600 dark:text-gray-300'>
                {props.email}
            </p>
            {showStatus()}
            <p className='text-sm font-semibold text-gray-600 dark:text-gray-300'>
                12
            </p>
            <p className='text-sm font-semibold text-gray-600 dark:text-gray-300'>
                50
            </p>
            <p className='text-base font-semibold text-gray-600 dark:text-gray-300'>
                <button onClick={showAction}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                </button>
            </p>
        </div>
    )
}