import React, { Component, useEffect } from 'react';
import './contacts.table.css';
import { useState } from 'react';
import ContactService from '../contact.service';


function ContactsTable() {

  const [expandedRows, setExpandedRows] = useState(-1);
  const [contacts, setContacts] = useState([]);

  const getAllContacts = () => {
    ContactService.getAllContacts().then((response) => {
        setContacts(Array.from(response.data.data));
        console.log('getAllContacts', response.data.data);
    })
};

useEffect(() => {
  getAllContacts();
}, []);

  const toggleMessageRow = (index, contact) => {
    if(index == expandedRows) {
      setExpandedRows(-1);
    } else {
      setExpandedRows(index);
      contact.status = "read";
    }

    
    ContactService.updateContact(contact.id).then((response) => {
      
    })  
  };

    useEffect(() => {
    }, []);

    return <table className="mail-list">
      <tbody>
      {
        contacts.map(
          (contact, index) =>
          <>
            <tr className="mail-item" onClick={(e) => toggleMessageRow(index, contact)}>
              <td><input type="checkbox"/></td>
              <td><span className={`bullet ${contact.status == "unread" ? "unread" : ""}`}></span></td>
              <td className="sender">{contact.email}</td>
              <td className="message">{contact.title}</td>
            </tr>
            <tr className={`message-row ${expandedRows == index ? "active" : ""}`}>
              <td colspan="4">
                <p>{contact.message}</p>
              </td>
            </tr>
          </>
      )}
      </tbody>
    </table>;

}

export default ContactsTable;
