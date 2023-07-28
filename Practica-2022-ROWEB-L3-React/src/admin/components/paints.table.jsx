import React, { Component, useEffect } from 'react';
import './paints.table.css';
import { useState } from 'react';
import PaintService from '../paint.service';
// import { IoTrashSharp, IoPencilSharp } from "react-icons/io5";
import axios from 'axios';

function PaintsTable() {
    const [paints, setPaints] = useState([]);
    const [editablePaintById, setEditablePaintId] = useState(null);

    const [mainImage, setMainImage] = useState(null);
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newAuthor, setNewAuthor] = useState('');


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setMainImage(file);
    };

    async function deletePaint(id) {
        PaintService.deletePaint(id).then((response) => {
            getAllPaints();
        })
    }

    function editPaint(paint) {
        setEditablePaintId(paint.id);
        setNewName(paint.name);
        setNewPrice(paint.price);
        setNewAuthor(paint.author);
    }

    function cancelEditPaint() {
        setEditablePaintId(-1);
        setNewName('');
        setNewPrice(-1);
        setNewAuthor('');
    }

    async function updateNewPaint() {
        try {
            const formData = new FormData();
            if(mainImage != null) {
                formData.append('file', mainImage);
            }
            formData.append('name', newName);
            formData.append('id', editablePaintById);
            formData.append('author', newAuthor);
            formData.append('price', newPrice);
    
            const response = await axios({
                method: "post",
                url: "http://127.0.0.1:8081/api/paint/update/" + editablePaintById,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
        } catch (error) {
            console.log('Error uploading image:', error);
        }

        setEditablePaintId(-1);
        getAllPaints();

    }

    const getAllPaints = () => {
        PaintService.getAllPaints().then((response) => {
            setPaints(Array.from(response.data.data));
            console.log(response.data);
        })
    };

    useEffect(() => {
        getAllPaints();
    }, []);

    return <div className='productstable'>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    paints.map(
                        paint =>
                            paint.id !== editablePaintById ? (
                                <tr key={paint.id}>
                                    <td>{paint.id}</td>
                                    <td> 
                                        <img src={'http://localhost/Disertatie/Practica-2022-ROWEB-L3/storage/app/public/' + paint.image} height="50px" /> 
                                    </td>
                                    <td>{paint.name}</td>
                                    <td>{paint.author}</td>
                                    <td>{paint.price}</td>

                                    <td>
                                        <button onClick={() => deletePaint(paint.id)}>
                                            Delete 
                                            {/* <IoTrashSharp /> */}
                                        </button>
                                        <button onClick={() => editPaint(paint)}>
                                            Edit 
                                            {/* <IoPencilSharp /> */}
                                        </button>
                                    </td>
                                </tr>
                            ) : (
                                <tr key={paint.id}>
                                    <td>
                                        {paint.id}
                                    </td>
                                    <td>
                                        <input id='file' name='file' type='file'
                                            onChange={handleImageChange} />
                                    </td>
                                    <td>
                                        <input id='name' name='name' value={newName}
                                            onChange={(e) => setNewName(e.target.value)} placeholder={'Name'} />
                                    </td>
                                    <td>
                                        <input id='author' name='author' value={newAuthor}
                                            onChange={(e) => setNewAuthor(e.target.value)} placeholder={'author'} />
                                    </td>
                                    <td>
                                        <input id='price' name='price' value={newPrice}
                                            onChange={(e) => setNewPrice(e.target.value)} placeholder={'price'} />
                                    </td>
                                    <td>
                                        <button onClick={() => cancelEditPaint()}>
                                            Cancel
                                        </button>
                                        <button onClick={() => updateNewPaint()}>
                                            Update
                                            {/* <IoPencilSharp /> */}
                                        </button>
                                    </td>
                                </tr>
                            )
                    )
                }
            </tbody>
        </table>
    </div>;
}

export default PaintsTable;
