import { useContext } from "react";
import CartCotnext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const context = useContext(CartCotnext);
  const totalaAmount = `$${context.totalAmount.toFixed(3)}`;
  const hasItems = context.items.lenght > 0;

  const cartItemRHandler = (id) => {
    context.removeItem(id);
  };
  const cartItemAHandler = (item) => {
    const newItem = {
      ...item,
      amount: 1,
    };
    context.additem(newItem);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {context.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRHandler.bind(null, item.id)}
          onAdd={cartItemAHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalaAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
