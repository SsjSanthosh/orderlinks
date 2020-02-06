import React, { useState } from "react";
import { connect } from "react-redux";
import { initOrders, addOrder, setLocalOrders } from "./Redux/orderActions";
import "./styles.scss";
function AddOrder({ addOrder, datas, setLocalOrders, deleteOrder }) {
  const [order, setOrder] = useState({
    id: "",
    customer_name: "",
    customer_email: "",
    quantity: "",
    product: 1
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (order.quantity > 0) {
      addOrder(order);
      setLocalOrders();
    }
  };
  return (
    <form onSubmit={handleSubmit} className="order-form">
      <input
        type="text"
        value={order.id}
        placeholder="Enter Order ID"
        required
        name="id"
        onChange={handleChange}
      />
      <input
        type="email"
        name="customer_email"
        required
        value={order.customer_email}
        placeholder="Enter Customer email"
        onChange={handleChange}
      />
      <input
        type="text"
        required
        name="customer_name"
        value={order.customer_name}
        placeholder="Enter Customer Name"
        onChange={handleChange}
      />
      <input
        type="number"
        required
        name="quantity"
        value={order.quantity}
        placeholder="Enter Quantity"
        onChange={handleChange}
      />
      <select value={order.product} onChange={handleChange} name="product">
        <option value={1}>Product 1</option>
        <option value={2}>Product 2</option>
        <option value={3}>Product 3</option>
      </select>

      <button className="submit">Submit</button>
    </form>
  );
}
const mapStateToProps = state => {
  return { datas: state };
};
export default connect(mapStateToProps, {
  initOrders,
  addOrder,
  setLocalOrders
})(AddOrder);
