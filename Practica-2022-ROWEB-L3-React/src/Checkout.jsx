import './Checkout.css';

export default function () {

    return <>
        <div class="checkout-container">
            <div class="checkout-header">
                <h2>Checkout</h2>
            </div>
            <div class="checkout-form">
                <div class="form-group">
                    <label for="card-number">Card Number</label>
                    <input type="text" id="card-number" placeholder="Enter your card number"/>
                </div>
                <div class="form-group">
                    <label for="expiry-date">Expiry Date</label>
                    <input type="text" id="expiry-date" placeholder="MM/YY"/>
                </div>
                <div class="form-group">
                    <label for="cvv">CVV</label>
                    <input type="text" id="cvv" placeholder="Enter CVV"/>
                </div>
                <div class="form-group">
                    <label for="card-holder">Card Holder Name</label>
                    <input type="text" id="card-holder" placeholder="Enter card holder name"/>
                </div>
                <div class="form-group">
                    <label for="address">Address</label>
                    <textarea id="address" placeholder="Enter your address"></textarea>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" placeholder="Enter your email address"/>
                </div>
            </div>
            <div class="checkout-footer">
                <button class="checkout-btn">Place Order</button>
            </div>
        </div>
    </>

}