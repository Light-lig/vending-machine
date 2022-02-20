import React, { useEffect } from "react";
import axios from "axios";
const ShopContext = React.createContext(null);

var inicialState = {
  data: [],
  shop: [],
  turned: 0.0,
  cash: 0,
};
var initialMoney = {
  cash: 0,
};
function moneyReducer(state, action) {
  switch (action.type) {
    case "UPDATE_MONEY":
      return {
        cash: action.item,
      };
    default:
      return state;
  }
}
function shopReducer(state, action) {
  switch (action.type) {
    case "FILL_MACHINE":
      return {
        ...state,
        data: action.item,
      };
    case "UPDATE_SHOP":
      let shop = state.shop;
      let total = 0.0;
      let turned = 0.0;
      shop.push(action.item.product);

      shop.map((item) => {
        total = total + item.price;
      });
      turned = action.item.money - total;
      if (turned < 0) {
        turned = 0.0;
      }

      return {
        ...state,
        shop: shop,
        turned: turned,
      };
    case "PULL_SHOP":
      let shopPull = state.shop.filter((item) => item.id !== action.item.id);

      return { ...state, shop: shopPull };
    default:
      return state;
  }
}

function ShopProvider({ children }) {
  const [state, dispatch] = React.useReducer(shopReducer, inicialState);
  const [money, dispatchMoney] = React.useReducer(moneyReducer, initialMoney);

  useEffect(() => {
    axios
      .get("https://vending-machine-test.vercel.app/api/products")
      .then((response) => {
        response.data.data = response.data.data.map((item) => {
          item.price = randomIntFromInterval(1, 6);
          return item;
        });
        dispatch({ type: "FILL_MACHINE", item: response.data.data });
      })
      .catch((err) => {
        console.log(err);
        alert("Ocurrio un error al consultar los datos");
      });
  }, []);

  const value = { state, dispatch, money, dispatchMoney };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function useShop() {
  const context = React.useContext(ShopContext);
  if (context === undefined) {
    throw new Error("ShopContext must be used within a ShopProvider");
  }
  return context;
}

export { ShopProvider, useShop };
