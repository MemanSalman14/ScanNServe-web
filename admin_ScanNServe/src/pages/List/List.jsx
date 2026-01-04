import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/clerk-react';

const List = ({ url }) => {

  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching list")
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error("Failed to fetch food items");
    }
  }

  const removeFood = async (foodId) => {
    if (!isLoaded || !isSignedIn) {
      toast.error("Please sign in to remove items");
      return;
    }

      // Show confirmation dialog
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      const token = await getToken();
      
      if (!token) {
        toast.error("Authentication failed. Please login again.");
        return;
      }

      const response = await axios.post(`${url}/api/food/remove`, { id: foodId }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error("Error removing item")
      }
    } catch (error) {
      console.error("Error removing food:", error);
      
      if (error.response?.status === 401) {
        toast.error("Unauthorized. Please login again.");
      } else if (error.response?.status === 403) {
        toast.error("Access denied. Admin privileges required.");
      } else {
        toast.error(error.response?.data?.message || "Failed to remove food item");
      }
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list-page'>
      <div className='list-header'>
        <h2>📋 All Foods List</h2>
        <p>Manage your restaurant menu items</p>
      </div>
      <div className="list-table-container">
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.length === 0 ? (
            <div className="list-empty">
              <p>No food items found. Add some items to get started!</p>
            </div>
          ) : (
            list.map((item, index) => {
              return (
                <div key={index} className='list-table-format list-item'>
                  <img src={`data:image/png;base64,${item.image}`} alt={item.name} /> 
                  <p className='item-name'>{item.name}</p>
                  <p className='item-category'>{item.category}</p>
                  <p className='item-price'>₹{item.price}</p>
                  <button onClick={() => removeFood(item._id)} className='delete-btn'>
                    🗑️
                  </button>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default List



       

    