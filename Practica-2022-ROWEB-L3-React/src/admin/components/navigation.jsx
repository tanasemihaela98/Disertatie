import './navigation.css';
// import { FcAreaChart, FcManager, FcRules, FcTemplate, FcSms } from "react-icons/fc";
import React from "react";

const Navigation = () => {
    return (
      <div className='navigation'>
          <ul>
            <li>
                Statistics 
                {/* <FcAreaChart/> */}
            </li>
            <li>
                <a href='/admin/paints'>
                Products 
                {/* <FcTemplate/> */}
                </a>
            </li>
            <li>
                <a href='/admin/orders'>
                Orders 
                {/* <FcRules/> */} 
                </a>
            </li>
            <li>
                <a href='/admin/contacts'>
                Contacts 
                {/* <FcManager/> */}
                </a>
            </li>
            <li>
                Other 
                {/* <FcSms/> */}
            </li>
          </ul>
      </div>
    );
}
  
  export default Navigation;