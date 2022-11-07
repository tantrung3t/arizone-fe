import './CardProduct.css'
import { Link } from 'react-router-dom'
import { Card } from 'flowbite-react'
import StartRating from './StartRating'
export default function CardProduct(props) {
    const percentSale = () => {
        if (props.sale) {
            const percent = parseInt((props.price / props.sale - 1) * 100)
            return (
                <div className='card-product-sale'>{percent}%</div>
            )
        }
        return (
            <div></div>
        )
    }

    const productPrice = () => {
        if (props.sale) {
            return (
                <div>
                    <div>
                        <span className="text-lg font-bold text-red-600 dark:text-white">
                            {props.sale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                        </span>
                    </div>
                    <div>
                        <span className="text-lg font-bold text-gray-900 line-through dark:text-white">
                            {props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                        </span>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <div>
                    <span className="text-lg font-bold text-red-600 dark:text-white">
                    </span>
                </div>
                <div>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                    </span>
                </div>
            </div>
        )
    }
    return (
        <div className='card-product-container'>
            {percentSale()}
            <div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <Link to={"/product/" + props.id} className='card-product-center'>
                    <img className='card-product-image'
                        src={props.image}
                        alt="product image"
                    />
                </Link>
                <div className="px-5 pb-5">
                    <Link to={"/product/" + props.id}>
                        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                            {props.product_name}
                        </h5>
                    </Link>
                    <div className="flex items-center mt-2.5 mb-5">
                        <StartRating
                            start={props.average_rating}
                        />
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                            {props.average_rating}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className='card-product-price'>
                            {productPrice()}
                        </div>
                        {/* <a href="#" className="text-white text-xs bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Thêm vào giỏ
                        </a> */}
                    </div>
                </div>
            </div>
        </div>
    )
}