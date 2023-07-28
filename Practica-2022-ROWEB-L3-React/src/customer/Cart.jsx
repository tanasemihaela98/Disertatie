import './Cart.css';
import axios from "axios";
import React, { useEffect, useState } from "react";


export default function () {

    const [products, setProducts] = useState([]);
    var totalPrice = 0;

    const getCart = async () => {
        const response = await axios.get('http://127.0.0.1:8081/api/carts').then(
            response => {
                console.log(response.data.data);
                setProducts(response.data.data);
            });

    };

    const plusQuantity = async (cart) => {
        cart.quantity++;
        const response = await axios.put('http://127.0.0.1:8081/api/cart/'+ cart.id, cart).then(
            response => {
                getCart();
            });
    };

    const minusQuantity = async (cart) => {
        if(cart.quantity > 1) {
            cart.quantity--;
            const response = await axios.put('http://127.0.0.1:8081/api/cart/'+ cart.id, cart).then(
                response => {
                    getCart();
                });
        }
    };

    const incrementTotalPrice = async (price, quantity) => {
        totalPrice = totalPrice + (price * quantity);
    }

    useEffect(() => {
        getCart();
    }, [])


    return <>
        <div className="container">
            <div className="left-column">
            {
                products.map(
                    product =>
                    <div className="product">
                        <h3 className="product-title"> {product.paint.name} / {product.paint.price} $</h3>
                        <div className="product-quantity">
                            <span className="quantity-label">Quantity:</span>
                            <button className="quantity-btn minus" onClick={(e) => minusQuantity(product)}>-</button>
                            <span className="quantity"> {product.quantity} </span>
                            <button className="quantity-btn plus" onClick={(e) => plusQuantity(product)}>+</button>
                        </div>
                    </div>
                )
            }
            </div>
            <div className="right-column">
                <div className="cart-summary">
                    <h2>Cart Summary</h2>
                    <div className="cart-items">
                    {
                        products.map(
                            product =>
                            {
                                incrementTotalPrice(product.paint.price, product.quantity);
                                return  (
                                    <div className="cart-item">
                                        <span className="item-name">{product.paint.name}</span>
                                        <span className="item-quantity">{product.quantity}</span>
                                        <span className="item-price">{product.paint.price * product.quantity} $</span>
                                    </div>
                                );
                            }
                        )
                    }
                    </div>
                    <div className="cart-total">
                        <span className="total-label">Total:</span>
                        <span className="total-price">{totalPrice} $</span>
                    </div>
                </div>
                <a href='/checkout'>
                    <button >Next</button>
                </a>
            </div>
        </div>
    </>

}