import React from "react";
import "./subtotal.css";
import { useStateValue } from "../../Context/StateProvider";
import { getBasketTotal } from "../../Context/Reducer";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";

export default function Subtotal(props) {
  const [{ basket }, dispatch] = useStateValue();
  const navigate = useNavigate();

  console.log(getBasketTotal(basket));

  return (
    <div className="subtotal">
      <p>
        Subtotal ({basket.length} items):
        <strong>
          <NumericFormat
            value={getBasketTotal(basket).toFixed(2)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </strong>
      </p>
      <small className="subtotal__gift">
       <input type="checkbox" /> This order contains a gift
      </small>
      <button onClick={(e) => navigate("/payments", { replace: true })}>
        Proceed to Checkout
      </button>
    </div>
  );
}
