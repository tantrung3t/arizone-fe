import './Home.css'
import Header from '../components/Header';
import AppFooter from '../components/Footer';
import './ProductDetail.css'
import StartRating from '../components/StartRating';
import { StoreContext } from '../store/store';
import { useEffect, useState, useContext, useRef } from 'react';
import { Avatar } from 'flowbite-react';
import { Link } from 'react-router-dom';

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
                    {/* <ProductRecommend /> */}
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
    const { cart, setCart } = useContext(StoreContext)
    const [value, setValue] = useState(1)

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const handleChange = (event) => {
        setValue(event.target.value - 1 + 1)
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
            setValue(value - 1)
        }
        else setValue(1)
        if (value > 20) {
            setValue(20)
        }
    }

    const handleBuyProduct = () => {
        console.log(value)
    }

    const handleAddToCart = () => {
        setCart(cart + value)
    }

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
                    Thuốc trừ bệnh Actara 25WG
                </p>
                <div className="product-detail-reviews">
                    <p className='text-4xl font-semibold text-gray-600 dark:text-white'>
                        4.5
                    </p>
                    <div className='product-detail-reviews-amount'>
                        <div className='product-detail-star'>
                            <StartRating />
                        </div>
                        <p className='font-semibold text-gray-600 dark:text-white'>
                            50 đánh giá
                        </p>
                    </div>
                </div>
                <div className='my-1 h-px bg-gray-300 dark:bg-gray-600'>
                </div>
                <div className='product-detail-price'>
                    <p className='text-5xl font-bold text-red-600 dark:text-white'>
                        20.000đ
                    </p>
                    <p className='text-3xl p-3 line-through font-bold text-gray-600 dark:text-white'>
                        25.000đ
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
                    <button onClick={handleBuyProduct} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Chọn mua
                    </button>
                    <button onClick={handleAddToCart} type="button" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    )
}

function ProductInformation(props) {
    return (
        <div className='product-description'>
            <div className='product-description-title'>
                <p className='text-4xl font-bold text-gray-900 dark:text-white'>
                    Thông tin sản phẩm
                </p>
            </div>
            <div className='product-description-flex'>
                <p className='text-lg font-bold text-gray-900 dark:text-white'>
                    Mô tả sản phẩm:
                </p>
                <h5 className='text-lg font-bold text-gray-600 dark:text-white'>
                    Amistar Top 325SC là thuốc trừ bệnh nội hấp và lưu dẫn mạnh rất phù hợp để kiểm soát bệnh hại trên ruộng lúa, ngô và một số cây trồng đặc thù khác.
                </h5>
            </div>
            <div>
                <div className='product-description-flex'>
                    <p className='text-lg font-bold text-gray-900 dark:text-white'>
                        Thành phần:
                    </p>
                    <h5 className='text-lg font-bold text-gray-600 dark:text-white'>
                        200g/L Azoxystrobin + 125g/L Difenoconazole
                    </h5>
                </div>
                <div className='product-description-flex'>
                    <p className='text-lg font-bold text-gray-900 dark:text-white'>
                        Dạng thuốc:
                    </p>
                    <h5 className='text-lg font-bold text-gray-600 dark:text-white'>
                        SC (Huyền Phù Đậm Đặc)
                    </h5>
                </div>
                <div className='product-description-flex'>
                    <p className='text-lg font-bold text-gray-900 dark:text-white'>
                        Cơ chế tác động:
                    </p>
                    <h5 className='text-lg font-bold text-gray-600 dark:text-white'>
                        Amistar Top 325SC diệt tế bào nấm bệnh bằng hai cách:
                        (1) Ngăn cản sự hình thành (ATP) ở ty thể ( năng lượng được cung cấp cho hoạt động sống của tế bào nấm bệnh)
                        (2) Ức chế tổng hợp Ergosterol ( thành phần cấu trúc nên màng tế bào nấm bệnh)
                        Amistar Top 325SC diệt tế bào nấm bệnh bằng hai cách:
                        (1) Ngăn cản sự hình thành (ATP) ở ty thể ( năng lượng được cung cấp cho hoạt động sống của tế bào nấm bệnh)
                        (2) Ức chế tổng hợp Ergosterol ( thành phần cấu trúc nên màng tế bào nấm bệnh)
                        Amistar Top 325SC diệt tế bào nấm bệnh bằng hai cách:
                        (1) Ngăn cản sự hình thành (ATP) ở ty thể ( năng lượng được cung cấp cho hoạt động sống của tế bào nấm bệnh)
                        (2) Ức chế tổng hợp Ergosterol ( thành phần cấu trúc nên màng tế bào nấm bệnh)
                    </h5>
                </div>
                <div className='product-description-flex'>
                    <p className='text-lg font-bold text-gray-900 dark:text-white'>
                        Công ty sản xuất:
                    </p>
                    <h5 className='text-lg font-bold text-gray-600 dark:text-white'>
                        Syngenta
                    </h5>
                </div>
            </div>
        </div>
    )
}

function Business(props) {
    return (
        <div className='business-info'>
            <div className='business-info-tab-1'>
                <div>
                    <img
                        src="https://media.istockphoto.com/photos/wild-grass-in-the-mountains-at-sunset-picture-id1322277517?k=20&m=1322277517&s=612x612&w=0&h=ZdxT3aGDGLsOAn3mILBS6FD7ARonKRHe_EKKa-V-Hws="
                        alt="store"
                    />
                </div>
                <div className='business-info-address'>
                    <p className='text-2xl font-bold text-gray-600 dark:text-white'>
                        Cửa hàng Hoà Bình Thịnh Vượng
                    </p>
                    <p className='text-mx font-bold text-gray-600 dark:text-white'>
                        127/387 Nguyễn Trải, Hưng Lợi, Ninh Kiều, Cần Thơ
                    </p>
                    <Link to="/store/1" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Xem cửa hàng
                    </Link>
                </div>
            </div>
            <div className='business-info-tab-2'>
            </div>
            <div className='business-info-tab-3'>
                <div className='business-info-tab-3-left'>
                    <div className='display-flex'>
                        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                        <p className='text-xm font-bold text-gray-600 dark:text-white'>
                            Đánh giá:
                        </p>
                    </div>
                    <div className='display-flex'>
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                        <p className='text-xm font-bold text-gray-600 dark:text-white'>
                            Sản phẩm:
                        </p>
                    </div>
                </div>
                <div className='business-info-tab-3-right'>
                    <div className='display-flex'>
                        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                        <p className='text-xm font-bold text-gray-600 dark:text-white'>
                            Đã bán:
                        </p>
                    </div>
                    <div className='display-flex'>
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <p className='text-xm font-bold text-gray-600 dark:text-white'>
                            Tham gia:
                        </p>
                    </div>
                </div>

            </div>
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
    const titleRef = useRef()
    const handleScrollClick = () => {
        titleRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div id='review-product' className='review-product'>
            <div ref={titleRef} className="review-to-scroll"></div>
            <div className=''>
                <p className='text-xl font-bold text-gray-900 dark:text-white'>
                    Đánh giá - Nhận xét từ khách hàng
                </p>
            </div>
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <div className='more-review'>
                <button onClick={handleScrollClick} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Xem thêm đánh giá
                </button>
            </div>
        </div>
    )
}

function ReviewDetail(props) {
    return (
        <div className='review-detail'>
            <div>
                <Avatar
                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    rounded={true}
                />
            </div>
            <div className='review-detail-description'>
                <h4 className='text-xl font-bold text-gray-900 dark:text-white'>
                    Trần Tấn Trung
                </h4>
                <div className='product-detail-star'>
                    <StartRating />
                </div>
                <h5 className='text-sm font-bold text-gray-600 dark:text-white'>
                    2020-09-08 22:30
                </h5>
                <p className='text-lg font-semibold text-gray-700 dark:text-white'>
                    Sản phẩm dùng cũng được nhưng có nhiều vấn đề bên khâu vận chuyển
                    shipper giao chậm giao
                    ản phẩm dùng cũng được nhưng có nhiều vấn đề bên khâu vận chuyển
                    shipper giao chậm giao
                    ản phẩm dùng cũng được nhưng có nhiều vấn đề bên khâu vận chuyển
                    shipper giao chậm giao
                </p>
            </div>
        </div>
    )
}