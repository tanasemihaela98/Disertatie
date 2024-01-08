import React, { Component, useEffect } from 'react';
import './orders.table.css';
import { useState } from 'react';
import OrderService from '../order.service';
// import { IoTrashSharp, IoPencilSharp } from "react-icons/io5";
import axios from 'axios';

function OrdersTable() {
    const [orders, setOrders] = useState([]);
    const [editableOrderById, setEditableOrderId] = useState(null);

    const [mainImage, setMainImage] = useState(null);
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newAuthor, setNewAuthor] = useState('');


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setMainImage(file);
    };

    async function deleteOrder(id) {
        OrderService.deleteOrder(id).then((response) => {
            getAllOrders();
        })
    }

    function editOrder(order) {
        setEditableOrderId(order.id);
        setNewName(order.name);
        setNewPrice(order.price);
        setNewAuthor(order.author);
    }

    function cancelEditOrder() {
        setEditableOrderId(-1);
        setNewName('');
        setNewPrice(-1);
        setNewAuthor('');
    }

    async function updateNewOrder(cartId) {
        OrderService.deliverOrder(cartId).then((response) => {
            getAllOrders();
        })
    }

    const getAllOrders = () => {
        OrderService.getAllOrders().then((response) => {
            setOrders(Array.from(response.data.data));
            console.log('getAllOrders', response.data.data);
        })
    };

    useEffect(() => {
        getAllOrders();
    }, []);

    return <div className='orderstable'>
        <table>
            <thead>
                <tr>
                    <th>Quantity</th>
                    <th>Paint</th>
                    <th>Price</th>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    orders.map(
                        order =>
                            <tr key={order.id}>
                                <td>{order.quantity}</td>
                                {/* <td>{order.paint.name} </td> */}
                                {/* <td>{order.paint.price}</td> */}
                                <td>{order.user.name}</td>
                                <td>{order.user.email}</td>

                                <td>
                                    <button onClick={() => updateNewOrder(order.id)}>
                                        Deliver 
                                        {/* <IoTrashSharp /> */}
                                    </button>
                                </td>
                            </tr>
                        ) 
                }
            </tbody>
        </table>
    </div>;
}

export default OrdersTable;
