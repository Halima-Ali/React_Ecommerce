export const initialState = {
  basket: [],
  user : null,
};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => parseFloat(item.price) + amount, 0);

const reducer = (state, action) => {
  //  console.log(action)
  switch (action.type) {
    case "ADD_TO_BASKET":
      if(action.number===1){
         return {
           ...state,
           basket: [...state.basket, action.item],
         };
      } else {
        return {
          ...state,
          basket: [...state.basket, ...Array(action.number).fill(action.item)],
        };
     }
     case "REMOVE_FROM_BASKET":
        // returns first element of the kind that it gets
      const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);

      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`can't remove product {id:${action.id} as its not in the basket!}`);
      }

      return {
        ...state,
        basket:newBasket
      }
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      }
    default:
      return state;
  }
};

export default reducer;
