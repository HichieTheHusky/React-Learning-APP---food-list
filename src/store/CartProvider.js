import { useReducer } from "react";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";
import CartCotnext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  console.log(action);
  let updatedItems;
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    if (existingCartItem) {
      const updateditem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updateditem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    console.log(existingCartItem);
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return;
};

const CartProvider = (props) => {
  const [cartstate, cartdispatch] = useReducer(cartReducer, defaultCartState);
  const addItemTocCartHandler = (item) => {
    cartdispatch({ type: "ADD", item: item });
  };
  const removeItemTocCartHandler = (id) => {
    console.log("remove");
    cartdispatch({ type: "REMOVE", id: id });
  };

  const cartcontest = {
    items: cartstate.items,
    totalAmount: cartstate.totalAmount,
    additem: addItemTocCartHandler,
    removeItem: removeItemTocCartHandler,
  };
  return (
    <CartCotnext.Provider value={cartcontest}>
      {props.children}
    </CartCotnext.Provider>
  );
};

export default CartProvider;
