import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from "react-toastify";  // ✅ Corrected import
import "react-toastify/dist/ReactToastify.css";

const List = ({url}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch food items.");
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error("Error fetching food items.");
    }
  };
  const removeFood = async (foodId) => {
  try {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    if (response.data.success) {
      toast.success(response.data.message);
      fetchList();
    } else {
      toast.error(response.data.message || "Failed to remove food item.");
    }
  } catch (error) {
    console.error("Error removing food item:", error);
    toast.error("Something went wrong while removing food.");
  }
};


  useEffect(() => {
    fetchList();
  }, []);

  return (
     <div className='list add flex-col'>
       <p>All Food Items</p>
       <div className='list-table'> 
        <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
        </div>
        {list && list.length > 0 ? (
  list.map((item,index)=>(
    <div key={index} className="list-table-format">
      <img src={`${url}/images/`+item.image} alt="" />
      <p>{item.name}</p>
      <p>{item.category}</p>
      <p>${item.price}</p>
      <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
    </div>
  ))
) : (
  <p>No items found</p>
)}

       </div>
     </div>
  );
};

export default List;