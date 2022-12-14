import { useState, useEffect } from 'react';
import './Business.css'
import { Dropdown } from 'flowbite-react';
import SideBarBusiness from '../components/SideBarBusiness';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getToken } from './Refresh';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HOST = process.env.REACT_APP_HOST

export default function BusinessProduct() {
    const [statusFilter, setStatusFilter] = useState("Tất cả")
    const [product, setProduct] = useState([])
    const [showListProduct, setShowListProduct] = useState("business-product")
    const [showAddProduct, setShowAddProduct] = useState("business-add-product hide")

    const [next, setNext] = useState()
    const [previous, setPrevious] = useState()

    const handleFilter = (e, status) => {
        console.log(status)
        if (status === "All") {
            setStatusFilter("Tất cả")
            getListProduct()
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

        var config = {
            method: 'get',
            url: HOST + "/business/product/?is_active=true&is_block=false",
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

        var config = {
            method: 'get',
            url: HOST + "/business/product/?is_active=false&is_block=false",
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

        var config = {
            method: 'get',
            url: HOST + "/business/product/?is_block=true",
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
                getToken()

                axios(config)
                    .then(function (response) {
                        setNext(response.data.next)
                        setPrevious(response.data.previous)
                        setProduct(response.data.results)
                    })
                    .catch(function (error) {
                    });
            });
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        const dataSubmit = new FormData(e.currentTarget);
        var config = {
            method: 'get',
            url: HOST + "/business/product/?search=" + dataSubmit.get('search-product'),
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
            });
    }

    const getListProduct = async () => {
        var config = {
            method: 'get',
            url: HOST + '/business/product/?ordering=-created_at',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        };
        await axios(config)
            .then(function (response) {
                setProduct(response.data.results)
                setNext(response.data.next)
            })
            .catch(function (error) {
                getToken()

                axios(config)
                    .then(function (response) {
                        setProduct(response.data.results)
                        setNext(response.data.next)
                    })
                    .catch(function (error) {
                        getToken()
                    });
            });
    }

    useEffect(() => {
        getListProduct()
    }, [])
    const listProduct = () => {
        let element = product.map((product, index) => {
            return <StoreUser key={index}
                id={product.id}
                name={product.name}
                image={product.image}
                is_block={product.is_block}
                is_active={product.is_active}
                business_status={product.created_by.business_status}
                category={product.category}
                sold={product.sold}
                amount={product.amount}

            />
        })
        return element;
    }
    const addProduct = () => {
        setShowListProduct("business-product hide")
        setShowAddProduct("business-add-product")
    }
    const cancelAddProduct = () => {
        setShowListProduct("business-product")
        setShowAddProduct("business-add-product hide")
        getListProduct()
    }
    return (
        <div>
            <div className='display-flex'>
                <SideBarBusiness BusinessProduct="true" />
            </div>
            <div className='business-container'>
                <div className={showListProduct}>
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
                                <h1 onClick={(e) => handleFilter(e, 'Pending')}>
                                    <Dropdown.Item>
                                        <p>Chưa kích hoạt</p>
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
                           Loại sản phẩm
                        </p>
                        
                        <p>
                        </p>
                    </div>
                    <div className='business-product-list'>
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
                <div className={showAddProduct}>
                    <button onClick={cancelAddProduct} className='display-flex-only hover:text-blue-700'>
                        <svg className="w-6 h-6 text-gray-600 hover:text-blue-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        <p className='text-base ml-2 font-semibold text-gray-600 dark:text-gray-300 mb-3'>
                            Trở lại
                        </p>
                    </button>
                    <AddProduct />
                </div>
            </div>
        </div>
    )
}

function StoreUser(props) {
    const [action, setAction] = useState("business-action-hide")
    const showStatus = () => {

        if (props.is_block || props.business_status === "lock") {
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
        if (action === "business-action-hide") {
            setAction("business-action")
        } else {
            setAction("business-action-hide")
        }
    }
    return (
        <div className='business-product-store'>
            <p className='text-base font-semibold text-gray-600 dark:text-gray-300'>
                <img
                    src={props.image}
                    alt="Flowbite Logo"
                />
            </p>
            <p className='text-base font-semibold text-gray-600 dark:text-gray-300'>
                {props.name}
            </p>
            {showStatus()}
            <p className='text-sm font-semibold text-gray-600 dark:text-gray-300'>
                {props.category}
            </p>
            <p>
                <Link to={"/business/product/" + props.id} className='text-base font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-700'>
                    <button onClick={showAction}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                    </button>
                </Link>
            </p>
        </div>
    )
}

function AddProduct() {
    const [image, setImage] = useState("");
    const [imageUpload, setImageUpload] = useState("")
    const [isUploaded, setIsUploaded] = useState(false);

    const [category, setCategory] = useState([])
    // <option value="1">Phân bón</option>
    //                             <option value="2">Thuốc đặt trị</option>
    //                             <option value="3">Thuốc kích thích</option>
    //                             <option value="4">Chế phẩm sinh học</option>
    //                             <option value="4">Vi sinh</option>

    const loadCategory = async () => {
        var config = {
            method: 'get',
            url: HOST + '/product/category/',
            headers: {}
        };

        await axios(config)
            .then(function (response) {
                setCategory(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const listCategory = () => {
        let element = category.map((item, index) => {
            return <option key={index} value={item.id}>
                {item.name}
            </option>
        })
        return element;
    }

    useEffect(() => {
        loadCategory()
    }, [])

    const handleSubmit = async (e) => {
        console.log(imageUpload)
        e.preventDefault();
        let formData = new FormData();

        const dataSubmit = new FormData(e.currentTarget);
        let isActive = false
        if (dataSubmit.get('active') !== null) {
            isActive = true
        }

        formData.append('name', dataSubmit.get('product_name'));
        formData.append('price', dataSubmit.get('price'));
        formData.append('sale', dataSubmit.get('sale'));
        formData.append('description', dataSubmit.get('description'));
        formData.append('element', dataSubmit.get('element'));
        formData.append('type', dataSubmit.get('type'));
        formData.append('effect', dataSubmit.get('effect'));
        formData.append('product_by', dataSubmit.get('company'));
        formData.append('image', imageUpload);
        formData.append('is_active', isActive);
        formData.append('category', dataSubmit.get('category'));
        formData.append('amount', dataSubmit.get('amount'));

        var config = {
            method: 'post',
            url: HOST + '/business/product/',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },
            data: formData
        };

        await axios(config)
            .then(function (response) {
                toastSuccess()
            })
            .catch(function (error) {
                console.log(error);
                toastError()
            });

    }

    const toastSuccess = () => toast.success('Đã thêm sản phẩm!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });;

    const toastError = () => toast.error('Lỗi rồi, thử lại sau nhé!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();

            reader.onload = function (e) {
                setImage(e.target.result)
                setIsUploaded(true)
            }

            reader.readAsDataURL(e.target.files[0])
            setImageUpload(e.target.files[0])
        }
    }
    return (
        <form onSubmit={handleSubmit}>
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
            <div className='display-flex-only'>
                <div className='business-add-info-product'>
                    <div className='display-flex-only'>
                        <div className='business-add-product-input'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Tên sản phẩm
                            </label>
                            <input
                                type="text"
                                id="product_name"
                                name="product_name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder=""
                            />
                        </div>
                        <div className='business-add-product-input'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Loại sản phẩm
                            </label>
                            <select
                                id="category"
                                name="category"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                {listCategory()}
                            </select>
                        </div>
                    </div>
                    <div className='display-flex-only'>
                        <div className='business-add-product-input'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Công ty sản xuất
                            </label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder=""
                            />
                        </div>
                        <div className='business-add-product-input'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Số lượng tại cửa hàng
                            </label>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className='display-flex-only'>
                        <div className='business-add-product-input'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Giá bán
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder=""
                            />
                        </div>
                        <div className='business-add-product-input'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Giá khuyến mãi
                            </label>
                            <input
                                type="number"
                                id="sale"
                                name="sale"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder=""
                            />
                        </div>
                    </div>
                </div>
                <div className='business-add-info-product'>
                    <div className='business-add-image-product'>
                        <div>
                            {
                                !isUploaded ? (
                                    <>
                                        <label htmlFor="upload-input" className="upload-image">
                                            <img src='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png' alt='logo'></img>
                                            {/* <div>Tải ảnh lên</div> */}
                                            <input
                                                hidden
                                                type="file"
                                                id="upload-input"
                                                accept=".jpg,.jpeg,.png"
                                                onChange={handleImageChange}
                                            />
                                        </label>

                                    </>
                                ) : (
                                    <>
                                        <label htmlFor="upload-input">
                                            <input
                                                hidden
                                                type="file"
                                                id="upload-input"
                                                accept=".jpg,.jpeg,.png"
                                                onChange={handleImageChange}
                                            />
                                            <img className="uploaded-img" id="uploaded-img" src={image} alt="uploaded-img" />
                                        </label>

                                    </>

                                )
                            }
                        </div>

                    </div>
                </div>
            </div>
            <div className='display-flex-only'>
                <div className='business-add-product-textarea'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Thành phần
                    </label>
                    <textarea
                        id="element"
                        name="element"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="">

                    </textarea>
                </div>
                <div className='business-add-product-textarea'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Dạng thuốc
                    </label>
                    <textarea
                        id="type"
                        name="type"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                    >

                    </textarea>
                </div>
            </div>
            <div className='display-flex-only'>
                <div className='business-add-product-textarea'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Mô tả sản phẩm
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows="6"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        defaultValue=""
                    >

                    </textarea>
                </div>
                <div className='business-add-product-textarea'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Cơ chế tác dộng
                    </label>
                    <textarea
                        id="effect"
                        name="effect"
                        rows="6"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="">
                    </textarea>
                </div>
            </div>
            <div>
                <label className="inline-flex relative items-center cursor-pointer">
                    <input type="checkbox" defaultChecked="" name="active" id="active" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Active</span>
                </label>
            </div>
            <div className='business-add-product-button-form'>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Thêm
                </button>
            </div>
        </form>
    )
}