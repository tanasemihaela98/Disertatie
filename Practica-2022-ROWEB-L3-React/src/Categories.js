import React, { useEffect, useState, Component } from "react";
import ReactDOM from 'react-dom';
import { Button, Modal, ModalTitle } from 'react-bootstrap';
import axios from "axios";
import Pagination from "react-js-pagination";

function Categories() {
  let token = JSON.parse(window.localStorage.getItem("user-info"));

  const [data, setData] = useState([]);
  const [rowData, setRowData] = useState([]);

  const [viewShow, setViewShow] = useState(false);
  const handleViewShow = () => { setViewShow(true) };
  const handleViewClose = () => { setViewShow(false) };

  const [viewEdit, setEditShow] = useState(false);
  const handleEditShow = () => { setEditShow(true) };
  const handleEditClose = () => { setEditShow(false) };

  const [viewPost, setPostShow] = useState(false);
  const handlePostShow = () => { setPostShow(true) };
  const handlePostClose = () => { setPostShow(false) };

  const [viewDelete, setDeleteShow] = useState(false);
  const handleDeleteShow = () => { setDeleteShow(true) };
  const handleDeleteClose = () => { setDeleteShow(false) };

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [parent_id, setParentId] = useState("");


  const config = {
    headers: { Authorization: "Bearer " + token.data.token }
  };

  const getCategories = async () => {
    const response = await fetch("http://127.0.0.1:8081/api/categories", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token.data.token
      },
    });

    const data = await response.json();
    setData(data?.data.data);
  };

  const addCategories = async () => {
    const url = 'http://127.0.0.1:8081/api/category'
    const Credentials = { name, parent_id }
    axios.post(url, Credentials, config)
      .then(response => {
        const result = response.data;
        //const { status } = result;
        if (result.status == true) {
          alert('New category added!');
          getCategories();
        }
        else {
          alert('Add error');

        }
      })
      .catch(err => {
        alert(err);
      })

  };

  const editCategories = async () => {
    const url = `http://127.0.0.1:8081/api/category/${id}`
    const Credentials = { name, parent_id }
    axios.put(url, Credentials, config)
      .then(response => {
        const result = response.data;
        //const { status } = result;
        if (result.status == true) {
          alert('Category updated!');
          getCategories();
        }
        else {
          alert('Update error');

        }
      })
      .catch(err => {
        alert(err);
      })
  }

  const deleteCategories = async () => {
    const url = `http://127.0.0.1:8081/api/category/${id}`
    axios.delete(url, config)
      .then(response => {
        const result = response.data;
        //const { status } = result;
        if (result.status == true) {
          alert('Category Deleted!');
          getCategories();
        }
        else {
          alert('delete error');

        }
      })
      .catch(err => {
        alert(console.log(err));
      })
  }


  useEffect(() => {
    getCategories();
  }, [])

  return (
    <div>
      <div className='row'>
        <div className='mt-5 mb-4'>
          <Button variant='primary' onClick={handlePostShow}><i className='fa fa-plu'></i>
            Add New Category
          </Button>
        </div>
      </div>
      <div className='row'>
        <div className='table-responsive'>
          <table className='table table-striped table-hover table-bordered'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Parent ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) =>
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.parent_id ? item.parent_id : <p>root</p>}</td>
                  <td style={{ minWidth: 190 }}>
                    <Button size='lg' variant='info' onClick={() => { handleViewShow(setRowData(item)) }}>View</Button>&nbsp;
                    <Button size='lg' variant='secondary' onClick={() => { handleEditShow(setRowData(item), setId(item.id)) }}>Edit</Button> &nbsp;
                    <Button size='lg' variant='danger' onClick={() => { handleDeleteShow(setRowData(item), setId(item.id)) }}>Delete</Button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>



      {/* VIEW CATEGORY */}
      <div className='model-box-view'>
        <Modal
          show={viewShow}
          onHide={handleViewClose}
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>View Category Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className='form-group'>
                <input type="text" className='form-control' value={rowData.name} readOnly />
              </div>
              <div className='form-group mt-3'>
                <input type="text" className='form-control' value={rowData.parent_id} readOnly />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleViewClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* ADD NEW CATEGORY */}
      <div className='model-box-view'>
        <Modal
          show={viewPost}
          onHide={handlePostClose}
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add new Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className='form-group'>
                <input type="text" className='form-control' onChange={(e) => setName(e.target.value)} placeholder="Please enter Name" />
              </div>
              <div className='form-group mt-3'>
                <input type="text" className='form-control' onChange={(e) => setParentId(e.target.value)} placeholder="Please enter parent" />
              </div>
              <Button type='submit' className='btn btn-success mt-4' onClick={addCategories}>Add Category</Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handlePostClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* EDIT CATEGORY */}
      <div className='model-box-view'>
        <Modal
          show={viewEdit}
          onHide={handleEditClose}
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className='form-group'>
                <input type="text" className='form-control' onChange={(e) => setName(e.target.value)} placeholder="Please enter Name" defaultValue={rowData.name} />
              </div>
              <div className='form-group mt-3'>
                <input type="text" className='form-control' onChange={(e) => setParentId(e.target.value)} placeholder="Please enter parent" defaultValue={rowData.parent_id} />
              </div>
              <Button type='submit' className='btn btn-success mt-4' onClick={editCategories}>Edit Category</Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleEditClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/*DELETE CATEGORY*/}
      <div className='model-box-view'>
        <Modal
          show={viewDelete}
          onHide={handleDeleteClose}
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h2>Are you sure?</h2>
              <Button type='submit' className='btn btn-success mt-4' onClick={deleteCategories}>Delete Category</Button>
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

export default Categories;