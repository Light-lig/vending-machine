import React, { useEffect } from "react";
import axios from "axios";
const ShopContext = React.createContext(null);

var inicialState = {
  data: [],
  shop: [],
  money: 0.0,
  turned: 0.0,
};
function shopReducer(state, action) {
  switch (action.type) {
    case "UPDATE_MONEY":
      return {
        ...state,
        money: action.item,
      };
    case "FILL_MACHINE":
      return {
        ...state,
        data: action.item,
      };
    case "UPDATE_SHOP":
      let shop = state.shop;
      let total = 0.0;
      let turned = 0.0;
      if (state.money >= action.item.price) {
        shop.push(action.item);

        shop.map((item) => {
          total = total + item.price;
        });
        turned = state.money - total;
      } else {
        alert("Not enough cash, stranger!");
      }

      return {
        ...state,
        shop: shop,
        turned: turned,
        money: turned,
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

  const value = { state, dispatch };
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
