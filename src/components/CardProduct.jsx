import './CardProduct.css'
import { Link } from 'react-router-dom'
import { Card } from 'flowbite-react'
import StartRating from './StartRating'
export default function CardProduct() {
    return (
        <div className='card-product-container'>
            <div className='card-product-sale'>30%</div>
            <div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <Link to="/product/1" className='card-product-center'>
                    <img className='card-product-image'
                        src="https://www.syngenta.com.vn/sites/g/files/zhg531/f/media-wysiwyg/2022/04/20/actara-1g-syngenta.jpg"
                        alt="product image"
                    />
                </Link>
                <div className="px-5 pb-5">
                    <Link to="/product/1">
                        <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                            Thuốc trừ sâu hiệu actara của syngenta trị sâu nhóm 4A
                        </h5>
                    </Link>
                    <div className="flex items-center mt-2.5 mb-5">
                        <StartRating
                            start={5}
                        />
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className='card-product-price'>
                            <div>
                                <span className="text-lg font-bold text-red-600 dark:text-white">
                                    10.760.000đ
                                </span>
                            </div>
                            <div>
                                <span className="text-lg font-bold text-gray-800 line-through dark:text-white">
                                    10.900.000đ
                                </span>
                            </div>
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