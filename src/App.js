
import './App.css';
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
import axios from 'axios';
import Map from './pages/Maping'
let permission = "admin"
function App() {
  const [user, setUser] = useState(
    {
      permission: "",
      name: "Tan Trung"
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
          <Route path='/admin' render={() => {
            return (localStorage.getItem("role") === "admin") ? <Admin /> : <Login />
          }} />
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
      <Route path="/map" component={Map}>
      </Route>
    </Switch>
  )
}

function Admin() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <div>Admin Page</div>
      </Route>
    </Switch>
  )
}

function Business() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <div>Business Page</div>
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

export default App;
