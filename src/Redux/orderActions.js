export const initOrders = orders => {
  return {
    type: "INIT_ORDERS",
    payload: orders
  };
};

export const addOrder = order => {
  return {
    type: "ADD_ORDER",
    payload: order
  };
};

export const setLocalOrders = () => {
  return {
    type: "SET_LOCAL_ORDERS"
  };
};

export const clearLocalStorage = () => {
  return {
    type: "CLEAR_LOCAL_STORAGE"
  };
};
export const deleteOrder = idx => {
  return {
    type: "DELETE_ORDER",
    payload: idx
  };
};

export const editOrder = payload => {
  return {
    type: "EDIT_ORDER",
    payload
  };
};
export const setGid = gid => {
  return {
    type: "SET_GID",
    payload: gid
  };
};
