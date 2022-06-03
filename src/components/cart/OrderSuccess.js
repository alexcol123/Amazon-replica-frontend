import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData.js'

const OrderSuccess = () => {
  return (
    <Fragment>
      <MetaData title={'Order Success'} />
      <div className='row justify-content-center'>
        <div className='col-6 mt-5 text-center'>
          <img
            src='/images/order_success.png'
            alt=''
            className='my-5 img-fluid d-block mx-auto'
          />

          <h2>Your Order has been placed successfully</h2>
          <Link to='/orders/me'>Go to orders</Link>
        </div>
      </div>
    </Fragment>
  )
}

export default OrderSuccess
