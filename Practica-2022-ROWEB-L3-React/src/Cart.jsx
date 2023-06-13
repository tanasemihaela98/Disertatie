import './Cart.css';

export default function () {

    return <>
        <div className="container">
            <div className="left-column">
                <div className="product">
                    <h3 className="product-title">Product 1</h3>
                    <div className="product-quantity">
                        <span class="quantity-label">Quantity:</span>
                        <button class="quantity-btn minus">-</button>
                        <span class="quantity">1</span>
                        <button class="quantity-btn plus">+</button>
                    </div>
                </div>
                <div class="product">
                    <h3 class="product-title">Product 2</h3>
                    <div class="product-quantity">
                        <span class="quantity-label">Quantity:</span>
                        <button class="quantity-btn minus">-</button>
                        <span class="quantity">1</span>
                        <button class="quantity-btn plus">+</button>
                    </div>
                </div>
                <div class="product">
                    <h3 class="product-title">Product 3</h3>
                    <div class="product-quantity">
                        <span class="quantity-label">Quantity:</span>
                        <button class="quantity-btn minus">-</button>
                        <span class="quantity">1</span>
                        <button class="quantity-btn plus">+</button>
                    </div>
                </div>
            </div>
            <div class="right-column">
                <div class="cart-summary">
                    <h2>Cart Summary</h2>
                    <div class="cart-items">
                        <div class="cart-item">
                            <span class="item-name">Product 1</span>
                            <span class="item-quantity">1</span>
                            <span class="item-price">$10.00</span>
                        </div>
                        <div class="cart-item">
                            <span class="item-name">Product 2</span>
                            <span class="item-quantity">1</span>
                            <span class="item-price">$15.00</span>
                        </div>
                        <div class="cart-item">
                            <span class="item-name">Product 3</span>
                            <span class="item-quantity">1</span>
                            <span class="item-price">$20.00</span>
                        </div>
                    </div>
                    <div class="cart-total">
                        <span class="total-label">Total:</span>
                        <span class="total-price">$45.00</span>
                    </div>
                </div>
            </div>
        </div>
    </>

}