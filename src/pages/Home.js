import { useContext, useState } from 'react';
import { Button, Carousel } from 'flowbite-react';
import { StoreContext } from '../store/store';
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
        product: "1"
    },
    {
        product: "1"
    },
    {
        product: "1"
    },
    {
        product: "1"
    },
]

export default function Home() {

    const { cart, setCart } = useContext(StoreContext)

    const [products, setProducts] = useState(apiProduct)

    const listProduct = () => {
        let element = products.map((product, index) => {
            return <CardProduct key={index} />
        })
        return element;
    }

    const viewMoreProduct = () => {
        setProducts(products => products.concat(apiProduct));
        setCart(cart+1)
    }

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
                            <CardProduct />
                            <CardProduct />
                            <CardProduct />
                            <CardProduct />
                        </div>
                    </div>

                    <div className='home-best-seller'>
                        <p className="home-title text-4xl font-bold text-gray-900 dark:text-white">
                            Thương hiệu
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
                            <CardProduct />
                            <CardProduct />
                            <CardProduct />
                            <CardProduct />
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