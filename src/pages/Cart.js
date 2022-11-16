import './Home.css'
import Header from '../components/Header';
import AppFooter from '../components/Footer';
import './Cart.css'
import StartRating from '../components/StartRating';
import { StoreContext } from '../store/store';
import { useEffect, useState, useContext, useRef } from 'react';
import { Avatar } from 'flowbite-react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { data } from 'autoprefixer';

const HOST = process.env.REACT_APP_HOST

export default function Cart(props) {
    const { cart } = useContext(StoreContext)
    const [data, setData] = useState([])
    const [loadingScreen, setLoadingScreen] = useState("cart-loading")
    useEffect(() => {
        window.scrollTo(0, 0)
        loadCart()
    }, [])
    const listCart = () => {
        let element = data.map((data, index) => {
            if (data.cart_detail.length !== 0) {
                return <CartByStore key={index}
                    data={data}
                    loadCart={() => { loadCart() }}
                />
            }
        })
        return element;
    }
    const loadCart = async () => {
        setLoadingScreen("cart-loading")
        var config = {
            method: 'get',
            url: process.env.REACT_APP_HOST + '/cart/',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        };

        await axios(config)
            .then(function (response) {
                setTimeout(() => {
                    window.scrollTo(0, 0)
                    setData(response.data)
                    setLoadingScreen("hide")
                }, 300)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div>
            <header>
                <Header></Header>
            </header>
            <main>
                <div className={loadingScreen}>
                    <div role="status" className='w-20 h-20'>
                        <svg aria-hidden="true" className="mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                </div>
                <div className='body-container'>
                    {data.length ? (<div className='cart-container'>
                        <p className='p-5 text-3xl font-bold text-gray-600 dark:text-white'>
                            Giỏ hàng
                        </p>
                        <div className='cart-title'>
                            <div className='cart-title-product'>
                                <p className='text-xm font-bold text-gray-600 dark:text-white'>
                                    Sản phẩm
                                </p>
                            </div>
                            <div className='cart-title-price'>
                                <p className='text-xm font-bold text-gray-600 dark:text-white'>
                                    Đơn giá
                                </p>
                            </div>
                            <div className='cart-title-amount'>
                                <p className='text-xm font-bold text-gray-600 dark:text-white'>
                                    Số lượng
                                </p>
                            </div>
                            <div className='cart-title-money'>
                                <p className='text-xm font-bold text-gray-600 dark:text-white'>
                                    Thành tiền
                                </p>
                            </div>
                            <div className='cart-title-action'>
                                <p className='text-xm font-bold text-gray-600 dark:text-white'>
                                    Hành động
                                </p>
                            </div>
                        </div>
                        <div className='cart-product-store'>
                            {listCart()}
                        </div>
                    </div>
                    ) : (
                        <div className='cart-404-container'>Khong co</div>
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

function CartByStore(props) {
    const [total, setTotal] = useState(0)
    const data = props.data
    const history = useHistory()
    useEffect(() => {
        let sum = 0
        data.cart_detail.map((product) => {
            if (product.product.sale) {
                sum += (product.product.sale * product.quantity)
            }
            else {
                sum += (product.product.price * product.quantity)
            }
            return true
        })
        setTotal(sum)
    }, [data])
    const sumCartTotal = (before_total, after_total) => {
        setTotal(total - before_total + after_total)
    }

    const updateOrder = async (id, data) => {
        var config = {
            method: 'put',
            url: HOST + '/cart/update/' + id + '/',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            data: data
        };
        await axios(config)
            .then(function (response) {

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const deleteCart = async (id) => {
        var config = {
            method: 'delete',
            url: HOST + '/cart/delete/' + id + '/',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        };
        await axios(config)
            .then(function (response) {
                props.loadCart()
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const increase = (id) => {
        const data = {
            "quantity": 1
        }
        updateOrder(id, data)
    }
    const decrease = (id) => {
        const data = {
            "quantity": -1
        }
        updateOrder(id, data)
    }

    const listProduct = () => {
        if (data) {
            let element = data.cart_detail.map((product, index) => {
                return <Product key={index}
                    product={product}
                    increase={(cart_id) => { increase(cart_id) }}
                    decrease={(cart_id) => { decrease(cart_id) }}
                    deleteCart={(cart_id) => { deleteCart(cart_id) }}
                    sumCartTotal={(before_total, after_total) => { sumCartTotal(before_total, after_total) }}

                />
            })
            return element;
        }
        return <div></div>
    }

    const handleOrder = async () => {
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/cart/' + data.id,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        };

        await axios(config)
            .then(function (response) {
                const dataOrder = {
                    "cart_id": data.id,
                    "business": response.data.business.id,
                    "total": total,
                    "product": response.data.cart_detail
                }
                localStorage.setItem("order", JSON.stringify(dataOrder));
                history.push("order")
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    return (
        <div className='cart-by-store'>
            <p className='p-5 text-xl font-bold text-gray-600 dark:text-white hover:text-blue-600'>
                <Link to={'/store/' + data.business.id}>
                    {data.business.user.full_name}
                </Link>
            </p>
            {listProduct()}
            <div className='cart-check-out'>
                <div className='cart-check-out-text'>
                    <h5 className='text-xl font-bold text-gray-900 dark:text-white'>
                        Tổng tiền:
                    </h5>
                    <h4 className='text-xl font-bold text-red-900 underline dark:text-white'>
                        {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                    </h4>
                </div>
                <button onClick={handleOrder} type='button' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Đặt hàng
                </button>
            </div>
        </div>
    )
}

function Product(props) {
    let product = props.product
    const [value, setValue] = useState(product.quantity)
    const [price, setPrice] = useState(0)

    useEffect(() => {
        if (product.product.sale) {
            setPrice(product.product.sale)
        }
        else {
            setPrice(product.product.price)
        }
    }, [product])

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const handleChange = (event) => {
        setValue(event.target.value - 1 + 1)
    }
    const increase = (e) => {

        if (value < 20) {
            setValue(value - 0 + 1)
            props.increase(product.id)
            props.sumCartTotal(price * (value), price * (value + 1));
        }
        else setValue(20)
        if (value < 1) {
            setValue(1)
            props.sumCartTotal(price * (value), price * (value + 1));
        }

    }
    const decrease = (e) => {

        if (value > 1) {
            props.decrease(product.id)
            setValue(value - 1)
            props.sumCartTotal(price * (value), price * (value - 1));
        }
        else setValue(1)
        if (value > 20) {
            setValue(20)
            props.sumCartTotal(price * (value), price * (value - 1));
        }
    }

    const deleteCart = () => {
        props.deleteCart(product.id)
    }
    const showPrice = () => {
        if (product.product.sale) {
            return (
                <>
                    <p className='text-lg font-semibold text-gray-600 line-through dark:text-white'>
                        {product.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                    </p>
                    <p className='text-lg font-semibold text-red-600 dark:text-white'>
                        {product.product.sale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                    </p>
                </>
            )
        }
        return (
            <>
                <p className='text-lg font-semibold text-gray-600 dark:text-white'>
                    {product.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                </p>
            </>
        )

    }
    return (
        <div className='cart-product-in-store'>
            <div className='cart-title-product'>
                <img
                    src={product.product.image}
                    alt="store"
                />
                <p className='p-5 text-lg font-semibold text-gray-900 dark:text-white'>
                    {product.product.name}
                </p>
            </div>
            <div className='cart-title-price'>
                {showPrice()}
            </div>
            <div className='cart-title-amount'>
                <form onSubmit={handleSubmit}>
                    <button className="value-button" onClick={decrease} id="decrease" value="Decrease Value">-</button>
                    <input type="number" readOnly="readonly" id="number" value={value} onChange={handleChange}></input>
                    <button className="value-button" onClick={increase} id="increase" value="Increase Value">+</button>
                </form>
            </div>
            <div className='cart-title-money'>
                <p className='text-lg font-semibold text-blue-900 dark:text-white'>
                    {(price * value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                </p>
            </div>
            <div className='cart-title-action'>
                <button onClick={deleteCart} className='text-lg font-semibold text-red-900 underline dark:text-white'>
                    Xoá
                </button>
            </div>

        </div>
    )
}
