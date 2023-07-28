import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom'; 
import { Button, Modal, ModalTitle } from 'react-bootstrap';
import axios from "axios";

function Products()
{
    let token = JSON.parse(window.localStorage.getItem("user-info") );
    
    const [data, setData] = useState([]);
    const [rowData,setRowData]= useState([]);
    
    const [viewShow, setViewShow]= useState(false);
    const handleViewShow = ()=> {setViewShow(true)};
    const handleViewClose = ()=> {setViewShow(false)};

    const [viewPost, setPostShow]= useState(false);
    const handlePostShow = ()=> {setPostShow(true)};
    const handlePostClose = ()=> {setPostShow(false)};

    const [viewEdit, setEditShow]= useState(false);
    const handleEditShow = ()=> {setEditShow(true)};
    const handleEditClose = ()=> {setEditShow(false)};

    const [viewDelete, setDeleteShow]= useState(false);
    const handleDeleteShow = ()=> {setDeleteShow(true)};
    const handleDeleteClose = ()=> {setDeleteShow(false)};

    const [id,setId]=useState("");
    const [category_id,setCategoryId]=useState("");
    const [name,setName]=useState("");
    const [description,setDescription]=useState("");
    const [quantity,setQuantity]=useState("");
    const [price,setPrice]=useState("");
    const [image,setImage]=useState(null);
    const [status,setStatus]=useState("");

    const config = {
      headers: { 
        Authorization: "Bearer " + token.data.token,
        "Content-Type": "multipart/form-data",
        "Accept": "application/json",
        "type": "formData"
    }
  };

  const getProducts = async () => {
    const response=await fetch("http://127.0.0.1:8081/api/products",{
        method:"GET",
        headers:{
                 "Accept":"application/json",
                 "Content-Type":"application/json",
                 "Authorization": "Bearer " + token.data.token
              },
    })
    const data = await response.json();
    setData(data?.data.data);
    console.log(data?.data.data);                
  };

  const addProducts = async () => {
    const url = 'http://127.0.0.1:8081/api/createproducts'
    const Credentials = { category_id,name,description,quantity,price,image,status }
    axios.post(url, Credentials, config)
        .then(response => {
            const result = response.data;
            //const { status } = result;
            if (result.status == true) {
                alert('New product added!');
                //setData([...data, response.data.data]);
                getProducts();
                
            }
            else {
                alert('Add error');
                
            }
        })
        .catch(err => {
            alert(err);
        })       
  };

  const editProducts = async () => {
    const url = `http://127.0.0.1:8081/api/updateproducts/${id}`
    const Credentials = { category_id,name,description,quantity,price,image,status }
    axios.post(url, Credentials, config)
        .then(response => {
            const result = response.data;
            //const { status } = result;
            if (result.status == true) {
                alert('Product updated!');
                //setData([...data, response.data.data]);
                getProducts();
                
            }
            else {
                alert('Add error');
                
            }
        })
        .catch(err => {
            alert(err)
        })
             
  };

  const deleteProducts = async () => {
    const url = `http://127.0.0.1:8081/api/deleteproducts/${id}`
    axios.delete(url, config)
        .then(response => {
            const result = response.data;
            //const { status } = result;
            if (result.status == true) {
                alert('Product deleted!');
                //setData([...data, response.data.data]);
                getProducts();
                
            }
            else {
                alert('Delete error');
                
            }
        })
        .catch(err => {
            alert(err);
        })
             
  };

  useEffect(() => {
    getProducts();
  }, [])

  
    return(
       <div> 
        <div className='row'>
            <div className='mt-5 mb-4'>
                <Button variant='primary' onClick={handlePostShow}><i className='fa fa-plu'></i>
                    Add New Product
                </Button>
            </div>
      </div>
        <div className='row'>
         <div className='table-responsive'>
          <table className='table table-striped table-hover table-bordered'>
            <thead>
              <tr>
                <th>Category ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Image</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) =>
                <tr key={item.id}>
                  <td>{item.category_id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td><img width="25" height="25" src={item.image_url}/></td>
                  <td>{item.status}</td>
                  <td style={{ minWidth: 190 }}>
                    <Button size='lg' variant='info' onClick={() => {handleViewShow(setRowData(item))}}>View</Button>&nbsp;
                    <Button size='lg' variant='secondary' onClick={() => {handleEditShow(setRowData(item),setId(item.id))}}>Edit</Button> &nbsp;
                    <Button size='lg' variant='danger' onClick={() => {handleDeleteShow(setRowData(item),setId(item.id))}}>Delete</Button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW PRODUCT */}
      <div className='model-box-view'>
         <Modal
          show={viewShow}
          onHide={handleViewClose}
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>View Product Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className='form-group'>
                <input type="text" className='form-control' value={rowData.category_id} readOnly />
              </div>
              <div className='form-group mt-3'>
                <input type="text" className='form-control' value={rowData.name} readOnly />
              </div>
              <div className='form-group mt-3'>
                <input type="text" className='form-control' value={rowData.description} readOnly />
              </div>
              <div className='form-group mt-3'>
                <input type="text" className='form-control' value={rowData.quantity} readOnly />
              </div>
              <div className='form-group mt-3'>
                <input type="text" className='form-control' value={rowData.price} readOnly />
              </div>
              <div className='form-group mt-3'>
              <img width="100%" height="550" src={rowData.image_url} alt="No image"/>
              </div>
              <div className='form-group mt-3'>
                <input type="email" className='form-control' value={rowData.status} readOnly />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleViewClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>

       {/* ADD NEW PRODUCT */}
       <div className='model-box-view'>
         <Modal
          show={viewPost}
          onHide={handlePostClose}
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add new Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className='form-group'>
                <input type="text" className='form-control' onChange={(e) => setCategoryId(e.target.value)} placeholder="Please enter category id"/>
              </div>
              <div className='form-group mt-3'>
                <input type="text" className='form-control' onChange={(e) => setName(e.target.value)} placeholder="Please enter name" />
              </div>
              <div className='form-group mt-3'>
                <input type="text" className='form-control' onChange={(e) => setDescription(e.target.value)} placeholder="Please enter description" />
              </div>
              <div className='form-group mt-3'>
                <input type="text" className='form-control' onChange={(e) => setQuantity(e.target.value)} placeholder="Please enter quantity" />
              </div>
              <div className='form-group mt-3'>
                <input type="text" className='form-control' onChange={(e) => setPrice(e.target.value)} placeholder="Please enter price" />
              </div>
              <div className='form-group mt-3'>
                <input type="file" className='form-control' accept="image/*" onChange={(e) => setImage((e.target.files[0]))} />
              </div>
              <div className='form-group mt-3'>
                <input type="text" className='form-control' onChange={(e) => setStatus(e.target.value)} placeholder="Please enter status" />
              </div>

              <Button type='submit' className='btn btn-success mt-4' onClick={addProducts}>Add Product</Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handlePostClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* UPDATE PRODUCT */}
      <div className='model-box-view'>
         <Modal
          show={viewEdit}
          onHide={handleEditClose}
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
            <div className='form-group'>
                <input type="text" className='form-control' onChange={(e) => setCategoryId(e.target.value)} placeholder="Please enter category id"/>
              </div>
              <div className='form-group mt-3'>
                <input type="text" className='form-control' onChange={(e) => setName(e.target.value)} placeholder="Please enter name" />
              </div>
              <div className='form-group mt-3'>
                <input type="text" className='form-control' onChange={(e) => setDescription(e.target.value)} placeholder="Please enter description" />
              </div>
              <div className='form-group mt-3'>
                <input type="text" className='form-control' onChange={(e) => setQuantity(e.target.value)} placeholder="Please enter quantity" />
              </div>
              <div className='form-group mt-3'>
                <input type="text" className='form-control' onChange={(e) => setPrice(e.target.value)} placeholder="Please enter price" />
              </div>
              <div className='form-group mt-3'>
                <input type="file" className='form-control' accept="image/*" onChange={(e) => setImage((e.target.files[0]))} />
              </div>
              <div className='form-group mt-3'>
                <input type="text" className='form-control' onChange={(e) => setStatus(e.target.value)} placeholder="Please enter status" />
              </div>
              <Button type='submit' className='btn btn-success mt-4' onClick={editProducts}>Edit Products</Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleEditClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/*DELETE PRODUCT*/}
      <div className='model-box-view'>
        <Modal
          show={viewDelete}
          onHide={handleDeleteClose}
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h2>Are you sure?</h2>
              <Button type='submit' className='btn btn-success mt-4' onClick={deleteProducts}>Delete Products</Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleDeleteClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>

    </div>  
    );
   
}

export default Products;