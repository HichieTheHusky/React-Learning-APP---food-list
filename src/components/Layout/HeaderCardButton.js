import { useContext, useEffect, useState } from "react";
import CartCotnext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCardButton.module.css";
const HeaderCartButton = (props) => {
  const context = useContext(CartCotnext);
  const { items } = context;

  const [state, setstate] = useState(false);
  const numbOfItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${state ? classes.bump : ""}`;

  useEffect(() => {
    if (context.items.length === 0) {
      return;
    }

    setstate(true);
    const timer = setTimeout(() => {
      setstate(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numbOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
