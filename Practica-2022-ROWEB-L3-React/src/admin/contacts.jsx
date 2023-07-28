import React, { Component, useEffect } from 'react';
import './orders.css';
import ContactsTable from './components/contacts.table';

function AdminContacts() {
  return <div className='contacts'>
    <ContactsTable/>
  </div>;
}

export default AdminContacts;