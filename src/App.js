import { useEffect, useState, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import Home from './components/Home'
import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import UpdateProfile from './components/user/UpdateProfile'
import ProtectedRoute from './components/route/ProtectedRoute'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'
import OrderSuccess from './components/cart/OrderSuccess'
import ListOrders from './components/order/ListOrders'
import UpdateProduct from './components/admin/UpdateProduct'

import './App.css'
import ProductDetails from './components/product/ProductDetails'
import Cart from './components/cart/Cart'

import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/ConfirmOrder'
import Payment from './components/cart/Payment'

import { loadUser, updatePassword } from './actions/userActions'
import store from './store'
import axios from 'axios'

// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import OrderDetails from './components/order/OrderDetails'
import Dashboard from './components/admin/Dashboard'

import ProductsList from './components/admin/ProductsList'
import NewProduct from './components/admin/NewProduct'
import { userReducer } from './reducers/userReducers'
import { useSelector } from 'react-redux'
import OrdersList from './components/admin/OrdersList'
import ProcessOrder from './components/admin/ProcessOrder'
import UserList from './components/admin/UserList'
import UpdateUser from './components/admin/UpdateUser'
import ProductReviews from './components/admin/ProductReviews'

function App() {
  const [stripeApiKey, setStripeApiKey] = useState(null)

  useEffect(() => {
    store.dispatch(loadUser())

    // async function getStripApiKey() {
    //   const { data } = await axios.get('/api/v1/stripeapi')

    //   setStripeApiKey(data.stripeApiKey)
    // }

    // getStripApiKey()
  }, [])

  const { user, loading } = useSelector((state) => state.auth)

  return (
    <Router>
      <div className='App'>
        <Header />

        <div className='container container-fluid'>
          <Route exact path='/' component={Home} />
          <Route path='/search/:keyword' component={Home} />
          <Route path='/product/:id' component={ProductDetails} exact />

          <Route path='/cart' component={Cart} exact />
          <ProtectedRoute path='/shipping' component={Shipping} />
          <ProtectedRoute path='/confirm' component={ConfirmOrder} exact />
          <ProtectedRoute path='/success' component={OrderSuccess} />
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path='/payment' component={Payment} />
            </Elements>
          )}

          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/password/forgot' component={ForgotPassword} exact />
          <Route path='/password/reset/:token' component={NewPassword} exact />

          <ProtectedRoute path='/me' component={Profile} exact />
          <ProtectedRoute path='/me/update' component={UpdateProfile} exact />
          <ProtectedRoute
            path='/password/update'
            component={UpdatePassword}
            exact
          />

          <ProtectedRoute path='/orders/me' component={ListOrders} exact />
          <ProtectedRoute path='/order/:id' component={OrderDetails} exact />

          {/* <ProtectedRoute path='/admin/product' component={OrderDetails} exact /> */}
        </div>
        <ProtectedRoute
          path='/dashboard'
          isAdmin={true}
          component={Dashboard}
          exact
        />

        <ProtectedRoute
          path='/admin/products'
          isAdmin={true}
          component={ProductsList}
          exact
        />

        <ProtectedRoute
          path='/admin/product'
          isAdmin={true}
          component={NewProduct}
          exact
        />

        <ProtectedRoute
          path='/admin/product/:id'
          isAdmin={true}
          component={UpdateProduct}
          exact
        />

        <ProtectedRoute
          path='/admin/orders'
          isAdmin={true}
          component={OrdersList}
          exact
        />

        <ProtectedRoute
          path='/admin/order/:id'
          isAdmin={true}
          component={ProcessOrder}
          exact
        />

        <ProtectedRoute
          path='/admin/users'
          isAdmin={true}
          component={UserList}
          exact
        />

        <ProtectedRoute
          path='/admin/user/:id'
          isAdmin={true}
          component={UpdateUser}
          exact
        />

<ProtectedRoute
          path='/admin/reviews'
          isAdmin={true}
          component={ProductReviews }
          exact
        />

        <Footer />
      </div>
    </Router>
  )
}

export default App
