import { useState, useEffect } from 'react';
import './Business.css'
import { Dropdown } from 'flowbite-react';
import SideBarBusiness from '../components/SideBarBusiness';
import axios from 'axios';

export default function BusinessTransaction() {
    const [transactions, setTransaction] = useState([])
    const [next, setNext] = useState()
    const [previous, setPrevious] = useState()


    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        var config = {
            method: 'get',
            url: process.env.REACT_APP_HOST + '/transactions/?ordering=-timestamp',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
            }
        };

        axios(config)
            .then(function (response) {
                setTransaction(response.data.results)
                setNext(response.data.next)
                setPrevious(response.data.previous)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const listTransaction = () => {
        let element = transactions.map((transaction, index) => {
            return <Transaction key={index}
                data={transaction}
            />
        })
        return element;
    }

    const nextPage = () => {
        var config = {
            method: 'get',
            url: next,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
            }
        };
        axios(config)
            .then(function (response) {
                setTransaction(response.data.results)
                setNext(response.data.next)
                setPrevious(response.data.previous)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const previousPage = () => {
        var config = {
            method: 'get',
            url: previous,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
            }
        };

        axios(config)
            .then(function (response) {
                setTransaction(response.data.results)
                setNext(response.data.next)
                setPrevious(response.data.previous)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div>
            <div className='display-flex'>
                <SideBarBusiness BusinessTransaction="true" />
            </div>
            <div className='business-container'>
                <div className="business-product">
                    <div className='business-product-search'>
                        <form>
                            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Your Email</label>
                            <div className="relative">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <input type="search" name="search-product" id="search-product" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                                <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                            </div>
                        </form>
                    </div>

                    <div className='business-transaction-title bg-gray-200'>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>
                            Mã giao dịch
                        </p>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>
                            Mô tả
                        </p>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>
                            Số tiền
                        </p>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>
                            Khách hàng
                        </p>
                        <p className='text-base font-medium text-gray-600 dark:text-gray-300'>
                            Thời gian
                        </p>
                    </div>

                    <div className='business-product-list'>
                        {listTransaction()}
                    </div>
                    <div className='pagination'>
                        <button onClick={previousPage} type="button" className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            Trang trước
                        </button>
                        <button onClick={nextPage} type="button" className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            Trang kế
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

function Transaction(props) {
    let timeStamp = props.data.timestamp
    let dateFormat = new Date(timeStamp * 1000);
    const time = dateFormat.getHours() + ":" + dateFormat.getMinutes() + " " + dateFormat.getDate() + "-" + (dateFormat.getMonth() + 1) + "-" + dateFormat.getFullYear()
    return (
        <div className='business-transaction'>
            <p className='text-sm font-medium text-purple-800 dark:text-gray-300'>
                {props.data.stripe_payment}
            </p>
            <p className='text-sm font-medium text-gray-600 dark:text-gray-300'>
                Thanh toán cho đơn hàng {props.data.order}
            </p>
            <p className='text-base font-medium text-green-500 dark:text-gray-300'>
                {props.data.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
            </p>
            <p className='text-sm font-medium text-gray-600 dark:text-gray-300'>
                {props.data.buyer}
            </p>
            <p className='text-sm font-medium text-gray-600 dark:text-gray-300'>
                {time}
            </p>
        </div>
    )
}