import React, { useState } from "react";
import { editOrder, setLocalOrders } from "./Redux/orderActions";
import "./styles.scss";
import { connect } from "react-redux";
function Order({ order, editOrder, index, handleDelete, setLocalOrders }) {
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit(true);
  };
  const { customer_email, customer_name, id, product, quantity } = order;

  const [editedOrder, setEditOrder] = useState({
    customer_name,
    customer_email,
    id,
    product,
    quantity
  });
  const handleChange = e => {
    const { name, value } = e.target;
    setEditOrder({ ...editedOrder, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const obj = { idx: index, order: editedOrder };
    editOrder(obj);
    setEdit(false);
    setLocalOrders();
  };
  return (
    <li className="order" key={order.id} id={index}>
      {!edit ? (
        <div>
          {" "}
          <p>Ordered by - {order.customer_name}</p>
          <p>Email at - {order.customer_email}</p>
          <p>Product - {order.product}</p>
          <p>Quantity - {order.quantity}</p>
          <button className="edit" onClick={() => handleEdit(index)}>
            Edit order{" "}
          </button>
          <button className="delete" onClick={() => handleDelete(index)}>
            Delete order{" "}
          </button>
        </div>
      ) : (
        <form className="edit-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={editedOrder.id}
            placeholder="Enter Order ID"
            required
            name="orderID"
            onChange={handleChange}
          />
          <input
            type="email"
            name="customer_email"
            required
            value={editedOrder.customer_email}
            placeholder="Enter Customer email"
            onChange={handleChange}
          />
          <input
            type="text"
            required
            name="customer_name"
            value={editedOrder.customer_name}
            placeholder="Enter Customer Name"
            onChange={handleChange}
          />
          <input
            type="number"
            required
            name="quantity"
            value={editedOrder.quantity}
            placeholder="Enter Quantity"
            onChange={handleChange}
          />
          <select
            value={editedOrder.product}
            onChange={handleChange}
            name="product"
          >
            <option value={1}>Product 1</option>
            <option value={2}>Product 2</option>
            <option value={3}>Product 3</option>
          </select>

          <button className="submit">Submit</button>
        </form>
      )}

      <hr></hr>
    </li>
  );
}

export default connect(null, { editOrder, setLocalOrders })(Order);
