import React, { useEffect } from "react";
import axios from "axios";

import { shopReducer } from "./reducer";
import { inicialState } from "./initialState";

const ShopContext = React.createContext(null);

function ShopProvider({ children }) {

  const [state, dispatch] = React.useReducer(shopReducer, inicialState);

  async function fetchData() {
    await axios
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
        alert("An error occurred while querying the data.");
      });
  }

  useEffect(() => {
    fetchData();
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
