import React, { Component, useEffect } from 'react';
import './dashboard.css';
import Dashboard from './components/dashboard';

function AdminStatistics() {
  return <div className='statistics'>
    <Dashboard/>
  </div>;
}

export default AdminStatistics;