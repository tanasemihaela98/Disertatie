import { useState } from 'react';
import './create.paint.css';
// import { FcAdvance } from "react-icons/fc";
import axios from 'axios';

function CreatePaint() {
       const [name, setName] = useState('');
       const [author, setAuthor] = useState('');
       const [price, setPrice] = useState('');
       const [image, setImage] = useState(null);

       const submitPost = (e) => {
              const paint = { name, author, price, image }
              // ProductService.createProduct(product);
              handleUpload();
       }

       const handleImageChange = (e) => {
              const file = e.target.files[0];
              setImage(file);
       };

       const handleUpload = async () => {
              try {
                    const formData = new FormData();
                    formData.append('image', image);
                    formData.append('name', name);
                    formData.append('author', author);
                    formData.append('price', price);

                    const response = await axios({
                        method: "post",
                        url: "http://127.0.0.1:8081/api/paint/create",
                        data: formData,
                        headers: { "Content-Type": "multipart/form-data" },
                    });
              } catch (error) {
                     console.log('Error uploading image:', error);
              }
       };

       return <form>
              <input id='title' name='name' value={name}
                     onChange={(e) => setName(e.target.value)} placeholder={'name'} />
              <input id='price' type='number' name='price' value={price}
                     onChange={(e) => setPrice(e.target.value)} placeholder={'0'} />
              <input id='author' name='author' value={author}
                     onChange={(e) => setAuthor(e.target.value)} placeholder={'author'} />

              <input type="file" accept="image/*" onChange={handleImageChange} />
              {image && <img src={image} alt="Selected" style={{ maxWidth: '300px' }} />}

              <button onClick={(e) => submitPost(e)}> Submit 
              {/* <FcAdvance /> */}
              </button>
       </form>

}

export default CreatePaint;
