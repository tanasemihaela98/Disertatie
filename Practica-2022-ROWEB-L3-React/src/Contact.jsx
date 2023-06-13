import './Contact.css';

export default function () {

    return <>
        <div class="container">
            <h1>Contact Us</h1>
            <form action="#" method="post">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required />

                <label for="message">Message:</label>
                <textarea id="message" name="message" rows="5" required></textarea>

                <input type="submit" value="Submit" />
            </form>
        </div>
    </>

}