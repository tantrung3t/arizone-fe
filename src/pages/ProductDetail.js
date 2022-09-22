import './Home.css'
import Header from '../components/Header';
import AppFooter from '../components/Footer';
import './ProductDetail.css'
import StartRating from '../components/StartRating';
import { useEffect, useState } from 'react';

export default function ProductDetail(props) {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <header>
                <Header></Header>
            </header>
            <main>
                <div className='body-container'>
                    <Product id={props.id} />
                    <Business />
                    <ProductInformation />
                    <ProductRecommend />
                    <Review />
                </div>
            </main>
            <footer>
                <AppFooter></AppFooter>
            </footer>
        </div>
    )
}

function Product(props) {
    const [value, setValue] = useState(1)

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const increase = (e) => {
        if (value < 20) {
            setValue(value - 0 + 1)
        }
        else setValue(20)
        if (value < 1) {
            setValue(1)
        }
    }
    const decrease = (e) => {
        if (value > 1) {
            console.log("run")
            setValue(value - 1)
        }
        else setValue(1)
        if (value > 20) {
            setValue(20)
        }
    }
    console.log(value)
    return (
        <div className='product-container'>
            <div className='product-detail-image'>
                <img className='product-image'
                    src="https://www.syngenta.com.vn/sites/g/files/zhg531/f/media-wysiwyg/2022/04/20/actara-1g-syngenta.jpg"
                    alt="product 1"
                />
                <div className='slide-image'>
                    <img className=''
                        src="https://www.syngenta.com.vn/sites/g/files/zhg531/f/media-wysiwyg/2022/04/20/actara-1g-syngenta.jpg"
                        alt="product 1"
                    />
                    <img className=''
                        src="https://www.syngenta.com.vn/sites/g/files/zhg531/f/media-wysiwyg/2022/04/20/actara-1g-syngenta.jpg"
                        alt="product 1"
                    />
                    <img className=''
                        src="https://www.syngenta.com.vn/sites/g/files/zhg531/f/media-wysiwyg/2022/04/20/actara-1g-syngenta.jpg"
                        alt="product 1"
                    />
                    <img className=''
                        src="https://www.syngenta.com.vn/sites/g/files/zhg531/f/media-wysiwyg/2022/04/20/actara-1g-syngenta.jpg"
                        alt="product 1"
                    />
                    <img className=''
                        src="https://www.syngenta.com.vn/sites/g/files/zhg531/f/media-wysiwyg/2022/04/20/actara-1g-syngenta.jpg"
                        alt="product 1"
                    />
                </div>
            </div>
            <div className='product-detail-info'>
                <p className='text-3xl font-bold text-gray-700 dark:text-white'>
                    Sản phẩm nhiều người lựa chọn và tin dùng vì sản phẩm chất lượng rất cao {props.id}
                </p>
                <div className='product-detail-star'>
                    <StartRating />
                </div>
                <div className='my-1 h-px bg-gray-300 dark:bg-gray-600'>
                </div>
                <div className='product-detail-price'>
                    <p className='text-5xl font-bold text-red-600 dark:text-white'>
                        200.000đ
                    </p>
                    <p className='text-3xl p-3 line-through font-bold text-gray-600 dark:text-white'>
                        200.000đ
                    </p>
                </div>
                <div className='my-1 h-px bg-gray-300 dark:bg-gray-600'>
                </div>
                <div className='product-detail-form'>
                    <form onSubmit={handleSubmit}>
                        <button className="value-button" onClick={decrease} id="decrease" value="Decrease Value">-</button>
                        <input type="number" id="number" value={value} onChange={handleChange}></input>
                        <button className="value-button" onClick={increase} id="increase" value="Increase Value">+</button>
                    </form>
                </div>
                <div className='product-detail-button'>
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Chọn mua
                    </button>
                    <button type="button" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    )
}

function ProductInformation(props) {
    return (
        <div className=''>
            Mô tả sản phẩm {props.id}
        </div>
    )
}

function Business(props) {
    return (
        <div className='business-info'>
            Tên cửa hàng {props.id}
        </div>
    )
}

function ProductRecommend(props) {
    return (
        <div className='product-recommend'>
            Sản phẩm đề xuất
        </div>
    )
}

function Review(props) {
    return (
        <div className='review-product'>
            Review
        </div>
    )
}