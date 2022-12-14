import './Home.css'
import Header from '../components/Header';
import AppFooter from '../components/Footer';
import './ProductDetail.css'
import StartRating from '../components/StartRating';
import { StoreContext } from '../store/store';
import { useEffect, useState, useContext, useRef } from 'react';
import { Avatar } from 'flowbite-react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import StarsRating from 'stars-rating'

const HOST = process.env.REACT_APP_HOST

export default function ProductDetail(props) {

    const [data, setData] = useState(
        {
            "name": "",
            "price": 0,
            "sale": 0,
            "image": "",
            "average_rating": 0,
            "amount_rating": 0,
            "description": "",
            "element": "",
            "type": "",
            "effect": "",
            "product_by": "",
            "business": {
                "id": "",
                "user": {
                    "id": "",
                    "full_name": "",
                    "created": "",
                    "image": ""
                },
                "address": "",
                "rating": 0,
                "amount_product": 0,
                "sold": 0
            }
        }
    )

    const getProductDetail = async () => {
        var config = {
            method: 'get',
            url: HOST + '/product/' + props.id,
            headers: {
            }
        };
        await axios(config)
            .then(function (response) {
                setData(response.data)
            })
            .catch(function (error) {
            });
    }


    useEffect(() => {
        getProductDetail()
    }, [])

    return (
        <div>
            <header>
                <Header></Header>
            </header>
            <main>
                <div className='body-container'>
                    {/* <div className='loading-container'>
                    </div> */}
                    {
                        data.name ? (
                            <>
                                <Product data={data} id={props.id} />
                                <Business data={data.business} />
                                <ProductInformation data={data} />
                                {/* <ProductRecommend /> */}
                                <Review id={props.id} />
                            </>
                        ) : (
                            <>
                                <div className='page-notfound'>

                                </div>
                            </>
                        )
                    }
                </div>
            </main>
            <footer>
                <AppFooter></AppFooter>
            </footer>
        </div>
    )
}

function Product(props) {

    const history = useHistory()
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
        if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken') && localStorage.getItem('role') === "ctm") {
            let total = 0
            if(props.data.sale === 0){
                total = value * props.data.price
            }
            else {
                total = value * props.data.sale
            }
            const dataOrder =
            {   
                "cart_id": "",
                "business": props.data.business.id,
                "total": total,
                "product": [
                    {
                        "id": "",
                        "product":
                        {
                            "id": props.id,
                            "name": props.data.name,
                            "image": props.data.image,
                            "price": props.data.price,
                            "sale": props.data.sale
                        },
                        "quantity": value
                    }
                ]
            }
            localStorage.setItem("order", JSON.stringify(dataOrder));
            history.push("/customer/cart/order")
        }
        else {
            toastFailed()
        }

    }

    const handleAddToCart = () => {
        if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken') && localStorage.getItem('role') === "ctm") {
            // setCart(cart + value)
            addCartAPI()
        }
        else {
            toastFailed()
        }

    }

    const addCartAPI = () => {
        var data = {
            "product": props.id,
            "quantity": value
        };
        var config = {
            method: 'post',
            url: HOST + '/cart/add/',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                setTimeout(() => {
                    toastSuccess()
                })
            })
            .catch(function (error) {
            });
    }

    const toastSuccess = () => toast.success('???? th??m s???n ph???m v??o gi???!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    const toastFailed = () => toast.warn('B???n c???n ????ng nh???p!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });



    return (
        <div className='product-container'>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className='product-detail-image'>
                <img className='product-image'
                    src={props.data.image}
                    alt="product 1"
                />
            </div>
            <div className='product-detail-info'>
                <p className='text-3xl font-bold text-gray-700 dark:text-white'>
                    {props.data.name}
                </p>
                <div className="product-detail-reviews">
                    <p className='text-4xl font-semibold text-gray-600 dark:text-white'>
                        {props.data.average_rating}
                    </p>
                    <div className='product-detail-reviews-amount'>
                        <div className='product-detail-star'>
                            <StartRating rating={props.data.average_rating} />
                        </div>
                        <p className='font-semibold text-gray-600 dark:text-white'>
                            {props.data.amount_rating} ????nh gi??
                        </p>
                    </div>
                </div>
                <div className='my-1 h-px bg-gray-300 dark:bg-gray-600'>
                </div>
                {
                    props.data.sale ? (
                        <div className='product-detail-price'>
                            <p className='text-5xl font-bold text-red-600 dark:text-white'>
                                {props.data.sale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}??
                            </p>
                            <p className='text-3xl p-3 line-through font-bold text-gray-600 dark:text-white'>
                                {props.data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}??
                            </p>
                        </div>
                    ) : (
                        <div className='product-detail-price'>
                            <p className='text-3xl p-3 font-bold text-gray-600 dark:text-white'>
                                {props.data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}??
                            </p>
                        </div>
                    )
                }
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
                        Ch???n mua
                    </button>
                    <button onClick={handleAddToCart} type="button" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        Th??m v??o gi??? h??ng
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
                    Th??ng tin s???n ph???m
                </p>
            </div>
            <div className='product-description-flex'>
                <p className='text-lg font-bold text-gray-900 dark:text-white'>
                    M?? t??? s???n ph???m:
                </p>
                <h5 className='text-lg font-bold text-gray-600 dark:text-white'>
                    {props.data.description}
                </h5>
            </div>
            <div>
                <div className='product-description-flex'>
                    <p className='text-lg font-bold text-gray-900 dark:text-white'>
                        Th??nh ph???n:
                    </p>
                    <h5 className='text-lg font-bold text-gray-600 dark:text-white'>
                        {props.data.element}
                    </h5>
                </div>
                <div className='product-description-flex'>
                    <p className='text-lg font-bold text-gray-900 dark:text-white'>
                        D???ng thu???c:
                    </p>
                    <h5 className='text-lg font-bold text-gray-600 dark:text-white'>
                        {props.data.type}
                    </h5>
                </div>
                <div className='product-description-flex'>
                    <p className='text-lg font-bold text-gray-900 dark:text-white'>
                        C?? ch??? t??c ?????ng:
                    </p>
                    <h5 className='text-lg font-bold text-gray-600 dark:text-white'>
                        {props.data.effect}
                    </h5>
                </div>
                <div className='product-description-flex'>
                    <p className='text-lg font-bold text-gray-900 dark:text-white'>
                        C??ng ty s???n xu???t:
                    </p>
                    <h5 className='text-lg font-bold text-gray-600 dark:text-white'>
                        {props.data.product_by}
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
                        src={props.data.user.image}
                        alt="store"
                    />
                </div>
                <div className='business-info-address'>
                    <p className='text-2xl font-bold text-gray-600 dark:text-white'>
                        {props.data.user.full_name}
                    </p>
                    <p className='text-mx font-bold text-gray-600 dark:text-white'>
                        {props.data.address}
                    </p>
                    <Link to={"/store/" + props.data.id} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Xem c???a h??ng
                    </Link>
                </div>
            </div>

            <div className='business-info-tab-3'>


            </div>
        </div>
    )
}

function ProductRecommend(props) {
    return (
        <div className='product-recommend'>
            S???n ph???m ????? xu???t
        </div>
    )
}

function Review(props) {
    const titleRef = useRef()
    const [review, setReview] = useState([])
    const [star, setStar] = useState(0)
    const [content, setContent] = useState("")
    const [isLogin, setIsLogin] = useState(localStorage.getItem('role'))
    const handleScrollClick = () => {
        titleRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    const ratingChanged = (newRating) => {
        setStar(newRating)
    }
    const sendRating = async (e) => {
        e.preventDefault()
        const dataSubmit = new FormData(e.currentTarget);
        const data = {
            "product": props.id,
            "star": star,
            "content": dataSubmit.get('content')
        }
        var config = {
            method: 'post',
            url: HOST + '/review/',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            data: data
        };
        await axios(config)
            .then(function (response) {
                loadReview()
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        loadReview()
    }, [])

    const loadReview = () => {
        var config = {
            method: 'get',
            url: HOST + '/review/' + props.id + '/?ordering=-id',
            headers: {}
        };

        axios(config)
            .then(function (response) {
                setReview(response.data.results)
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const listReview = () => {
        let element = review.map((item, index) => {
            return <ReviewDetail
                key={index}
                full_name={item.user.full_name}
                image={item.user.image}
                star={item.star}
                content={item.content}
            />
        })
        return element;
    }

    return (
        <div id='review-product' className='review-product'>
            <div ref={titleRef} className="review-to-scroll"></div>
            {
                isLogin ? (
                    <div>
                        <div className=''>
                            <p className='text-xl font-bold text-gray-900 dark:text-white'>
                                ????nh gi?? - Nh???n x??t t??? kh??ch h??ng
                            </p>
                        </div>
                        <div>
                            <StarsRating
                                count={5}
                                onChange={ratingChanged}
                                size={30}
                                color2={'#ffd700'} />
                            <form onSubmit={sendRating}>
                                <textarea
                                    id="content"
                                    rows="4"
                                    name="content"
                                    className="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Nh???n x??t v?? ????nh gi?? c???a b???n...">
                                </textarea>
                                <button type="submit" className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    G???i ????nh gi??
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div>
                    </div>
                )
            }
            {listReview()}
            <div className='more-review'>
                <button onClick={handleScrollClick} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Xem th??m ????nh gi??
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
                    img={props.image}
                    rounded={true}
                />
            </div>
            <div className='review-detail-description'>
                <h4 className='text-xl font-bold text-gray-900 dark:text-white'>
                    {props.full_name}
                </h4>
                <div className='product-detail-star'>
                    <StartRating rating={props.star} />
                </div>
                {/* <h5 className='text-sm font-bold text-gray-600 dark:text-white'>
                    2020-09-08 22:30
                </h5> */}
                <p className='mt-3 text-lg font-semibold text-gray-700 dark:text-white'>
                    {props.content}
                </p>
            </div>
        </div>
    )
}