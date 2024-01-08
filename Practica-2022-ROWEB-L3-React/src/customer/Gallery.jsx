import axios from "axios";
import './Gallery.css';
import React, { useEffect, useState } from "react";

export default function Gallery() {

    const [data, setData] = useState([]);

    const getPaints = async () => {
        const response = await axios.get('http://127.0.0.1:8081/api/paint/findall').then(
            response => {
                setData(response.data.data);
                console.log(response.data.data);
                console.log(new Date(response.data.data[0].updated_at), '###', new Date());
                console.log('data', Math.floor((new Date(response.data.data[0].updated_at) - new Date()) / (24 * 3600 * 1000)));
            });
    };

    const buyProduct = (id) => {
        console.log('buy product',id);
        let cart = {'product_id': id};
        const response = axios.post('http://127.0.0.1:8081/api/carts',cart).then(
            response => {
                console.log('response buy product', response);
            });
    };



    useEffect(() => {
        getPaints();
    }, [])

    return <>
        {data.map((paint, index) => (
            <div className='paint'>
                <img src={'http://localhost:8080/Disertatie/Practica-2022-ROWEB-L3/storage/app/public/' + paint.image} width="300px" />
                <div className='title'>{paint.name}</div>
                <div className='author'>{paint.author}</div>
                {paint.price > 0 ? (
                    <>
                        <div className='price'>{paint.price}</div>
                        <button className='buy' onClick={() => buyProduct(paint.id)}>Buy</button>
                    </>
                ) : (
                    <>
                        <div className='price'>{paint.bid}</div>
                        <button className='buy'>Bid</button>
                        <p></p>
                    </>
                )}
            </div>
        ))}
    </>

}