import './navigation.css';
// import { FcAreaChart, FcManager, FcRules, FcTemplate, FcSms } from "react-icons/fc";
import React from "react";

const Navigation = () => {
    return (
      <div className='navigation'>
          <ul>
            <li>
                <a href='/admin/statistics'> Statistics </a>
            </li>
            <li>
                <a href='/admin/paints'> Products </a>
            </li>
            <li>
                <a href='/admin/orders'> Orders </a>
            </li>
            <li>
                <a href='/admin/contacts'> Contacts </a>
            </li>
          </ul>
      </div>
    );
}
  
  export default Navigation;