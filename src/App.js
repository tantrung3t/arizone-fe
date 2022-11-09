
import './App.css'
import React, { useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch } from 'react-router-dom'
import { useState, createContext } from "react";
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
import BusinessTransaction from './pages/BusinessTransaction';
import BusinessSetting from './pages/BusinessSetting';
import MapDirection from './pages/MapDirection'
import BusinessRegister from './pages/BusinessRegister';
import BusinessDetailProduct from './pages/BusinessDetailProduct';

const HOST = process.env.REACT_APP_HOST

function App() {
  const [user, setUser] = useState(
    {
      permission: null,
      full_name: null,
      image: null
    }
  )
  const [cart, setCart] = useState(0)
  const getToken = async () => {
    let data = {
      "refresh": localStorage.getItem('refreshToken')
    }
    var config = {
      method: 'post',
      url: HOST + '/refresh-token/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    await axios(config)
      .then(function (response) {
        localStorage.setItem("accessToken", response.data.access)
      })
      .catch(function (error) {
        localStorage.clear()
      });

  }
  const getUser = async () => {
    var config = {
      method: 'get',
      url: HOST + '/user/',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    };
    await axios(config)
      .then(function (response) {
        if (response.data.permission === "customer") {
          localStorage.setItem("role", "ctm")
          setUser(response.data)
        }
      })
      .catch(function (error) {

      });
  }

  useEffect(() => {
    getToken()
    getUser()
  }, [])

  return (
    <Router>
      <StoreContext.Provider value={{ user, setUser, cart, setCart }}>
        <Router>
          <Route path="/login" exact component={Login}>
          </Route>
          <Route path="/business-register" component={BusinessRegister}>
          </Route>
          <Route path='/' component={Guest}>
          </Route>
          <Route path='/customer' render={() => {
            return (localStorage.getItem("role") === "ctm") ? <Customer /> : <Login />
          }} />
          <Route path='/admin' render={() => {
            return (localStorage.getItem("role") === "adm") ? <Admin /> : <Login />
          }} />
          <Route path='/business' render={() => {
            return (localStorage.getItem("role") === "bsn") ? <Business /> : <Login />
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
      <Route path="/map/:string" component={Direction}>
      </Route>
      <Route path="/map" component={Mapping}>
      </Route>
    </Switch>
  )
}

function Direction() {
  let { string } = useParams();
  return (
    <MapDirection data={string} />
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
  function CheckoutRoute() {
    let { id } = useParams();
    return (
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
      <Route path={`${path}/products/`} component={BusinessProduct}>
      </Route>
      <Route path={`${path}/product/:id`} component={DetailProduct}>
      </Route>
      <Route path={`${path}/orders/`} component={BusinessOrder}>
      </Route>
      <Route path={`${path}/transactions/`} component={BusinessTransaction}>
      </Route>
      <Route path={`${path}/settings/`} component={BusinessSetting}>
      </Route>
    </Switch>
  )
  function DetailProduct() {
    let { id } = useParams();
    return (
      <BusinessDetailProduct id={id} />
    )
  }
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

  function PageDetail() {
    let { id } = useParams();
    return (
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

  function StoreBusinessDetail() {
    let { id } = useParams();
    return (
      <StoreDetail id={id} />
    )
  }
}

export default App;
