
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from "../store/store";
import './Cart.css'
export default function Cart() {
    const { cart } = useContext(StoreContext)

    return (
        <Link to='#cart' className='cart'>
            <div className='cart-amount'>
                <div className='cart-amount-number'>
                    <p className="text-xs font-semibold text-white white:text-white">
                        {cart}
                    </p>
                </div>
            </div>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            <div className='cart-mini'>

                {cart
                    ? <>
                        <h5 className='text-base font-semibold text-gray-600 dark:text-white' to="#cart">Nhấp để xem chi tiết giỏ hàng</h5>
                        <ProductInCartMini />
                        <h4 className='text-base font-black text-gray-600 dark:text-white'>...</h4>
                    </>
                    : <>
                        <h5 className='text-base font-semibold text-gray-600 dark:text-white' to="#cart">Không có sản phẩm nào</h5>
                    </>
                }
            </div>

        </Link>
    )
}

function ProductInCartMini(props) {
    return (
        <div className='cart-mini-item'>
            <div className='cart-mini-product'>
                <img 
                alt='logo'
                src='https://www.syngenta.com.vn/sites/g/files/zhg531/f/media-wysiwyg/2022/04/20/actara-1g-syngenta.jpg'>
                </img>
                <div className='cart-mini-product-info'>
                    <p className='text-base font-semibold text-gray-900 dark:text-white'>
                        Thuốc trừ sâu actara
                    </p>
                    <span className='text-base font-semibold text-red-600 dark:text-white'>
                        X1
                    </span>
                </div>
            </div>
            <hr className="my-1 mx-auto w-48 h-1 bg-gray-100 rounded border-0 dark:bg-gray-700"></hr>
        </div>
    )


}