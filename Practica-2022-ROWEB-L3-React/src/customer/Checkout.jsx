import './Checkout.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function () {

    const [additionalEmail, setAdditionalEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    let token = JSON.parse(window.localStorage.getItem("user-info") );
        const navigate = useNavigate();

    const redirect = () => {
        navigate("/payment");
    }

    const headers =  {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.data.token
      };

    const submitPost = (e) => {
        const data = {
            "city":city,
            "phone":phone,
            "additionalEmail":additionalEmail,
            "address":address,
        }
        
        console.log(token);
        const response = axios.post('http://127.0.0.1:8081/api/user/'+token.data.user.id, data, { headers: headers }).then(
            response => {
                redirect();
            });
    }


    return <>
        <div class="checkout-container">
            <div class="checkout-header">
                <h2>Checkout</h2>
            </div>
            <div class="checkout-form">
                <div class="form-group">
                    <label for="card-number">Email</label>
                    <input type="text" placeholder="Enter your email" value={additionalEmail} onChange={(e) => setAdditionalEmail(e.target.value)}/>
                </div>
                <div class="form-group">
                    <label for="expiry-date">Phone</label>
                    <input type="text" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <div class="form-group">
                    <label for="cvv">City</label>
                    <input type="text"  placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)}/>
                </div>
                <div class="form-group">
                    <label for="address">Address</label>
                    <textarea placeholder="Enter your address" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                </div>
            </div>
            <div class="checkout-footer">
                <button class="checkout-btn" onClick={(e) => submitPost(e)}>Place Order</button>
            </div>
        </div>
    </>

}