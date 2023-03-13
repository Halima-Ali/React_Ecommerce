import React from "react";
import "./payment.css";
import { Link, useNavigate, UseNavigate } from "react-router-dom";
import { useStateValue } from "../../Context/StateProvider";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { nanoid } from "nanoid";
import { NumericFormat } from "react-number-format";
import { getBasketTotal } from "../../Context/Reducer";
import axios from "../.././axios";

export default function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  // hooks we need to use
  const stripe = useStripe();
  const Elements = useElements();

  const groupedData = {};
  basket.forEach((item) => {
    const id = item.id;
    if (!groupedData[id]) {
      groupedData[id] = [];
    }
    groupedData[id].push(item);
  });

  // states
  const [disabled, setDisabled] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [processing, setProcessing] = React.useState("");
  const [suceeded, setSuceeded] = React.useState(false);
  const [clientSecret, setClientSecret] = React.useState(true);
  const navigate = useNavigate();

  console.log(clientSecret);

  React.useEffect(() => {
    // generates the special stripe client secret which allows us to charge a customer
    // new secret should be generated when basket content changes
    const getClientSecret = async () => {
      // axios is a way of making requests
      // ? query parameter
      // const total = getBasketTotal(basket) * 100;
      const response = await axios({
        method: "post",
        // stripe expects expect the total in currency subunits
        // where we make request
        url: `/payments/create`,
        // body: JSON.stringify({ total }),
      });

      console.log(response.data);

      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  //  form onsubmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    // blocks
    setProcessing(true);

    //  stripe stuff
    // we want a client secret - see useEffect
    // uses client secret to confirm payment
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: Elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //  paymentIntent = payment confirmation
        // detructured from response

        setSuceeded(true);
        setError(null);
        setProcessing(false);
        navigate("/orders", { replace: true });
      });
  };

  function handleChange(event) {
    // listen for onchange
    // display errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  }

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout(
          <Link to="/checkout" style={{ textDecoration: "none" }}>
            {basket?.length} items
          </Link>
          )
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery adress</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles California</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and Delivery</h3>
          </div>
          <div className="payment__items">
            {Object.values(groupedData).map((item) => {
              return (
                <CheckoutProduct
                  key={nanoid()}
                  id={item[0].id}
                  description={item[0].description}
                  title={item[0].title}
                  image={item[0].image}
                  category={item[0].category}
                  price={item[0].price}
                  quantity={item.length}
                  rating={item.rating}
                />
              );
            })}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <h3>
                  Order Total :{" "}
                  <NumericFormat
                    value={getBasketTotal(basket).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </h3>
                <button disabled={processing || disabled || suceeded}>
                  <span>{processing ? <p>Processing ...</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div className="payment__error">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
