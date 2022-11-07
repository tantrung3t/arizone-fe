import { useContext, useState, useEffect } from 'react';
import { Button, Carousel } from 'flowbite-react';
import { StoreContext } from '../store/store';
import axios from 'axios';
import Header from '../components/Header';
import AppFooter from '../components/Footer';
import CardProduct from '../components/CardProduct';
import './Home.css'
import syngenta from '../image/logo-syngenta.png'
import loctroi from '../image/logo-loc-troi.png'
import adc from '../image/logo-ADC.png'
import vcf from '../image/logo-vfc.png'
import bayer from '../image/Logo_Bayer.svg.png'
import binhdien from '../image/logo-binh-dien.png'
import camau from '../image/logo-dam-ca-mau.png'

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

export default function Home() {

    const { cart, setCart } = useContext(StoreContext)
    const [productSale, setProductSale] = useState(apiProduct)
    const [products, setProducts] = useState([])
    const [next, setNext] = useState()

    const listProductSale = () => {
        let element = productSale.map((product, index) => {
            return <CardProduct key={index}
                product_name={product.product_name}
                image={product.image}
                price={product.price}
                sale={product.sale}
            />
        })
        return element;
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

    const viewMoreProduct = async () => {
        var config = {
            method: 'get',
            url: next,
            headers: {
            }
        };
        await axios(config)
            .then(function (response) {
                setProducts(products => products.concat(response.data.results))
                setNext(response.data.next)
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    const getProduct = async () => {
        var config = {
            method: 'get',
            url: HOST + '/product/list/',
            headers: {
            }
        };
        await axios(config)
            .then(function (response) {
                setProducts(response.data.results)
                setNext(response.data.next)
            })
            .catch(function (error) {

            });
    }


    useEffect(() => {
        getProduct()
    }, [])


    return (
        <div>
            <header>
                <Header></Header>
            </header>
            <main>
                <div className='body-container'>

                    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                        <Carousel indicators={false} slideInterval={5000}>
                            <div className="flex h-full items-center justify-center bg-blue-400 dark:bg-gray-700 dark:text-white">
                                {/* <div className='home-carousel-product'>
                                    <CardProduct></CardProduct>
                                    <CardProduct></CardProduct>
                                    <CardProduct></CardProduct>
                                    <CardProduct></CardProduct>
                                </div> */}
                            </div>
                            <div className="flex h-full items-center justify-center bg-yellow-200 dark:bg-gray-700 dark:text-white">
                            </div>
                            <div className="flex h-full items-center justify-center bg-red-400 dark:bg-gray-700 dark:text-white">

                            </div>
                        </Carousel>
                    </div>
                    <div className='home-best-seller'>
                        <p className="home-title text-4xl font-bold text-gray-900 dark:text-white">
                            Sản phẩm bán chạy
                        </p>
                        <div className='home-best-seller-product'>
                            {listProductSale()}
                        </div>
                    </div>

                    <div className='home-best-seller'>
                        <p className="home-title text-4xl font-bold text-gray-900 dark:text-white">
                            Sản phẩm đến từ
                        </p>
                        <div className='home-best-business'>
                            <Carousel indicators={false} slideInterval={3000}>
                                <div className="flex h-full items-center justify-center dark:bg-gray-700 dark:text-white">

                                    <BusinessCard
                                        url={syngenta} />
                                    <BusinessCard
                                        url={bayer} />
                                    <BusinessCard
                                        url={loctroi} />
                                </div>
                                <div className="flex h-full items-center justify-center dark:bg-gray-700 dark:text-white">

                                    <BusinessCard
                                        url={binhdien} />
                                    <BusinessCard
                                        url={camau} />


                                </div>
                                <div className="flex h-full items-center justify-center dark:bg-gray-700 dark:text-white">
                                    <BusinessCard
                                        url={adc} />
                                    <BusinessCard
                                        url={vcf} />


                                </div>
                            </Carousel>
                        </div>
                    </div>
                    <div className='home-best-seller'>
                        <p className="home-title text-4xl font-bold text-gray-900 dark:text-white">
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

function BusinessCard(props) {
    return (
        <div className='business-card-container'>

            <img
                src={props.url}
                alt=""
            />
        </div>
    )
}