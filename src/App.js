
import './App.css'
import React, { useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch } from 'react-router-dom'
import { useState, createContext } from "react";
import ReactDOM from "react-dom/client";
import Header from './components/Header';
import { StoreContext } from './store/store';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import StoreDetail from './pages/StoreDetail';
import Cart from './pages/Cart'
import Checkout from './pages/Checkout';
import axios from 'axios';
import Mapping from './pages/Mapping'
import HistoryOrder from './pages/HistoryOrder';
import CustomerProfile from './pages/CustomerProfile';
import ChangePassword from './pages/ChangePassword';
import AdminDashboard from './pages/AdminDashboard';
import AdminUser from './pages/AdminUser';
import AdminProduct from './pages/AdminProduct';
import BusinessDashboard from './pages/BusinessDashboard';
import BusinessProduct from './pages/BusinessProduct';
import BusinessOrder from './pages/BusinessOrder';
let permission = "admin"
function App() {
  const [user, setUser] = useState(
    {
      permission: "",
      name: ""
    }
  )
  const [cart, setCart] = useState(0)

  const getUser = async () => {
    var config = {
      method: 'get',
      url: 'http://127.0.0.1:8000/user/',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    };
    await axios(config)
      .then(function (response) {
        localStorage.setItem("role", response.data.permission)
        setUser({ ...user, name: response.data.full_name })
      })
      .catch(function (error) {
      });
  }

  useEffect(() => {
    getUser()
  }, [])
  return (
    <Router>
      <StoreContext.Provider value={{ user, setUser, cart, setCart }}>
        <Router>
          <Route path="/login" exact component={Login}>
          </Route>
          <Route path="/register" component={Register}>
          </Route>
          <Route path='/' component={Guest}>
          </Route>
          <Route path='/customer' component={Customer}>
          </Route>
          {/* <Route path='/customer' render={() => {
            return (localStorage.getItem("role") === "customer") ? <Customer /> : <Login />
          }} /> */}
          <Route path='/admin' component={Admin}>
          </Route>
          {/* <Route path='/admin' render={() => {
            return (localStorage.getItem("role") === "admin") ? <Admin /> : <Login />
          }} /> */}
          <Route path='/business' render={() => {
            return (localStorage.getItem("role") === "business") ? <Business /> : <Login />
          }} />
        </Router>
      </StoreContext.Provider>
    </Router>
  );
}



function Guest() {
  let { path } = useRouteMatch();
  return (
    <Switch>

      <Route exact path={path} component={Home}>
      </Route>
      <Route path="/product" component={Product}>
      </Route>
      <Route path="/store" component={Store}>
      </Route>
      <Route path="/map" component={Mapping}>
      </Route>
    </Switch>
  )
}

function Customer() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        Customer Page
      </Route>
      <Route path={`${path}/cart/:id`} component={CheckoutRoute}>
      </Route>
      <Route path={`${path}/cart/`} component={Cart}>
      </Route>
      <Route path={`${path}/order/`} component={HistoryOrder}>
      </Route>
      <Route path={`${path}/profile/`} component={CustomerProfile}>
      </Route>
      <Route path={`${path}/change-password/`} component={ChangePassword}>
      </Route>
    </Switch>
  )
  function CheckoutRoute(){
    let { id } = useParams();
    return(
      <Checkout />
    )
  } 
}

function Admin() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={AdminDashboard}>
      </Route>
      <Route path={`${path}/user/`} component={AdminUser}>
      </Route>
      <Route path={`${path}/product/`} component={AdminProduct}>
      </Route>
    </Switch>
  )
}

function Business() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={BusinessDashboard}>
      </Route>
      <Route path={`${path}/product/`} component={BusinessProduct}>
      </Route>
      <Route path={`${path}/orders/`} component={BusinessOrder}>
      </Route>
    </Switch>
  )
}

function Product() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <div>Product</div>
      </Route>
      <Route path='/product/:id' component={PageDetail} />
    </Switch>
  )

  function PageDetail(){
    let { id } = useParams();
    return(
      <ProductDetail id={id} />
    )
  } 
}

function Store() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <div>Store</div>
      </Route>
      <Route path='/store/:id' component={StoreBusinessDetail} />
    </Switch>
  )

  function StoreBusinessDetail(){
    let { id } = useParams();
    return(
      <StoreDetail id={id} />
    )
  } 
}

export default App;
