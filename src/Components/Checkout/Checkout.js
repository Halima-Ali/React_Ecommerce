import React from "react"
import "./checkout.css"
import { useStateValue } from "../../Context/StateProvider";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { nanoid } from "nanoid";

export default function Checkout() {
 const [state, dispatch] = useStateValue();

  console.log(state.basket)
 return (
   <div className="checkout">
     <div className="checkout__left">
       <h2 className="checkout__title">Your Shopping Cart</h2>
       {state.basket.map(item=> {
         return (
           <CheckoutProduct
             key={nanoid()}
             id={item.id}
             title={item.title}
             category={item.category}
             price={item.price}
             image={item.image}
           />
         )
       })}
     </div>
     <div className="checkout__right">Subtotal</div>
   </div>
 );
}