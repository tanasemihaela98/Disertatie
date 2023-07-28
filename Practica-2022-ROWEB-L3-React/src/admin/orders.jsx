import React, { Component, useEffect } from 'react';
import './orders.css';
import OrdersTable from './components/orders.table';

function AdminOrders() {
  return <div className='orders'>
    <OrdersTable/>
  </div>;
}

export default AdminOrders;