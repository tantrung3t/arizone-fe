import './Home.css'
import Header from '../components/Header';
import AppFooter from '../components/Footer';
import CardProduct from '../components/CardProduct';
import './StoreDetail.css'
import { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const apiProduct = [
    {
        product: "1",
        product_name: "Thuốc trừ bệnh Actara 25WG",
        image: "https://www.syngenta.com.vn/sites/g/files/zhg531/f/media-wysiwyg/2022/04/20/actara-1g-syngenta.jpg",
        price: "25.000",
        sale: "20.000"
    },
    {
        product: "1",
        product_name: "Thuốc trừ bệnh Amistar Top 325 SC",
        image: "https://cf.shopee.vn/file/77967f5b88b9fba9028a91b07de29cbb",
        price: "150.000",
        sale: ""
    },
    {
        product: "1",
        product_name: "Thuốc trừ bệnh sinh học Vali 5SL",
        image: "https://agriviet.org/wp-content/uploads/2021/03/Vali-5SL.jpg",
        price: "250.000",
        sale: "222.000"
    },
    {
        product: "1",
        product_name: "Thuốc trừ bệnh Top 5SL",
        image: "https://agriviet.org/wp-content/uploads/2020/12/Stop-5SL.jpg",
        price: "25.000",
        sale: ""
    },
]

const HOST = process.env.REACT_APP_HOST

export default function StoreDetail(props) {

    const [store, setStore] = useState(
        {
            "id": "",
            "user": {
                "full_name": "",
                "permission": "",
                "phone": "",
                "address": "",
                "image": "",
                "stripe_customer": null
            },
            "longitude": "",
            "latitude": ""
        }
    )
    const [products, setProducts] = useState([])
    const [next, setNext] = useState()

    useEffect(() => {
        window.scrollTo(0, 0)
        getStore()
        getProductStore()
    }, [])

    const getStore = async () => {
        var config = {
            method: 'get',
            url: HOST + '/store/' + props.id,
            headers: {}
        };

        await axios(config)
            .then(function (response) {
                setStore(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const getProductStore = () => {
        var config = {
            method: 'get',
            url: HOST + '/product/store/' + props.id,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                setProducts(response.data.results)
                setNext(response.data.next)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const listProduct = () => {
        let element = products.map((product, index) => {
            return <CardProduct key={index}
                id={product.id}
                product_name={product.name}
                image={product.image}
                price={product.price}
                sale={product.sale}
                average_rating={product.average_rating}
            />
        })
        return element;
    }
    const viewMoreProduct = () => {
        var config = {
            method: 'get',
            url: next,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                setProducts(products => products.concat(response.data.results))
                setNext(response.data.next)
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
                <div className='body-container'>
                    <StoreInfo store={store} />
                    <div className='home-best-seller'>
                        <p className="text-4xl m-9 font-bold text-gray-900 dark:text-white">
                            Tất cả sản phẩm
                        </p>
                        <div className='home-best-seller-product'>
                            {listProduct()}
                        </div>

                        <div className='home-center'>
                            <Button onClick={viewMoreProduct}>Xem thêm</Button>
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


function StoreInfo(props) {

    const link = "/map/direct/?longitude=" + props.store.longitude + '&latitude=' + props.store.latitude

    const [url, setURL] = useState()
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("NOT")
        }
        function showPosition(position) {
            var mylat = position.coords.latitude
            var mylong = position.coords.longitude
            setURL('&mylat=' + mylat + '&mylong=' + mylong)
        }

    }, [])

    return (
        <div className='store-detail-cover'>
            <div className='store-business'>
                <div className='store-business'>
                    <div className='store-business-tab-1'>
                        <div>
                            <img
                                src={props.store.user.image}
                                alt="store"
                            />
                        </div>
                        <div className='store-business-address'>
                            <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                                {props.store.user.full_name}
                            </p>
                            <p className='text-mx font-bold text-gray-600 dark:text-white'>
                                {props.store.user.address}
                            </p>
                            <Link to={link + url} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Xem đường đi
                            </Link>
                        </div>
                    </div>
                    {/* <div className='store-business-tab-2'>
                    </div> */}
                    <div className='store-business-tab-3'>
                        {/* <div className='store-business-tab-3-left'>
                            <div className='display-flex'>
                                <svg class="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                                <p className='text-xm font-bold text-gray-900 dark:text-white'>
                                    Đánh giá: 1300
                                </p>
                            </div>
                            <div className='display-flex'>
                                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                                <p className='text-xm font-bold text-gray-900 dark:text-white'>
                                    Sản phẩm: 12
                                </p>
                            </div>
                        </div>
                        <div className='store-business-tab-3-right'>
                            <div className='display-flex'>
                                <svg class="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                <p className='text-xm font-bold text-gray-900 dark:text-white'>
                                    Đã bán: 123
                                </p>
                            </div>
                            <div className='display-flex'>
                                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <p className='text-xm font-bold text-gray-900 dark:text-white'>
                                    Tham gia: 2022-05-12
                                </p>
                            </div>
                        </div> */}

                    </div>
                </div>
            </div>
            <img className=''
                src="https://img5.thuthuatphanmem.vn/uploads/2021/08/25/background-3d-4k_085529380.jpg"
                alt="product 1"
            />

        </div>
    )
}