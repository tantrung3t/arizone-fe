import './Home.css'
import Header from '../components/Header';
import AppFooter from '../components/Footer';
import './Cart.css'
import StartRating from '../components/StartRating';
import { StoreContext } from '../store/store';
import { useEffect, useState, useContext, useRef } from 'react';
import { Avatar } from 'flowbite-react';
import { Link } from 'react-router-dom';

const dataProduct = [
    {
        "business": "Cửa hàng A",
        "products": [
            {
                "name": "Thuốc trừ bệnh Help 25WG",
                "thumbnail": "https://media.istockphoto.com/photos/wild-grass-in-the-mountains-at-sunset-picture-id1322277517?k=20&m=1322277517&s=612x612&w=0&h=ZdxT3aGDGLsOAn3mILBS6FD7ARonKRHe_EKKa-V-Hws=",
                "price": 400000,
                "sale": 0,
                "amount": 3
            },
            {
                "name": "Thuốc trừ bệnh Actara 25WG",
                "thumbnail": "https://media.istockphoto.com/photos/wild-grass-in-the-mountains-at-sunset-picture-id1322277517?k=20&m=1322277517&s=612x612&w=0&h=ZdxT3aGDGLsOAn3mILBS6FD7ARonKRHe_EKKa-V-Hws=",
                "price": 200000,
                "sale": 150000,
                "amount": 2
            },
        ]
    },
    {
        "business": "Cửa hàng B",
        "products": [
            {
                "name": "Thuốc Help 25WG",
                "thumbnail": "https://media.istockphoto.com/photos/wild-grass-in-the-mountains-at-sunset-picture-id1322277517?k=20&m=1322277517&s=612x612&w=0&h=ZdxT3aGDGLsOAn3mILBS6FD7ARonKRHe_EKKa-V-Hws=",
                "price": 400000,
                "sale": 350000,
                "amount": 3
            },
            {
                "name": "Thuốc Actara 25WG",
                "thumbnail": "https://media.istockphoto.com/photos/wild-grass-in-the-mountains-at-sunset-picture-id1322277517?k=20&m=1322277517&s=612x612&w=0&h=ZdxT3aGDGLsOAn3mILBS6FD7ARonKRHe_EKKa-V-Hws=",
                "price": 200000,
                "sale": 150000,
                "amount": 2
            },
        ]
    }
]

export default function Cart(props) {
    const [data, setData] = useState()
    useEffect(() => {
        window.scrollTo(0, 0)
        setData(dataProduct)
    }, [])
    const listCart = () => {
        if (data) {
            let element = data.map((data, index) => {
                return <CartByStore key={index}
                    data={data}
                />
            })
            return element;
        }
        return <div></div>
    }
    return (
        <div>
            <header>
                <Header></Header>
            </header>
            <main>
                <div className='body-container'>
                    <div className='cart-container'>
                        <p className='p-5 text-3xl font-bold text-gray-600 dark:text-white'>
                            Giỏ hàng cá nhân
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
    useEffect(() => {
        let sum = 0
        data.products.map((product) => {
            if(product.sale){
                sum += (product.sale * product.amount)
            }
            else{
                sum +=  (product.price * product.amount)
            }
            return true
        })
        setTotal(sum)
    }, [data])
    const sumCartTotal = (before_total, after_total) => {
        setTotal(total - before_total + after_total)
    }
    const listProduct = () => {
        if (data) {
            let element = data.products.map((product, index) => {
                return <Product key={index}
                    product={product}
                    sumCartTotal={(before_total, after_total) => { sumCartTotal(before_total, after_total) }}
                />
            })
            return element;
        }
        return <div></div>
    }
    return (
        <div className='cart-by-store'>
            <p className='p-5 text-xl font-bold text-gray-600 dark:text-white'>
                {data.business}
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
                <Link to="1" type='button' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Đặt hàng
                </Link>
            </div>
        </div>
    )
}

function Product(props) {
    const product = props.product
    const [value, setValue] = useState(props.product.amount)
    const [price, setPrice] = useState(0)

    useEffect(() => {
        if (product.sale) {
            setPrice(product.sale)
        }
        else {
            setPrice(product.price)
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
            setValue(value - 1)
            props.sumCartTotal(price * (value), price * (value - 1));
        }
        else setValue(1)
        if (value > 20) {
            setValue(20)
            props.sumCartTotal(price * (value), price * (value - 1));
        }

    }
    const showPrice = () => {
        if (product.sale) {
            return (
                <>
                    <p className='text-lg font-semibold text-gray-600 line-through dark:text-white'>
                        {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                    </p>
                    <p className='text-lg font-semibold text-red-600 dark:text-white'>
                        {product.sale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                    </p>
                </>
            )
        }
        return (
            <>
                <p className='text-lg font-semibold text-gray-600 dark:text-white'>
                    {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                </p>
            </>
        )

    }
    return (
        <div className='cart-product-in-store'>
            <div className='cart-title-product'>
                <img
                    src={product.thumbnail}
                    alt="store"
                />
                <p className='p-5 text-lg font-semibold text-gray-900 dark:text-white'>
                    {product.name}
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
                <button className='tex-lg font-semibold text-red-900 underline dark:text-white'>
                    Xoá
                </button>
            </div>

        </div>
    )
}
