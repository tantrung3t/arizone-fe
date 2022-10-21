

import './Admin.css'
import CountUp from 'react-countup';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import SideBarBusiness from '../components/SideBarBusiness';

const data = [
    { name: 'T1', "Tổng": 1000000, "Stripe": 200000 },
    { name: 'T2', "Tổng": 2000000, "Stripe": 800000 },
    { name: 'T3', "Tổng": 1700000, "Stripe": 1200000 },
    { name: 'T4', "Tổng": 1300000, "Stripe": 700000 },
    { name: 'T5', "Tổng": 1300000, "Stripe": 200000 },
    { name: 'T6', "Tổng": 1300000, "Stripe": 1000000 },
    { name: 'T7', "Tổng": 1000000, "Stripe": 200000 },
    { name: 'T8', "Tổng": 2000000, "Stripe": 800000 },
    { name: 'T9', "Tổng": 1700000, "Stripe": 1200000 },
    { name: 'T10', "Tổng": 1300000, "Stripe": 700000 },
    { name: 'T11', "Tổng": 1300000, "Stripe": 200000 },
    { name: 'T12', "Tổng": 1300000, "Stripe": 1000000 },
];

const dataPie = [
    {
        "name": "Group A",
        "value": 400
    },
    {
        "name": "Group B",
        "value": 300
    },
    {
        "name": "Group C",
        "value": 500
    },
    {
        "name": "Group D",
        "value": 200
    }
]

const colors = ["#F98080", "#31C48D", "#7E3AF2", "#8DA2FB"]

export default function BusinessDashboard() {
    return (
        <div>
            <div className='display-flex'>
                <SideBarBusiness BusinessDashboard="true" />
                <div className='admin-container'>
                    <div className='admin-dashboard-analytic'>
                        <div className='admin-dashboard-analytic-card'>
                            <div className='admin-dashboard-analytic-card-body display-flex-only justify-content-sb-only'>
                                <div>
                                    <p className='text-2xl font-bold text-red-500 dark:text-white'>
                                        <CountUp
                                            end={1230000}
                                            separator="," />
                                        đ
                                    </p>
                                    <p className='text-xl font-medium text-gray-500 dark:text-white'>
                                        Giao dịch
                                    </p>
                                </div>
                                <div>
                                    <svg className="w-8 h-8 text-gray-600 mt-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                                </div>
                            </div>
                            <div className='admin-dashboard-analytic-card-footer gradient-red'>

                            </div>
                        </div>
                        <div className='admin-dashboard-analytic-card'>
                            <div className='admin-dashboard-analytic-card-body display-flex-only justify-content-sb-only'>
                                <div>
                                    <p className='text-2xl font-bold text-blue-500 dark:text-white'>
                                        <CountUp end={30} />+
                                    </p>
                                    <p className='text-xl font-medium text-gray-500 dark:text-white'>
                                        Đơn hàng
                                    </p>
                                </div>
                                <div>
                                    <svg className="w-8 h-8 text-gray-600 mt-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
                                </div>
                            </div>
                            <div className='admin-dashboard-analytic-card-footer gradient-blue'>

                            </div>
                        </div>
                        {/* <div className='admin-dashboard-analytic-card'>
                            <div className='admin-dashboard-analytic-card-body display-flex-only justify-content-sb-only'>
                                <div>
                                    <p className='text-2xl font-bold text-green-500 dark:text-white'>
                                        <CountUp end={100} />+
                                    </p>
                                    <p className='text-xl font-medium text-gray-500 dark:text-white'>
                                        Người dùng
                                    </p>
                                </div>
                                <div>
                                    <svg className="w-8 h-8 text-gray-600 mt-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                                </div>
                            </div>
                            <div className='admin-dashboard-analytic-card-footer gradient-green'>

                            </div>
                        </div> */}
                        <div className='admin-dashboard-analytic-card'>
                            <div className='admin-dashboard-analytic-card-body display-flex-only justify-content-sb-only'>
                                <div>
                                    <p className='text-2xl font-bold text-purple-500 dark:text-white'>
                                        <CountUp
                                            end={500000}
                                            separator="," />
                                        đ
                                    </p>
                                    <p className='text-xl font-medium text-gray-500 dark:text-white'>
                                        Stripe
                                    </p>
                                </div>
                                <div>
                                    <svg className="w-8 h-8 text-gray-600 mt-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                                </div>
                            </div>
                            <div className='admin-dashboard-analytic-card-footer gradient-purple'>

                            </div>
                        </div>
                    </div>
                    <div className='admin-dashboard-analytic'>
                        <div className='admin-dashboard-analytic-chart-60'>
                            <LineChart width={700} height={300} data={data}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                {/* <Legend/> */}
                                <Line type="monotone" dataKey="Tổng" stroke="#F05252" strokeWidth={3} />
                                <Line type="monotone" dataKey="Stripe" stroke="#9061F9" strokeWidth={3} />
                            </LineChart>
                        </div>
                        <div className='admin-dashboard-analytic-chart-40'>
                            <PieChart width={300} height={300}>
                                <Pie data={dataPie} cx="50%" cy="50%" outerRadius={120} label>
                                    {
                                        data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors[index]} />
                                        ))
                                    }
                                </Pie>
                            </PieChart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

