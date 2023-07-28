import React, { Component, useEffect } from 'react';
import './paints.css';
import PaintsTable from './components/paints.table';
import CreatePaints from './components/create.paint';
import Navigation from './components/navigation';

function AdminPaints() {
  return <div className='products'>
    <CreatePaints/>
    <PaintsTable/>
  </div>;
}

export default AdminPaints;