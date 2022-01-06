import React from "react";

const CartCotnext = React.createContext({
  items: [],
  totalAmount: 0,
  additem: (item) => {},
  removeItem: (id) => {},
});

export default CartCotnext;
