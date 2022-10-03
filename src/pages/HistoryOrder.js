import './Home.css'
import Header from '../components/Header';
import AppFooter from '../components/Footer';
import './HistoryOrder.css'
import StartRating from '../components/StartRating';
import { StoreContext } from '../store/store';
import { useEffect, useState, useContext, useRef } from 'react';
import { Avatar } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function HistoryOrder() {
    return (
        <div>
            <header>
                <Header></Header>
            </header>
            <main>
                <div className='body-container'>
                    <div className='order-container'>
                        <div className='order-tab'>
                            <div className='order-tab-title'>
                                <p className='text-xl font-bold text-gray-800 dark:text-white'>
                                    Tất cả
                                </p>
                                <h1 className='order-tab-underline'>
                                </h1>
                            </div>
                            <div className='order-tab-vertical-line'>
                            </div>
                            <div className='order-tab-title'>
                                <p className='text-xl font-bold text-gray-800 dark:text-white'>
                                    Đang xử lý
                                </p>
                                <h1 className='order-tab-underline'>
                                </h1>
                            </div>
                            <div>
                            <div className='order-tab-vertical-line'>
                            </div>
                            </div>
                            <div className='order-tab-title'>
                                <p className='text-xl font-bold text-gray-800 dark:text-white'>
                                    Đã tiếp nhận
                                </p>
                                <h1 className='order-tab-underline'>
                                </h1>
                            </div>
                            <div>
                            <div className='order-tab-vertical-line'>
                            </div>
                            </div>
                            <div className='order-tab-title'> 
                                <p className='text-xl font-bold text-gray-800 dark:text-white'>
                                    Đã nhận
                                </p>
                                <h1 className='order-tab-underline'>
                                </h1>
                            </div>
                            <div>
                            <div className='order-tab-vertical-line'>
                            </div>
                            </div>
                            <div className='order-tab-title'>
                                <p className='text-xl font-bold text-gray-800 dark:text-white'>
                                    Đã huỷ
                                </p>
                                <h1 className='order-tab-underline'>
                                </h1>
                            </div>

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