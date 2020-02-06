const initialState = { orders: [], gid: null, hint: null, id_token: null };
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_ORDERS":
      return { ...state, orders: action.payload };
    case "ADD_ORDER":
      return { ...state, orders: [action.payload, ...state.orders] };
    case "EDIT_ORDER":
      let editedOrders = state.orders;
      console.log(action.payload);
      editedOrders[action.payload.idx] = action.payload.order;
      return { ...state, orders: [...editedOrders] };

    case "SET_LOCAL_ORDERS":
      console.log(state.gid);
      localStorage.setItem(state.gid, JSON.stringify(state.orders));
      return state;
    case "CLEAR_LOCAL_STORAGE":
      localStorage.removeItem(state.gid);
      return state;
    case "DELETE_ORDER":
      let newOrders = state.orders;
      newOrders.splice(action.payload, 1);
      return { ...state, orders: [...newOrders] };
    case "SET_GID":
      return { ...state, gid: action.payload };
    default:
      return state;
  }
};

export default orderReducer;
