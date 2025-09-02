import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, placeOrder } = useContext(StoreContext);
  const navigate = useNavigate();
  const [address, setAddress] = useState("");

  const handlePlaceOrder = async () => {
    if (!address) {
      alert("Please enter an address before placing an order.");
      return;
    }
  
    try {
      const response = await placeOrder({ street: address, city: "Mumbai", pincode: "400001" });
  
      if (response) {
        navigate("/order-success"); // Navigate only on success
      } else {
        alert("Order placement failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again.");
    }
  };
  

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list && food_list.length > 0 && cartItems ? (
  food_list.map((item, index) => {
    if (cartItems[item._id] > 0) {
      return (
        <div key={index}>
          <div className="cart-items-title cart-items-item">
            <img src={url + "/images/" + item.image} alt="" />
            <p>{item.name}</p>
            <p>${item.price}</p>
            <p>{cartItems[item._id]}</p>
            <p>${item.price * cartItems[item._id]}</p>
            <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
          </div>
          <hr />
        </div>
      );
    }
    return null;
  })
) : (
  <p>Your cart is empty</p>
)}

      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          
          {/* Input field to enter address before placing order */}
          <input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
          />

          {/* Call placeOrder on button click */}
          <button onClick={handlePlaceOrder}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
