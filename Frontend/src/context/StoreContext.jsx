import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
   const [cartItems, setCartItems] = useState({});
   // const url = "http://localhost:4000";
   const API_URL = process.env.REACT_APP_API_URL;
   const [token, setToken] = useState("");
   const [food_list, setFoodList] = useState([]);

   // ✅ Add Item to Cart
   const addToCart = async (itemId) => {
      if (!cartItems[itemId]) {
         setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      } else {
         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      }
      if (token) {
         await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
      }
   };

   // ✅ Remove Item from Cart
   const removeFromCart = async (itemId) => {
      setCartItems((prev) => {
         const updatedCart = { ...prev };
         if (updatedCart[itemId] > 1) {
            updatedCart[itemId] -= 1;
         } else {
            delete updatedCart[itemId];
         }
         return updatedCart;
      });

      if (token) {
         await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
      }
   };

   // ✅ Get Total Cart Amount
   const getTotalCartAmount = () => {
      let totalAmount = 0;
      for (const item in cartItems) {
         if (cartItems[item] > 0) {
            let itemInfo = food_list.find((product) => product._id === item);
            totalAmount += itemInfo.price * cartItems[item];
         }
      }
      return totalAmount;
   };

   // ✅ Fetch Food List
   const fetchFoodList = async () => {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data);
   };

   // ✅ Load Cart Data
   const loadCartData = async (token) => {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
      setCartItems(response.data.cartData);
   };

   // ✅ NEW: Place Order (COD)
   const placeOrder = async (address) => {
    if (!token) {
      alert("Please login to place an order.");
      return false;
    }
  
    const orderData = {
      items: Object.keys(cartItems).map((id) => ({
        product: id,
        quantity: cartItems[id],
      })),
      amount: getTotalCartAmount(),
      address,
      paymentMethod: "COD",
    };
  
    try {
      const response = await axios.post(url + "/api/orders/place", orderData, { headers: { token } });
  
      if (response.status === 200) {
        alert("Order placed successfully!");
        setCartItems({}); // Clear cart
        return true;
      } else {
        alert("Failed to place order.");
        return false;
      }
    } catch (error) {
      alert("Error placing order!");
      console.error(error);
      return false;
    }
  };
  

   useEffect(() => {
      async function loadData() {
         await fetchFoodList();
         if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
         }
      }
      loadData();
   }, []);

   const contextValue = {
      food_list,
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      placeOrder, // ✅ Added placeOrder function
      url,
      token,
      setToken,
   };

   return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
