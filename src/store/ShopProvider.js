import React, {useState,useEffect} from 'react'
import axios from 'axios';
const ShopContext = React.createContext(null);

var inicialState = {
    data:[],
    shop:[]
};
function shopReducer(state, action) {
  switch (action.type) {
    case "FILL_MACHINE":
      return {
        ...state,data:action.item
      }
    case "UPDATE_SHOP":
          let shop = state.shop;
          shop.push(action.item);
        return {...state,shop:shop};
    case "PULL_SHOP":
      let shopPull = state.shop.filter(item => item.id !== action.item.id);

      return {...state,shop:shopPull}
    default:
      
        return state;
  }
}

function ShopProvider({children}) {
  const [state, dispatch] = React.useReducer(shopReducer, inicialState)

  useEffect(()=>{
    axios.get("https://vending-machine-test.vercel.app/api/products").then((response)=>{
      dispatch({type:"FILL_MACHINE",item:response.data.data});
    }).catch((err)=>{
      console.log(err);
    })
  },[])

  const value = {state, dispatch}
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

function useShop() {
  const context = React.useContext(ShopContext)
  if (context === undefined) {
    throw new Error('ShopContext must be used within a ShopProvider')
  }
  return context
}

export {ShopProvider, useShop};