import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBarBusiness from "../components/SideBarBusiness";
import './Business.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";

const HOST = process.env.REACT_APP_HOST

export default function BusinessDetailProduct(props) {
    return (
        <div>
            <div className='display-flex'>
                <SideBarBusiness BusinessProduct="true" />
            </div>
            <div className="business-container">
                <div className="business-add-product">
                    <Link to="/business/products/" className='display-flex-only hover:text-blue-700'>
                        <svg className="w-6 h-6 text-gray-600 hover:text-blue-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        <p className='text-base ml-2 font-semibold text-gray-600 dark:text-gray-300 mb-3'>
                            Trở lại
                        </p>
                    </Link>
                    <AddProduct id={props.id} />
                </div>
            </div>

        </div>
    )
}

function AddProduct(props) {
    const history = useHistory();
    const [image, setImage] = useState("");
    const [imageUpload, setImageUpload] = useState("")
    const [isUploaded, setIsUploaded] = useState(false);


    const [category, setCategory] = useState([])
    // <option value="1">Phân bón</option>
    //                             <option value="2">Thuốc đặt trị</option>
    //                             <option value="3">Thuốc kích thích</option>
    //                             <option value="4">Chế phẩm sinh học</option>
    //                             <option value="4">Vi sinh</option>

    const [productDetail, setProductDetail] = useState(
        {
            "name": "",
            "category": 1,
            "image": "",
            "price": "",
            "sale": "",
            "description": "",
            "element": "",
            "type": "",
            "effect": "",
            "product_by": "",
            "is_active": true,
            "is_block": true,
            "amount": ""
        }
    )
    const [value, setValue] = useState()
    // const [, setSelect] = useState(productDetail.category)

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

    const loadData = async () => {
        var config = {
            method: 'get',
            url: HOST + '/business/product/' + props.id,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        };

        await axios(config)
            .then(function (response) {
                setProductDetail(response.data)
                setValue(response.data.category)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        loadData()
        loadCategory()
    }, [])

    const handleSelect = (e) => {
        setValue(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();

        const dataSubmit = new FormData(e.currentTarget);

        formData.append('name', dataSubmit.get('product_name'));
        formData.append('price', dataSubmit.get('price'));
        formData.append('sale', dataSubmit.get('sale'));
        formData.append('description', dataSubmit.get('description'));
        formData.append('element', dataSubmit.get('element'));
        formData.append('type', dataSubmit.get('type'));
        formData.append('effect', dataSubmit.get('effect'));
        formData.append('product_by', dataSubmit.get('company'));
        formData.append('category', dataSubmit.get('category'));
        formData.append('amount', dataSubmit.get('amount'));

        let isActive = false
        if (dataSubmit.get('active') !== null) {
            isActive = true
        }
        if (imageUpload) {
            formData.append('image', imageUpload);
        }
        if (!productDetail.is_block) {
            formData.append('is_active', isActive);
        }

        var config = {
            method: 'patch',
            url: HOST + '/business/product/' + props.id,
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

    const toastSuccess = () => toast.success('Cập nhật thành công!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });;

    const toastWarning = () => toast.warn('Sản phẩm đã được xoá!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

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

    const handleDelete = async () => {
        var config = {
            method: 'delete',
            url: HOST + '/business/product/' + props.id,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        };

        await axios(config)
            .then(function (response) {
                toastWarning()
                setTimeout(() => {
                    history.push("/business/products/");
                  }, 1500);
            })
            .catch(function (error) {
                toastError()
            });
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
                                defaultValue={productDetail.name}
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
                                value={value}
                                onChange={handleSelect}
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
                                defaultValue={productDetail.product_by}
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
                                defaultValue={productDetail.amount}
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
                                defaultValue={productDetail.price}
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
                                defaultValue={productDetail.sale}
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
                                            <img src={productDetail.image} alt='logo'></img>
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
                        defaultValue={productDetail.element}
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
                        defaultValue={productDetail.type}
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
                        defaultValue={productDetail.description}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
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
                        defaultValue={productDetail.effect}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="">
                    </textarea>
                </div>
            </div>
            <div>
                {
                    !productDetail.is_block ? (
                        <label className="inline-flex relative items-center cursor-pointer">
                            <input type="checkbox" defaultChecked={productDetail.is_active} name="active" id="active" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Active</span>
                        </label>
                    ) : (
                        <label className="inline-flex relative items-center cursor-pointer">
                            <input type="checkbox" name="active" id="active" className="sr-only peer" disabled />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Đã bị khoá</span>
                        </label>
                    )

                }

            </div>
            <div className="business-layout-button">
                <div className='business-add-product-button-form'>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Cập nhật
                    </button>
                </div>
                <div className='business-add-product-button-form'>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="ml-5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        Xoá
                    </button>
                </div>
            </div>
        </form>

    )
}