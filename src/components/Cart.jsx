import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import ItemCart from './ItemCart';
import { useSelector } from 'react-redux';
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [activeCart, setActiveCart] = useState(false);
  const cartItems = useSelector((state) => state.cart.cart);

  const totalQty = cartItems.reduce((totalQty, item) => totalQty + item.qty, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.qty * item.price, 0);
  
  const navigate = useNavigate();
  return (
    <>
      <div className={`fixed right-0 top-0 w-full lg:w-[20vw] h-full bg-white mb-3 ${activeCart ? "translate-x-0" : "translate-x-full"} transition-all duration-500 z-50`}>
        <div className="flex justify-between items-center my-3 px-4">
          <span className="text-xl font-bold text-gray-800">My Order</span>
          <IoMdClose
            onClick={() => setActiveCart(!activeCart)}
            className="border-2 border-gray-600 text-gray-600 font-bold p-1 text-xl rounded-md hover:text-red-300 hover:border-red-300 cursor-pointer"
          />
        </div>
        {cartItems.length > 0 ? (
          cartItems.map((food) => (
            <ItemCart key={food.id} id={food.id} name={food.name} price={food.price} image={food.img} qty={food.qty} />
          ))
        ) : (
          <h2 className='text-center text-2xl font-bold text-gray-800'>Your Cart is empty</h2>
        )}
        <div className="px-4">
          <h3 className="font-semibold text-gray-800">Items: {cartItems.length}</h3>
        </div>
        <div className="absolute bottom-0 w-full px-4 py-5 bg-white">
          <h3 className="font-semibold text-gray-800">Total Quantity: {totalQty}</h3>
          <h3 className="font-semibold text-gray-800">Total Amount: ${totalPrice.toFixed(2)}</h3>
          <hr className="my-2" />
          <button onClick={()=>navigate("/success")}
          className="bg-green-500 font-bold px-3 text-white py-2 rounded-lg w-full lg:w-[18vw]">Checkout</button>
        </div>
      </div>
      <RiShoppingCart2Fill
        onClick={() => setActiveCart(!activeCart)}
        className={`rounded-full bg-white shadow-md text-5xl p-3 fixed bottom-4 right-4 cursor-pointer ${totalQty > 0 ? "animate-bounce" : ""}`}
      />
    </>
  );
}

export default Cart;
