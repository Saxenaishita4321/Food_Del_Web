import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, placeOrder } = useContext(StoreContext);
  const navigate = useNavigate();

  // State to store user input
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.street || !formData.city || !formData.zipCode || !formData.phone) {
      alert("Please fill in all required fields!");
      return;
    }
  
    try {
      const response = await placeOrder(formData);
      if (response) {
        navigate("/order-success");
      } else {
        alert("Failed to place order. Try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again.");
    }
  };
  

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" name="firstName" placeholder="First name" onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Last name" onChange={handleChange} />
        </div>
        <input type="text" name="email" placeholder="Email address" onChange={handleChange} />
        <input type="text" name="street" placeholder="Street" onChange={handleChange} />
        <div className="multi-fields">
          <input type="text" name="city" placeholder="City" onChange={handleChange} />
          <input type="text" name="state" placeholder="State" onChange={handleChange} />
        </div>
        <div className="multi-fields">
          <input type="text" name="zipCode" placeholder="Zip code" onChange={handleChange} />
          <input type="text" name="country" placeholder="Country" onChange={handleChange} />
        </div>
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
      </div>

      <div className="place-order-right">
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
          {/* Button calls handlePlaceOrder function */}
          <button type="button" onClick={handlePlaceOrder}>
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
