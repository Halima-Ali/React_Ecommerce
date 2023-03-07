import React from "react";
import "./payment.css";
import { Link } from "react-router-dom"
import { useStateValue } from "../../Context/StateProvider";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { nanoid } from "nanoid";
import { NumericFormat } from "react-number-format";
import { getBasketTotal } from "../../Context/Reducer";

export default function Payment() {
 const [{ basket, user }, dispatch] = useStateValue();
 
  const groupedData = {};
  basket.forEach((item) => {
    const id = item.id;
    if (!groupedData[id]) {
      groupedData[id] = [];
    }
    groupedData[id].push(item);
  });
 
 function handleSubmit(event) {
  event.preventDefault();
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
             {/* <CardElement onChange={handleChange} /> */}
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
               {/* <button disabled={processing || disabled || suceeded}>
                 <span>{processing ? <p>Processing ...</p> : "Buy Now"}</span>
               </button> */}
             </div>
             {/* {error && <div>{error}</div>} */}
           </form>
         </div>
       </div>
     </div>
   </div>
 );
}