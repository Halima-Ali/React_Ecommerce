import React from "react"
import "./checkoutProduct.css";

export default function CheckoutProduct(props) {
 return (
  <div className="checkoutProduct">
   <img src={props.image} alt="checkoutProduct" className="checkoutProduct__Image"/>
     <div className="checkoutProduct__info">
       <div>
         <h4>{props.title}</h4>
         <p>{props.category}</p>
       </div>
       <div>
         <h4>{props.price}</h4>
         <p>
           Quantity : <strong>4</strong>
         </p>
       </div>
     </div>
   </div>
 );
}