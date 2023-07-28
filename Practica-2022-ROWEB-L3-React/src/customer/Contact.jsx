import './Contact.css';
import axios from 'axios';
import { useState } from 'react'; 

export default function () {

    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');


    async function createContact() {
        const data = {
            "title":title,
            "email":email,
            "message":message,
        }


        const response = await axios.post('http://127.0.0.1:8081/api/contact',data).then(
            response => {
                console.log(response.data.data);
            });
        console.log(response);

    };

    return <>
        <div class="contact">
            <h1>Contact Us</h1>
            <form>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)}/>

                <label for="title">Title:</label>
                <input type="text" id="title" name="title" required onChange={(e) => setTitle(e.target.value)}/>

                <label for="message">Message:</label>
                <textarea id="message" name="message" rows="5" required onChange={(e) => setMessage(e.target.value)}></textarea>

                <input type='submit' value="Submit" onClick={(e) => createContact(e)}/>
            </form>
        </div>
    </>

}