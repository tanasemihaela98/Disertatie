import './Payment.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function () {

  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expMonth, setExpMonth] = useState('mm');
  const [expYear, setExpYear] = useState('yy');
  const [cvv, setCvv] = useState('');
  let token = JSON.parse(window.localStorage.getItem("user-info") );
  const navigate = useNavigate();

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleCardHolderChange = (event) => {
    setCardHolder(event.target.value);
  };

  const handleMonthChange = (event) => {
    setExpMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setExpYear(event.target.value);
  };

  const handleCvvMouseEnter = () => {
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(-180deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(0deg)';
  };

  const handleCvvMouseLeave = () => {
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(0deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(180deg)';
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(token);
    const response = axios.put('http://127.0.0.1:8081/api/carts/'+token.data.user.id,{}).then(
        response => {
            navigate("/");
        });
  };

    return <>
        <div class="container1">
            <div class="card-container">

                <div class="front">
                    <div class="image">
                        <img src="image/chip.png" alt=""/>
                        <img src="image/visa.png" alt=""/>
                    </div>
                    <div class="card-number-box">{cardNumber}</div>
                    <div class="flexbox">
                        <div class="box">
                            <span>card holder</span>
                            <div class="card-holder-name">{cardHolder}</div>
                        </div>
                        <div class="box">
                            <span>expires</span>
                            <div class="expiration">
                                <span class="exp-month">{expMonth}/</span>
                                <span class="exp-year">{expYear}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="back">
                    <div class="stripe"></div>
                    <div class="box">
                        <span>cvv</span>
                        <div class="cvv-box">{cvv}</div>
                        <img src="image/visa.png" alt=""/>
                    </div>
                </div>

            </div>

            <form action="" onSubmit={handleSubmit}>
                <div class="inputBox">
                    <span>card number</span>
                    <input type="text" maxLength="16" class="card-number-input" 
                        value={cardNumber} onChange={handleCardNumberChange}/>
                </div>
                <div class="inputBox">
                    <span>card holder</span>
                    <input type="text" class="card-holder-input"
                        value={cardHolder} onChange={handleCardHolderChange}/>
                </div>
                <div class="flexbox">
                    <div class="inputBox">
                        <span>expiration mm</span>
                        <select name="" id="" class="month-input"
                            value={expMonth} onChange={handleMonthChange}>
                            <option value="month" selected disabled>month</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                    </div>
                    <div class="inputBox">
                        <span>expiration yy</span>
                        <select name="" id="" class="year-input" 
                            value={expYear} onChange={handleYearChange}>
                            <option value="year" selected disabled>year</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                        </select>
                    </div>
                    <div class="inputBox">
                        <span>cvv</span>
                        <input type="text" maxLength="4" class="cvv-input" 
                            value={cvv} 
                            onMouseEnter={handleCvvMouseEnter} 
                            onMouseLeave={handleCvvMouseLeave} 
                            onChange={handleCvvChange}/>
                    </div>
                </div>
                <input type="submit" value="submit" class="submit-btn"/>
            </form>
            </div>    
    </>
}