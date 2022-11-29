import { useContext, useState, useEffect } from 'react';
import { Button, Carousel } from 'flowbite-react';
import { StoreContext } from '../store/store';
import axios from 'axios';
import Header from '../components/Header';
import AppFooter from '../components/Footer';
import CardProduct from '../components/CardProduct';
import './Home.css'
import { Link } from 'react-router-dom';

const HOST = process.env.REACT_APP_HOST

export default function HomeProduct(props) {
    const { search, setSearch } = useContext(StoreContext)

    const [data, setData] = useState([])
    const [next, setNext] = useState()

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlsearch = urlParams.get('search')
    const category = urlParams.get('category')

    useEffect(() => {
        if (urlsearch) {
            loadDataSearch(search)
        }
        else if (category) {
            loadDataCategory(category)
        }
        else {
            loadData()
        }
    }, [search, urlsearch, category])
    const loadData = () => {
        var config = {
            method: 'get',
            url: HOST + '/product/list/?ordering=-average_rating',
            headers: {}
        };

        axios(config)
            .then(function (response) {
                setData(response.data.results)
                setNext(response.data.next)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const loadDataSearch = (search) => {
        var config = {
            method: 'get',
            url: HOST + '/product/list/?ordering=-average_rating&search=' + search,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                setData(response.data.results)
                setNext(response.data.next)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const loadDataCategory = (category) => {
        var config = {
            method: 'get',
            url: HOST + '/product/list/?ordering=-average_rating&category=' + category,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                setData(response.data.results)
                setNext(response.data.next)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const viewMore = () => {
        var config = {
            method: 'get',
            url: next,
            headers: {
            }
        };
        axios(config)
            .then(function (response) {
                setData(data => data.concat(response.data.results))
                setNext(response.data.next)
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    const listData = () => {
        if (data.length === 0) {
            return <NoProduct />
        }
        let element = data.map((product, index) => {
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
    return (
        <div>
            <header>
                <Header></Header>
            </header>
            <main>
                <div className='body-container'>
                    <div className='home-filter'>
                        <Link to="/products/list?category=1">
                            <p className="text-xl font-bold text-gray-700 dark:text-white hover:text-blue-800">
                                Phân bón
                            </p>
                        </Link>
                        <Link to="/products/list?category=2">

                            <p className="text-xl font-bold text-gray-700 dark:text-white hover:text-blue-800">
                                Thuốc đặt trị
                            </p>
                        </Link>
                        <Link to="/products/list?category=3">

                            <p className="text-xl font-bold text-gray-700 dark:text-white hover:text-blue-800">
                                Thuốc kích thích
                            </p>
                        </Link>
                        <Link to="/products/list?category=4">

                            <p className="text-xl font-bold text-gray-700 dark:text-white hover:text-blue-800">
                                Chế phẩm sinh học
                            </p>
                        </Link>
                        <Link to="/products/list?category=5">

                            <p className="text-xl font-bold text-gray-700 dark:text-white hover:text-blue-800">
                                Vi sinh
                            </p>
                        </Link>
                    </div>
                    <div className='home-best-seller'>
                        <div className='home-best-seller-product'>
                            {listData()}

                        </div>
                        <div className='home-center'>
                            <Button onClick={viewMore}>Xem thêm</Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}


function NoProduct() {
    return (
        <div className='home-no-product'>
            <p className="text-3xl font-bold text-gray-700 dark:text-white">
                Không có sản phẩm phù hợp
            </p>
        </div>
    )
}